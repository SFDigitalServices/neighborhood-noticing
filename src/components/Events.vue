<template>
  <div class='container'>
    <div class="view-controls">
      <router-link
         tag="button"
         active-class="sfgov-button-active"
         :to="{ name: 'events_list', query: this.$route.query }">
        List
      </router-link>
      <router-link
         tag="button"
         active-class="sfgov-button-active"
         :to="{ name: 'events_map', query: this.$route.query }">
        Map
      </router-link>
    </div>
    <div class='container'>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Events'
}
</script>

<style>
</style>
