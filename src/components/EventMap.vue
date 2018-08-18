<template>
   <l-map ref="map"
          :zoom="zoom"
          :center="lCenter"

          :bounds="lBounds"
          @moveend="moveEnd"
          >
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="userLocation"></l-marker>
    <l-geo-json v-for="event in events"
      :key="event.id"
      :geojson="event"
      @click="openEvent"
    ></l-geo-json>
  </l-map>
</template>

<script>
import _ from 'lodash'

import 'leaflet/dist/leaflet.css'

// fix issue with css-loader rewriting urls in leaflet CSS
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'

import L from 'leaflet'
import { LMap, LTileLayer, LGeoJson, LMarker } from 'vue2-leaflet'

export default {
  name: 'EventMap',
  components: { LMap, LTileLayer, LMarker, LGeoJson },
  props: {
    center: {
      type: Array, // [lat, lng]
      default: () => [0, 0]
    },
    zoom: {
      type: Number,
      default: 20
    },
    bounds: {
      type: Array, // [[south, west], [north, east]]
      default: () => []
    },
    events: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      lCenter: this.center,

      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',

      state: this.$store.state
    }
  },
  computed: {
    userLocation: function () {
      return [this.state.userLat, this.state.userLng]
    },
    lBounds: function () {
      if (!this.bounds) {
        return null
      }

      return new L.LatLngBounds(L.latLng(this.bounds[0]), L.latLng(this.bounds[1]))
    }
  },
  methods: {
    moveEnd: function (e) {
      const bounds = e.target.getBounds()
      const newBounds = [
        [bounds.getSouth(), bounds.getWest()],
        [bounds.getNorth(), bounds.getEast()]
      ]
      if (_.isEqual(this.bounds, newBounds)) {
        return
      }
      this.$emit('update:bounds', newBounds)
    },
    openEvent: function (e) {
      this.$emit('event-selected', e.layer.feature.id)
    }
  },
  watch: {
    userLocation: {
      handler: function (newLocation, oldLocation) {
        this.lCenter = newLocation
      },
      deep: true
    }
  }
}
</script>

<style scoped>
</style>
