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

/**
 * Represents an event to be rendered on a map. Delegates to the LGeoJson component, but changes points to be rendered
 * as small circles. I anticipate that we can include more feature styling in this file if we start to pull in
 * non-point features.
 *
 * Expects to be included within an `LMap` Vue2Leaflet component.
 */
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
            color: '#0071bc',
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
