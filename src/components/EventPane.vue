<template>
  <div>
    <h1>I am event {{ $route.params.id }}</h1>
    <pre>{{ $data }}</pre>
  </div>
</template>

<script>
export default {
  name: 'event',
  data() {
    return {
      event: null,
    };
  },
  created() {
    let _this = this;
    this.$citygram.getEvent(this.$route.params.id).then(function (event) {
      _this.event = event;
    }).catch(function (error) {
      // TODO handle error
      console.log(error);
    });
  },
}
</script>
