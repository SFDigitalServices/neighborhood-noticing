<template>
  <div>
    <div class='map-container'>
      <static-map :bounds=mapBounds>
        <event-feature :event=event></event-feature>
      </static-map>
    </div>

    <!-- pattern-lab/molecules-hero-banner -->
    <header class="sfgov-banner">
      <div class="sfgov-banner__container sfgov-container">
        <h1>{{ event.properties.type.subtype.name }} {{ event.properties.type.name }}</h1>

        <a :href="mailtoHref">
          <i class="fas fa-share">Share</i>
        </a>

        <p class="location" v-if="event.properties.location">
          {{ event.properties.location }}
        </p>
        <p v-else>
          Address has not been provided. Please <a href="tel:1-415-311">call 311</a> for details.
        </p>

        <p class="dates" v-if="(event.properties.start && event.properties.end)">
          {{ event.properties.start | formatDate }} to {{ event.properties.end | formatDate }}
        </p>
        <p v-else>
          This information has not been provided. Please <a href="tel:1-415-311">call 311</a> for details.
        </p>

        <p class="description">
          {{ event.properties.type.subtype.description }}
        </p>
        <!-- TODO link to an online representation of the event if one exists -->
        <p>
          {{ event.properties.type.name }}# {{ event.properties.id }}
        </p>
      </div>
    </header>

    <div class="section">
      <h2>Need to talk to someone about this permit?</h2>
      <div class="preview preview-no_border grid-example grid-example-blank">
        <div class="sfgov-container">
          <div class="sfgov-width-one-half">
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
          </div><!--sfgov-width-one-half-->

          <div class="sfgov-width-one-half">
            <p>24-7 access, everyday
              <a href="tel:10415311">Call 3-1-1</a>
            </p>
          </div><!--sfgov-width-one-half-->


        </div><!--sfgov-container-->
      </div><!--preview preview-no_border grid-example grid-example-blank-->
    </div>

    <div v-if="event.properties.description" class="section">
      <h2>Project description</h2>
        {{ event.properties.description }}
      </p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import L from 'leaflet'

// TODO
//   * Remove the word permit and put into data to generalize
import formatPhoneNumber from '../filters/FormatPhoneNumber.js'

import StaticMap from './StaticMap.vue'
import EventFeature from './EventFeature.vue'

export default {
  name: 'event',
  components: { StaticMap, EventFeature },
  data () {
    return {
      event: {
        type: 'Feature',
        geometry: null,
        properties: {}
      }
    }
  },
  filters: {
    formatPhoneNumber,
    formatDate: function (date) {
      return moment(date).format('l')
    }
  },
  computed: {
    mailtoHref: function () {
      return 'mailto:?to=&subject=' + this.event.properties.type.name + ' #' + this.event.properties.id + '&body=' + window.location
    },
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

<style scoped>
.section h2 {
  font-family: "Roboto", san-serif;
  font-size: 1em;
  line-height: 1.4;
  margin: 0 0 .75em;
  padding: 0;
}

.section {
  padding: 2em 1em;
}

p {
  margin: 0 0 .75em;
}

.dates, .location {
  font-weight: 700;
}

.location {
  margin-bottom: .25em;
}

.map-container {
  height: 200px;
}
</style>
