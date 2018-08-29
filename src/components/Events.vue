<template>
  <div class='container'>
    <div class="view-controls">
      <div class="router-link-container">
        <router-link
           tag="button"
           active-class="sfgov-button-active"
           :to="{ name: 'events_map', query: this.$route.query }">
          Map
        </router-link>

        <router-link
           tag="button"
           active-class="sfgov-button-active"
           :to="{ name: 'events_list', query: this.$route.query }">
          List
        </router-link>
      </div>
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

<style scoped>
.view-controls {
  background: #d6d7d9;
  padding: .25rem 1rem .75rem;
  border-bottom: 1px solid #aeb0b5;
}

.router-link-container {
  width:33%;
  float:right;
  padding: 0;
  position: relative;
}

.router-link-container button {
  width:50%;
  display: inline-block;
  font-size: 1.25rem;
  font-weight: normal;
  background: #d6d7d9;
  color: #323a45;
  line-height: 1;
  padding: .25rem;
  margin: 0;
  border-radius: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid #757575;
}

.router-link-container button:first-child {
  width:50%;
  display: inline-block;
  font-size: 1.25rem;
  line-height: 1;
  padding: .25rem;
  margin: 0;
  margin-right: -4px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
}

.router-link-container .sfgov-button-active {
  background: #757575;
  color: #f1f1f1;
}
</style>
