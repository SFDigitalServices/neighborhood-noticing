// Following the pattern from https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch
// Since we don't have much state yet, I think this is preferrable to Vuex
function Store () {
  return {
    state: { // do not mutate directly
      userLat: null,
      userLng: null
    },

    setUserLocation: function (lat, lng) {
      this.state.userLat = Number(lat)
      this.state.userLng = Number(lng)
    }
  }
}

export default Store
