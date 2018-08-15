<template>
  <div>
    <input ref="autocomplete"
           placeholder="Search"
           class="search-location"
           onfocus="value = ''"
           type="text" />
  </div>
</template>

<script>
/* global google */

export default {
  name: 'LocationSearch',
  data () {
    return {
    }
  },
  mounted () {
    // TODO set bounds
    this.autocomplete = new google.maps.places.Autocomplete(
      (this.$refs.autocomplete),
      {types: ['geocode']}
    )

    this.autocomplete.addListener('place_changed', () => {
      this.$emit('place-changed', this.autocomplete.getPlace())
    })
  }
}
</script>
