<template>
  <div class="container">
    <event-list-item @selected=eventSelected class='section' v-for="event in events"
                :key="event.id"
                :event="event"
                ></event-list-item>
    <div v-if="!events.length">
      <p>
        No results in your search range.
      </p>
      <button @click="expandSearch">
        Click to expand.
      </button>

    </div>
  </div>
</template>

<script>
// TODO
// Sort events by distance
import EventListItem from './EventListItem.vue'

export default {
  name: 'EventList',
  components: { EventListItem },
  props: {
    zoom: {
      type: Number,
      default: 20
    },
    events: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    eventSelected: function (id) {
      this.$emit('event-selected', id)
    },

    expandSearch: function () {
      this.$emit('update:zoom', this.zoom - 1)
    }
  }
}
</script>

<style scoped>
</style>
