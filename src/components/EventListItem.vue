<template>
  <div class='section list-item'>
    <p v-if=event_distance class="miles-away">
      {{ event_distance | formatDistance }}
    </p>
    <h2 @click="$emit('selected', event.id)">
      {{ event.properties.type.subtype.name }} {{ event.properties.type.name }}
    </h2>
    <p>
      {{ event.properties.location }}
    </p>
    <p>
      <b>Requester:</b> {{ event.properties.originator }}
    </p>
    <p>
      <b>Contact:</b> <a :href="'tel:' + this.$options.filters.formatPhoneNumber(event.properties.originator_phone)">{{ event.properties.originator_phone | formatPhoneNumber }}</a>
    </p>
    <p>
      <b>Permit #</b>: {{ event.properties.id }}
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
  .list-item {
    padding: 0 10rem 1rem 2rem;
    position: relative;
    background: url(../assets/img/point-right.png) no-repeat 95% 50%;
  }
  .list-item h2 {
    font-size: 2rem;
    margin-bottom: .75rem;
    margin-top: 1rem;
    color: #0071bc;
    text-decoration: underline;
    cursor: pointer;
  }
  .list-item p {
    margin-top: 0;
    margin-bottom: .5rem;
    font-size: 14px;
  }
  .miles-away {
    position: absolute;
    top: .25rem;
    right: 1.3rem;
  }

</style>
