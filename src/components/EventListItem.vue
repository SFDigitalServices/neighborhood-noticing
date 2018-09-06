<template>
  <div class='section'>
    <h2 @click="$emit('selected', event.id)">
      {{ event.properties.type.subtype.name }} {{ event.properties.type.name }}
    </h2>
    <p>
      {{ event.properties.location }}
    </p>
    <p>
      Requester: {{ event.properties.originator }}
    </p>
    <p>
      Contact: <a :href="'tel:' + this.$options.filters.formatPhoneNumber(event.properties.originator_phone)">{{ event.properties.originator_phone | formatPhoneNumber }}</a>
    </p>
    <p v-if=event_distance>
      Distance: {{ event_distance | formatDistance }}
    </p>
    <p>
      Permit {{ event.properties.id }}
    </p>
  </div>
</template>

<script>
// TODO
// How to display missing info?
import formatPhoneNumber from '../filters/FormatPhoneNumber.js'

import L from 'leaflet'

export default {
  name: 'event',
  props: ['event'],
  computed: {
    event_distance: function () {
      if (!this.$store.state.userLat || !this.$store.state.userLng) {
        return null
      }

      // default map CRS
      return L.CRS.EPSG3857.distance(
        L.latLng(this.event.geometry.coordinates[1], this.event.geometry.coordinates[0]),
        L.latLng(this.$store.state.userLat, this.$store.state.userLng)
      )
    }
  },
  filters: {
    formatPhoneNumber,
    formatDistance: function (meters) {
      const NUM_METERS_IN_A_MILE = 1609.34
      const NUM_FEET_IN_MILES = 5280
      const MIN_DISTANCE_MILES = 0.5 // minimum distance to show in miles

      const miles = meters / NUM_METERS_IN_A_MILE

      if (miles >= MIN_DISTANCE_MILES) {
        return miles.toFixed(2) + ' miles'
      }

      return (miles * NUM_FEET_IN_MILES).toFixed(0) + ' feet'
    }
  }
}
</script>

<style scoped>
</style>
