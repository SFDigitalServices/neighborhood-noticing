<template>
  <div>
    <event-list-item class='section' v-for="event in events"
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
  data () {
    return {
      events: []
    }
  },
  created () {
    const _this = this

    // TODO store map size in header instead? Yelp does this
    const [west, south, east, north] = this.$route.query.bounds.split(',').map(parseFloat)
    const geometry = {
      type: 'Polygon',
      coordinates: [[
        [west, south],
        [west, north],
        [east, north],
        [east, south],
        [west, south]
      ]]
    }

    this.$citygram.getEvents(geometry)
      .then(function (events) {
        _this.events = events
      }).catch(function (error) {
        // TODO handle error
        console.log(error)
      })
  }
}
</script>

<style>
</style>
