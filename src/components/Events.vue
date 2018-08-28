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
      <router-view
        :zoom=zoom
        @update:zoom=updateZoom

        :center=center
        @update:center=updateCenter

        @update:bounds=updateBounds

        :events=events
        @event-selected=openEvent
         ></router-view>
    </div>
  </div>
</template>

<script>
import LocationSearch from './LocationSearch.vue'

export default {
  name: 'Events',
  components: { LocationSearch },
  data () {
    return {
      center: [],
      zoom: 0,
      events: [],
      bounds: null
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
  methods: {
    updateZoom: function(newZoom) {
      this.zoom = newZoom

      this.$router.replace({
        query: Object.assign({}, this.$route.query, {
          zoom: newZoom
        })
      })
    },
    updateCenter: function(newCenter) {
      this.center = newCenter

      this.$router.replace({
        query: Object.assign({}, this.$route.query, {
          lat: newCenter[0],
          lng: newCenter[1],
        })
      })
    },
    updateBounds: function (newBounds) {
      this.updateEvents(newBounds)
    },
    updatePlace: function (place) {
      this.updateCenter([place.geometry.location.lat(), place.geometry.location.lng()])
      this.$store.setUserLocation(place.geometry.location.lat(), place.geometry.location.lng())
    },
    updateEvents: function (bounds) {
      const _this = this
      const [[south, west], [north, east]] = bounds
      const geometry = {
        type: 'Polygon',
        coordinates: [[
          [west, south],
          [west, north],
          [east, north],
          [east, south],
          [west, south]
        ]]
      }

      this.$citygram.getEvents(geometry)
        .then(function (events) {
          _this.events = events
        }).catch(function (error) {
          // TODO handle error
          console.log(error)
        })
    },
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
