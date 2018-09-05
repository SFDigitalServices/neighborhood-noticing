<template>
  <l-map :options=options :bounds=bounds>
    <l-tile-layer :url=url :attribution=attribution></l-tile-layer>

    <slot></slot>
  </l-map>
</template>

<script>
import 'leaflet/dist/leaflet.css'

// fix issue with css-loader rewriting urls in leaflet CSS
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'

import { LMap, LTileLayer } from 'vue2-leaflet'

export default {
  name: 'StaticMap',
  components: { LMap, LTileLayer },
  props: {
    bounds: {
      custom: true,
      default: undefined
    }
  },
  data () {
    return {
      url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
      attribution: 'Map tiles by Carto, under CC BY 3.0.<br/>Data by OpenStreetMap, under ODbL.',
      options: {
        // do not let the user interact with the map
        zoomControl: false,
        boxZoom: false,
        doubleClickZoom: false,
        dragging: false,
        scrollWheelZoom: false
      }
    }
  }
}
</script>

<style>
</style>
