<template>
  <l-geo-json
    :geojson="event"
    :options=eventOptions
    @click="onClick"
  ></l-geo-json>
</template>

<script>
import L from 'leaflet'
import { findRealParent, LGeoJson } from 'vue2-leaflet'

export default {
  name: 'EventFeature',
  components: { LGeoJson },
  props: {
    event: {
      type: Object,
      default: {}
    }
  },
  methods: {
    onClick: function (e) {
      this.$emit('click', this.event)
    }
  },
  mounted: function () {
    // l-geo-json expects this to be set
    this.mapObject = findRealParent(this.$parent).mapObject
  },
  data () {
    return {
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
  }
}
</script>

<style scoped>
</style>
