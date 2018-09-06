<template>
  <router-link tag="div" id='signup-banner' :to="{ name: 'notifications_signup' }">
    <i class="fas fa-bullhorn"></i> Sign-up for future Neighborhood Notifications
  </router-link>
</template>

<script>
export default {
  name: 'SignupBanner'
}
</script>

<style scoped>
#signup-banner {
  text-align: center;

  width: 100%;
  padding-top: 1em;
  padding-bottom: 1em;

  background-color: white;
  color: #0071bc;
}
</style>
