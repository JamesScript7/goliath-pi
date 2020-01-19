<template>
  <div class="weatherreport">
      <p>Weather Report</p>
  </div>
</template>

<script>
export default {
  name: 'WeatherReport',
  props: {
    imgUrl: String,
  },
};
</script>

<style scoped>
.weather {
    color: darkcyan;
}
</style>
