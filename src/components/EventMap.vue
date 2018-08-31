<template>
   <l-map ref="map"
          :zoom="zoom"
          :center="lCenter"

          @moveend="moveEnd"
          >
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-control-locate :locate-on-mount=locateOnMount @locationfound=locationFound></l-control-locate>
    <l-geo-json v-for="event in events"
      :key="event.id"
      :geojson="event"
      :options=eventOptions
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
import LControlLocate from './LControlLocate.vue'

export default {
  name: 'EventMap',
  components: { LMap, LTileLayer, LMarker, LGeoJson, LControlLocate },
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
    const locate = ('locate' in this.$route.query)
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',

      state: this.$store.state,
      locateOnMount: locate,
      eventOptions: {
        // convert points to small circles
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 8,
            fillColor: '#0071bc', // same color as primary buttons
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          })
        }
      }
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

    locationFound: function (loc) {
      this.$store.setUserLocation(loc.latitude, loc.longitude)
    },

    openEvent: function (e) {
      this.$emit('event-selected', e.layer.feature.id)
    }
  }
}
</script>

<style scoped>
</style>
