<template>
  <div>
    <h1>What's happening near you?</h1>

    <router-link :to="{ name: 'map', query: { lat: lat, lng: lng } }">Find results near me</router-link>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'start-page',
  data: function() {
    return {
      lat: process.env.VUE_APP_MAP_LAT,
      lng: process.env.VUE_APP_MAP_LNG,
    }
  },
}
</script>
