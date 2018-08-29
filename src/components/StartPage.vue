<template>
  <div id='start-page'>
    <!-- pattern-lab/molecules-hero-banner -->
    <header class="sfgov-banner">
      <div class="sfgov-banner__container sfgov-container">
        <h1>Learn about projects happening in your area.</h1>
        <div>
          Discover and receive notifications about projects, events and closures happening in San Francisco neighborhoods.
        </div>
      </div>
    </header>

    <div class="nav-buttons">
      <div class="main">
        <button @click="findLocation" class="sfgov-button">Get Started</button>
      </div>

      <div>
        <router-link :to="{ name: 'events_map', query: { lat: lat, lng: lng } }">Search using an address</router-link>
      </div>
    </div>
    <div class="map-underlay"></div>
  </div>
</template>

<script>
export default {
  name: 'start-page',
  data: function () {
    return {
      lat: process.env.VUE_APP_MAP_LAT,
      lng: process.env.VUE_APP_MAP_LNG
    }
  },
  methods: {
    findLocation: function (e) {
      let _this = this
      navigator.geolocation.getCurrentPosition(function (position) {
        _this.$store.setUserLocation(position.coords.latitude, position.coords.longitude)
        _this.$router.push({ name: 'events_map', query: { lat: position.coords.latitude, lng: position.coords.longitude } })
      })
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
  opacity : 0.3;
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
</style>
