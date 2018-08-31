<template>
   <l-map ref="map"
          :zoom="zoom"
          :center="lCenter"

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
    events: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
      attribution: 'Map tiles by Carto, under CC BY 3.0.<br/>Data by OpenStreetMap, under ODbL.',

      state: this.$store.state
    }
  },
  computed: {
    userLocation: function () {
      return [this.state.userLat, this.state.userLng]
    },
    lCenter: function () {
      // passing new object to avoid vue2leaflet updating the center array by reference
      // https://vuejs.org/v2/guide/list.html#Caveats
      return L.latLng(this.center[0], this.center[1])
    }
  },
  methods: {
    moveEnd: function (e) {
      const newCenter = [e.target.getCenter().lat, e.target.getCenter().lng]
      if (!_.isEqual(this.center, newCenter)) {
        this.$emit('update:center', newCenter)
      }

      const newZoom = e.target.getZoom()
      if (!_.isEqual(this.zoom, newZoom)) {
        this.$emit('update:zoom', e.target.getZoom())
      }
    },
    openEvent: function (e) {
      this.$emit('event-selected', e.layer.feature.id)
    }
  }
}
</script>

<style scoped>
</style>
