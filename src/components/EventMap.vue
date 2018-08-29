<template>
  <l-map ref="map" :zoom="zoom" :center="center" @ready="updateMapState" @moveend="updateMapState" @zoomend="updateMapState">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="marker"></l-marker>
    <l-geo-json v-for="event in events"
      :key="event.id"
      :geojson="event"
      @click="openEvent"
    ></l-geo-json>
  </l-map>
</template>

<script>
import 'leaflet/dist/leaflet.css'

// fix issue with css-loader rewriting urls in leaflet CSS
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'

import L from 'leaflet'
import { LMap, LTileLayer, LGeoJson, LMarker } from 'vue2-leaflet'

export default {
  name: 'EventMap',
  components: { LMap, LTileLayer, LMarker, LGeoJson },
  data () {
    const lat = this.$route.query.lat || 0
    const lng = this.$route.query.lng || 0
    const zoom = parseInt(this.$route.query.zoom) || 20
    return {
      zoom: zoom,
      center: L.latLng(lat, lng),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(lat, lng),
      events: []
    }
  },
  mounted: function () {
    let _this = this
    this.$nextTick(function () {
      _this.updateEvents(_this.$refs.map.mapObject.getBounds())
    })
  },
  methods: {
    updateEvents: function (bounds) {
      let _this = this

      let geometry = {
        type: 'Polygon',
        coordinates: [[
          [bounds._southWest.lng, bounds._northEast.lat],
          [bounds._northEast.lng, bounds._northEast.lat],
          [bounds._northEast.lng, bounds._southWest.lat],
          [bounds._southWest.lng, bounds._southWest.lat],
          [bounds._southWest.lng, bounds._northEast.lat]
        ]]
      }

      this.$citygram.getEvents(geometry)
        .then(function (events) {
          _this.events = events
        }).catch(function (error) {
          // TODO handle error
          console.log(error)
        })
    },
    updateMapState: function (e) {
      const center = e.target.getCenter()
      this.$router.replace({name: 'events_map',
        query: {
          lat: center.lat,
          lng: center.lng,
          zoom: e.target.getZoom(),
          bounds: e.target.getBounds().toBBoxString()
        }})

      this.updateEvents(e.target.getBounds())
    },
    openEvent: function (e) {
      this.$router.push({name: 'event', params: { id: e.layer.feature.id }})
    }
  }
}
</script>

<style scoped>
</style>
