<script>
/*
 * Wrap leaflet.locatecontrol library in a Vue component
 * https://github.com/domoritz/leaflet-locatecontrol
 *
 * Will add configuration options as-needed
 */

import L from 'leaflet'
import 'leaflet.locatecontrol'

const props = {
  // locate user when control is mounted
  locateOnMount: {
    type: Boolean,
    default: false
  }
}

export default {
  name: 'LControlLocate',
  props: props,
  mounted () {
    this.mapObject = L.control.locate({
      locateOptions: {
        maxZoom: 16 // TODO will delete this when merging in changes with configurable zoom
      }
    })
    this.mapObject.addTo(this.$parent.mapObject)
    this.$parent.mapObject.on('locationfound', (e) => {
      this.$emit('locationfound', e)
    })

    if (this.locateOnMount) {
      this.mapObject.start()
    }
  },
  beforeDestroy () {
    this.mapObject.stop()
  },
  render () {
    return null
  }
}
</script>
