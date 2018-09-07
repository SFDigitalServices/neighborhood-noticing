<template>
  <div>
    <input ref="autocomplete"
           placeholder="Search a location"
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


<style scoped>
  .search-location {
    border: none;
    border-radius: 7px;
    font-size: 14px;
    height: auto;
  }
  div {
    background:#c8e1ff;
    padding: .25em .5em;
  }

</style>
