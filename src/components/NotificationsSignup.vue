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
        <label class="form-header" for="address">From this address: </label>
        <input v-model="address" required>
      </div>

      <fieldset>
        <legend class="form-header">Within a distance of: </legend>

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

        <input type="radio" id="5_mile" v-model.number="distance" value="8046" />
        <label for="5_mile">Entire city</label>
      </fieldset>

      <div class='map-container'>
        <static-map :bounds=subscriptionBounds>
          <!-- center -->
          <l-marker :lat-lng="marker"></l-marker>

          <l-rectangle ref="subscriptionArea" :bounds=subscriptionBounds></l-rectangle>
        </static-map>
      </div>

      <fieldset>
        <legend class="form-header">How would you like to receive notifications?</legend>

        <input type="radio" id="individual" v-model="frequency" value="individual" />
        <label for="individual">Individual emails</label>

        <input type="radio" id="weekly" v-model="frequency" value="weekly" />
        <label for="weekly">Weekly email</label>
      </fieldset>

      <div>
        <label for="email">Email address: </label>
        <input type="text" v-model="email" id="email" required>
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
// add form validation
// actually create subscriptions
export default {
  name: 'NotificationsSignup',
  components: { StaticMap, LCircle, LRectangle, LMarker },
  data () {
    return {
      // form
      address: '500 Collingwood Street',
      distance: 152,
      frequency: 'individual',
      email: '',

      marker: L.latLng(this.$store.state.userLat, this.$store.state.userLng)
    }
  },
  computed: {
    subscriptionBounds: function () {
      // calculate the bounds based on the center point (lat, lng) and distance
      // this is an approximation (only works for small distances relative to R and not close to the poles)
      // based on https://stackoverflow.com/questions/7477003/calculating-new-longitude-latitude-from-old-n-meters
      const R = 6378 // radius of Earth in km
      const distance = this.distance / 2 / 1000 // extend 1/2 distance in the 4 cardinal directions, convert to km

      const [latitude, longitude] = [this.$store.state.userLat, this.$store.state.userLng]

      const deltaLatitude = (distance / R) * (180 / Math.PI)
      const deltaLongitude = (distance / R) * (180 / Math.PI) / Math.cos(latitude * Math.PI / 180)

      return [
        [ latitude - deltaLatitude, longitude - deltaLongitude ],
        [ latitude + deltaLatitude, longitude + deltaLongitude ]
      ]
    }
  },
  methods: {
    onSubmit: function () {
      console.log(this.$data)
    }
  }
}
</script>

<style scoped>
.map-container {
  height: 200px;
}
[type=checkbox]+label, [type=radio]+label {
  width: 46%;
  float:left;
  padding: 1.5em 0em;
  text-align: center;
  margin: .4em 0;
  margin-right: 4%;
  border: 1px solid #5b616b;
  border-radius: 5px;
}

form {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

fieldset {
  margin-top: 2em;
  margin-bottom: 1em;
}

.sfgov-banner .sfgov-banner__container {
    padding: 1em 0 0;
}

.form-header {
  font-family: "Roboto", san-serif;
  font-size: 1em;
  line-height: 1.4;
  margin: 2em 0 .5em;
  padding: 0;
  font-weight: bold;
}
</style>
