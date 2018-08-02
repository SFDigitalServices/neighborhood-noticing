<template>
  <div id='start-page'>

    <!-- pattern-lab/molecules-hero-banner -->
    <header class="sfgov-banner">
      <div class="sfgov-banner__container sfgov-container">
        <h1>Get information about projects near you.</h1>
        <h3 class="lead-paragraph">
          Discover projects, events and closures in San Francisco's neighborhoods. Also you can request future
          notifications.
        </h3>
      </div>
    </header>

    <div class="nav-buttons">
      <div>
        <button @click="findLocation" class="sfgov-button">Get Started</button>
      </div>

      <div>
        <router-link :to="{ name: 'map', query: { lat: lat, lng: lng } }">Search using an address</router-link>
      </div>
    </div>
    <div class="map-underlay"></div>
  </div>
</template>

<style>
#start-page {
  position: relative; /* needed for underlaid image */
  height: 100%;

  padding-top: 10%; /* move banner down */
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
  opacity : 0.2;
  z-index: -1;
}

.nav-buttons {
  text-align: center;
}
</style>

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
        _this.$router.push({ name: 'map', query: { lat: position.coords.latitude, lng: position.coords.longitude } })
      })
    }
  }
}
</script>
