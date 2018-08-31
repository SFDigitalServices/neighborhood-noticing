<template>
  <div class='container'>
    <location-search @place-changed=updatePlace></location-search>
    <div class="view-controls">
      <div class="router-link-container">
        <router-link
           tag="button"
           active-class="sfgov-button-active"
           :to="{ name: 'events_map', query: this.$route.query }">
          Map
        </router-link>

        <router-link
           tag="button"
           active-class="sfgov-button-active"
           :to="{ name: 'events_list', query: this.$route.query }">
          List
        </router-link>
      </div>
    </div>
    <div class='container'>
      <router-view ref="view"
        :zoom=zoom
        @update:zoom=updateZoom

        :center=center
        @update:center=updateCenter

        :events=events
        @event-selected=openEvent
         ></router-view>
    </div>
  </div>
</template>

<script>
import LocationSearch from './LocationSearch.vue'

import _ from 'lodash'
import { bboxPolygon, destination } from '@turf/turf'

export default {
  name: 'Events',
  components: { LocationSearch },
  data () {
    return {
      center: [0, 0],
      zoom: 0,

      events: []
    }
  },
  watch: {
    '$route.query': {
      handler: function (newQuery, oldQuery) {
        if (newQuery.zoom) {
          this.zoom = Number(newQuery.zoom)
        }
        if (newQuery.lat && newQuery.lng) {
          this.center = [Number(newQuery.lat), Number(newQuery.lng)]
        }
      },
      immediate: true
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.refreshEvents()
    })
  },
  methods: {
    updateZoom: function (newZoom) {
      this.zoom = newZoom

      this.$router.replace({
        query: Object.assign({}, this.$route.query, {
          zoom: newZoom,
          lat: this.center[0],
          lng: this.center[1]
        })
      })

      this.refreshEvents()
    },

    updateCenter: function (newCenter) {
      this.center = newCenter

      this.$router.replace({
        query: Object.assign({}, this.$route.query, {
          zoom: this.zoom,
          lat: newCenter[0],
          lng: newCenter[1]
        })
      })

      this.refreshEvents()
    },

    updatePlace: function (place) {
      // doesn't work when map is open due to pan animations
      // https://github.com/KoRiGaN/Vue2Leaflet/issues/170
      this.updateZoom(process.env.VUE_APP_MAP_ZOOM)
      this.updateCenter([place.geometry.location.lat(), place.geometry.location.lng()])

      this.$store.setUserLocation(place.geometry.location.lat(), place.geometry.location.lng())
    },

    refreshEvents: _.debounce(function () {
      // Calculate bounding box of view from the diagonal in pixels, converted to kilometers at the given latitude
      // This allows, when querying by address on the list view, for it to pull the events that would show if the map is
      // viewed
      //
      // Note: This is an approximation as the number of km per pixel varies by the latitude, but should be fine for
      //       small distances
      // Note: Expects map to be using EPSG:3857 CRS

      const kilometersPerPixel = function (latitude, zoom) {
        // From https://wiki.openstreetmap.org/wiki/Zoom_levels
        const earthCircumference = 40075.017 // kilometers

        return earthCircumference * Math.cos(latitude) / Math.pow(2, zoom + 8)
      }

      const diagonalPixels = Math.hypot(this.$refs.view.$el.clientHeight, this.$refs.view.$el.clientWidth)

      const centerPoint = [this.center[1], this.center[0]] // turf wants [lng, lat]
      const diagonalDistance = diagonalPixels / 2 * kilometersPerPixel(this.center[0], this.zoom)
      const northEastBound = destination(centerPoint, diagonalDistance, 45, {units: 'kilometers'})
      const southWestBound = destination(centerPoint, diagonalDistance, -135, {units: 'kilometers'})

      const bboxFeature = bboxPolygon([
        southWestBound.geometry.coordinates[0],
        southWestBound.geometry.coordinates[1],
        northEastBound.geometry.coordinates[0],
        northEastBound.geometry.coordinates[1]
      ])

      this.$citygram.getEvents(bboxFeature.geometry)
        .then((events) => { this.events = events })
        .catch((error) => console.log(error)) // TODO handle error
    }, 500),

    openEvent: function (id) {
      this.$router.push({name: 'event', params: { id }})
    }
  }
}
</script>

<style scoped>
.view-controls {
  background: #d6d7d9;
  padding: .25rem 1rem .75rem;
  border-bottom: 1px solid #aeb0b5;
}

.router-link-container {
  width:33%;
  float:right;
  padding: 0;
  position: relative;
}

.router-link-container button {
  width:50%;
  display: inline-block;
  font-size: 1.25rem;
  font-weight: normal;
  background: #d6d7d9;
  color: #323a45;
  line-height: 1;
  padding: .25rem;
  margin: 0;
  border-radius: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid #757575;
}

.router-link-container button:first-child {
  width:50%;
  display: inline-block;
  font-size: 1.25rem;
  line-height: 1;
  padding: .25rem;
  margin: 0;
  margin-right: -4px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
}

.router-link-container .sfgov-button-active {
  background: #757575;
  color: #f1f1f1;
}
</style>
