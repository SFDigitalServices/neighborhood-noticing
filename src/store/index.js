// Following the pattern from https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch
// Since we don't have much state yet, I think this is preferrable to Vuex
function Store () {
  return {
    state: { // do not mutate directly
      userLat: process.env.VUE_APP_MAP_LAT,
      userLng: process.env.VUE_APP_MAP_LNG
    },

    setUserLocation: function (lat, lng) {
      this.state.userLat = lat
      this.state.userLng = lng
    }
  }
}

export default Store