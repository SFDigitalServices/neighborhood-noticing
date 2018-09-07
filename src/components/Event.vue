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
        <a class="shareit" :href="mailtoHref">
          <i class="fas fa-share"></i>
        </a>
        <h1>{{ event.properties.type.subtype.name }} {{ event.properties.type.name }}</h1>

        <p class="location" v-if="event.properties.location">
          {{ event.properties.location }}
        </p>
        <p v-else>
          Address has not been provided. Please <a href="tel:1-415-311">call 311</a> for details.
        </p>

        <p class="dates" v-if="(event.properties.start && event.properties.end)">From 
          {{ event.properties.start | formatDate }} to {{ event.properties.end | formatDate }}
        </p>
        <p v-else>
          This information has not been provided. Please <a href="tel:1-415-311">call 311</a> for details.
        </p>

        <p class="description">
          {{ event.properties.type.subtype.description }}
        </p>
        <p><a href="#">Permit # {{ event.properties.id }}</a></p>
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

.sfgov-banner .sfgov-banner__container {
  padding-top: 2em;
  padding-bottom: 1em;
  position: relative;
}

header h1 {
  font-size: 1.5em;
  padding: 0 2em 0 0;
}

header a,
header a:visited,
header a:hover,
header a:active {
  color: #fff !important;
 } 

.shareit {
  position: absolute;
  top: 2.35em;
  right: 0;
  padding: .3em;
  border: 1px solid #fff;
  border-radius: 5px;
}

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

.sfgov-banner p {
  margin: 0 0 1em;
}

.sfgov-banner .description {
  font-size: .875em;
  font-weight: normal !important;
}

.sfgov-width-one-half p {
  color: #000;
  padding-right: 1em;
}

.dates, .location {
  font-weight: 500;
}

.location {
  margin-bottom: .5em !important;
}

.map-container {
  height: 200px;
}
</style>
