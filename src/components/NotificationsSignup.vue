<template>
  <div>
    <!-- pattern-lab/molecules-hero-banner -->
    <header class="sfgov-banner">
      <div class="sfgov-banner__container sfgov-container">
        <h1>Get future notifications</h1>
      </div>
    </header>

    <form v-on:submit.prevent="onSubmit">
      <div>
        <label for="address">From this address: </label>
        <input v-model="address" required>
      </div>

      <fieldset>
        <legend>Within a distance of: </legend>

        <!-- distances in meters -->

        <input type="radio" id="500_feet" v-model.number="distance" value="152" />
        <label for="500_feet">500 feet</label>

        <input type="radio" id="1_4_mile" v-model.number="distance" value="402" />
        <label for="1_4_mile">1/4 mile</label>

        <input type="radio" id="1_2_mile" v-model.number="distance" value="804" />
        <label for="1_2_mile">1/2 mile</label>

        <input type="radio" id="1_mile" v-model.number="distance" value="1609" />
        <label for="1_mile">1 mile</label>

        <input type="radio" id="5_mile" v-model.number="distance" value="8046" />
        <label for="5_mile">5 miles</label>
      </fieldset>

      <div class='map-container'>
        <static-map :bounds=mapBounds>
          <!-- center -->
          <l-marker :lat-lng="marker"></l-marker>

          <!-- only used to determine the rectangle bounds -->
          <l-circle ref="circle" :stroke=false :fillOpacity=0 :lat-lng=marker :radius=distance></l-circle>

          <l-rectangle :bounds=subscriptionBounds></l-rectangle>
        </static-map>
      </div>

      <fieldset>
        <legend>How would you like to receive notifications?</legend>

        <input type="radio" id="individual_text" v-model="contact_medium" value="individual_email" />
        <label for="individual_text">Individual emails</label>

        <input type="radio" id="weekly_email" v-model="contact_medium" value="weekly_email" />
        <label for="weekly_email">Weekly email summaries</label>
      </fieldset>

      <div>
        <label for="contact_address">Email address: </label>
        <input type="text" v-model="contact_address" id="contact_address" required>
      </div>

      <div>
        <input class="sfgov-button" type="submit" value="Subscribe">
      </div>
    </form>
  </div>
</template>

<script>
import L from 'leaflet'
import { LRectangle, LCircle, LMarker } from 'vue2-leaflet'

import StaticMap from './StaticMap.vue'

// TODO
// wire up address field
export default {
  name: 'NotificationsSignup',
  components: { StaticMap, LCircle, LRectangle, LMarker },
  data () {
    return {
      // form
      address: '500 Collingwood Street',
      distance: 152,
      contact_medium: 'individual_email',
      contact_address: '',

      subscriptionBounds: [ [0, 0], [0, 0] ],

      mapBounds: null,
      marker: L.latLng(this.$store.state.userLat, this.$store.state.userLng)
    }
  },
  watch: {
    // update bounds when distance and circle is redrawn
    // attempted to do by binding the map bounds to the circle bounds, but got into a loop with the circle bounds
    // updating every time the map bounds changed
    distance: function (newDistance, oldDistance) {
      this.$nextTick(() => {
        this.updateBounds(this.$refs.circle.mapObject.getBounds())
      })
    }
  },
  methods: {
    updateBounds: function (bounds) {
      this.mapBounds = bounds
      this.subscriptionBounds = [bounds.getNorthWest(), bounds.getSouthEast()]
    },
    onSubmit: function () {
      console.log(this)
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.updateBounds(this.$refs.circle.mapObject.getBounds())
    })
  }
}
</script>

<style>
.map-container {
  height: 200px;
}
</style>
