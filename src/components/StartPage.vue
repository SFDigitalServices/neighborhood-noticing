<template>
  <div class="container">
    <div class="container" id='start-page'>
      <!-- pattern-lab/molecules-hero-banner -->
      <header class="sfgov-banner">
        <div class="sfgov-banner__container sfgov-container">
          <h1>Learn about projects happening near you.</h1>
          <div>
            Discover and get notifications about construction, events, and steet and sidewalk closures.
          </div>
        </div>
      </header>

      <div class="nav-buttons">
        <div class="main">
          <router-link class="sfgov-button" tag="button" :to="{ name: 'events_map', query: { locate: true, lat: lat, lng: lng, zoom: zoom } }">Get started</router-link>
        </div>

        <div>
          <router-link :to="{ name: 'events_map', query: { lat: lat, lng: lng, zoom: zoom } }">Search using an address</router-link>
        </div>
      </div>
      <div class="map-underlay"></div>
    </div>
    <signup-banner class="signup-banner"></signup-banner>
  </div>
</template>

<script>
import SignupBanner from './SignupBanner.vue'

export default {
  name: 'StartPage',
  components: { SignupBanner },
  data: function () {
    return {
      lat: process.env.VUE_APP_MAP_LAT,
      lng: process.env.VUE_APP_MAP_LNG,
      zoom: process.env.VUE_APP_MAP_ZOOM
    }
  }
}
</script>

<style scoped>
#start-page {
  position: relative; /* needed for underlaid image */
  height: 100%;

  padding-top: 15%; /* move banner down */
}

/*
* underlay map image under other elements
* based on https://stackoverflow.com/a/4183985/2647163
*/
.map-underlay {
  content : "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(../assets/img/map.png);
  width: 100%;
  height: 100%;
  opacity : 0.5;
  z-index: -1;
}

.nav-buttons {
  text-align: center;
  padding-top: 3rem;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

.nav-buttons .main {
  margin-bottom: 1.5rem;
}

#signup-banner {
  position:absolute;
  bottom:0;
  left: 0;
}

</style>
