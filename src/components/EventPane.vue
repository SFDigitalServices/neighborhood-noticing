<template>
  <div>
    <!-- pattern-lab/molecules-hero-banner -->
    <header class="sfgov-banner">
      <div class="sfgov-banner__container sfgov-container">
        <h1>{{ event.properties.type }}: {{ event.properties.id }}</h1>
        <h3 class="lead-paragraph">
          Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed lobortis erat, a hendrerit
          mauris. Proin nec turpis nunc. Fusce risus orci, ornare vel dictum eget, volutpat non purus. Donec vitae varius.
        </h3>
      </div>
    </header>

    <div class="section">
      <h2>Permit dates and times</h2>
      <p v-if="(event.properties.start && event.properties.end)">
        {{ event.properties.start | formatDate }} to {{ event.properties.end | formatDate }}
      </p>
      <p v-else>
        This information has not been provided. Please <a href="tel:1-415-311">call 311</a> for details.
      </p>
    </div>

    <div class="section">
      <h2>Who requested this permit?</h2>
      <template v-if="event.properties.originator">
        <p>
          {{ event.properties.originator }}
        </p>
        <p v-if="event.properties.originator_phone">
          <a :href="'tel:' + this.$options.filters.formatPhoneNumber(event.properties.originator_phone)">{{ event.properties.originator_phone | formatPhoneNumber }}</a>
        </p>
      </template>
      <p v-else>
        This information has not been provided. Please <a href="tel:1-415-311">call 311</a> for details.
      </p>
    </div>

    <div v-if="event.properties.description" class="section">
      <h2>Project description</h2>
        {{ event.properties.description }}
      </p>
    </div>

    <div class="section">
      <h2>Permit location</h2>
      <div class='map-container'>
        <l-map :options=mapOptions :bounds=mapBounds>
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-geo-json :geojson="event"></l-geo-json>
        </l-map>
      </div>
      <p v-if="event.properties.location">
        {{ event.properties.location }}
      </p>
      <p v-else>
        Address has not been provided. Please <a href="tel:1-415-311">call 311</a> for details.
      </p>
    </div>
  </div>
</template>

<script>
// TODO
//   * Remove the word permit and put into data to generalize
import 'leaflet/dist/leaflet.css'

// fix issue with css-loader rewriting urls in leaflet CSS
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'

import L from 'leaflet'
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet'

import moment from 'moment'
import { parseNumber, formatNumber } from 'libphonenumber-js'

export default {
  name: 'event',
  components: { Map, LMap, LTileLayer, LGeoJson },
  data () {
    return {
      event: {
        type: 'Feature',
        geometry: null,
        properties: {}
      },
      mapOptions: {
        // do not let the user interact with the map
        zoomControl: false,
        boxZoom: false,
        doubleClickZoom: false,
        dragging: false,
        scrollWheelZoom: false
      },
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  filters: {
    formatDate: function (date) {
      return moment(date).format('l')
    },
    formatPhoneNumber: function (number) {
      const parsed = parseNumber(number, 'US')
      if (parsed === {}) { // couldn't parse, use original
        return number
      }
      return formatNumber(parsed, 'National')
    }
  },
  computed: {
    mapBounds: function () {
      if (!this.event || !this.event.geometry) {
        return null
      }

      return L.geoJson(this.event.geometry).getBounds()
    }
  },
  created () {
    let _this = this
    this.$citygram.getEvent(this.$route.params.id).then(function (event) {
      _this.event = event
    }).catch(function (error) {
      // TODO handle error
      console.log(error)
    })
  }
}
</script>

<style>
.map-container {
  height: 200px;
}

.section {
  border-top: solid lightgray 1px;
}
</style>
