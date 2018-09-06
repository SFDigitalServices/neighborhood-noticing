<template>
   <l-map ref="map"
          :zoom="zoom"
          :center="lCenter"

          @moveend="moveEnd"
          >
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-control-locate :locate-on-mount=locateOnMount @locationfound=locationFound></l-control-locate>
    <event-feature v-for="event in events" :key="event.id" :event=event @click=eventSelected></event-feature>
  </l-map>
</template>

<script>
import _ from 'lodash'

import 'leaflet/dist/leaflet.css'

// fix issue with css-loader rewriting urls in leaflet CSS
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'

import L from 'leaflet'
import { LMap, LTileLayer } from 'vue2-leaflet'

import LControlLocate from './LControlLocate.vue'
import EventFeature from './EventFeature.vue'

export default {
  name: 'EventMap',
  components: { LMap, LTileLayer, LControlLocate, EventFeature },
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
      url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
      attribution: 'Map tiles by Carto, under CC BY 3.0.<br/>Data by OpenStreetMap, under ODbL.',

      state: this.$store.state,
      locateOnMount: locate
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
      this.$router.replace({
        query: Object.assign({}, this.$route.query, {
          locate: undefined
        })
      })
    },

    eventSelected: function (event) {
      this.$emit('event-selected', event.id)
    }
  }
}
</script>

<style scoped>
</style>
