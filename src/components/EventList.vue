<template>
  <div>
    <event-list-item @selected=eventSelected class='section' v-for="event in events"
                :key="event.id"
                :event="event"
                ></event-list-item>
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
    events: [Array]
  },
  methods: {
    eventSelected: function (id) {
      this.$emit('event-selected', id)
    }
  }
}
</script>

<style scoped>
</style>
