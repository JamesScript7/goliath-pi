<template>
  <div class="weatherreport">
    <div class="current">
      <p>{{ current.temp }}</p>
      <p>{{ current.temp_min }}</p>
      <p>{{ current.temp_max }}</p>
      <p>{{ current.description }}</p>
      <img :alt="current.description" :src="current.icon" />
    </div>
  </div>
</template>

// Template:
// -------------------------------------------------
// |  Today     |  Tuesday | Wednesday | Thursday  |
// |  63        |  60/52   | 63/51     | 78/53     |
// |  clear sky |  cloudy  | overcast  | clear sky |
// -------------------------------------------------

<script>
export default {
  name: 'WeatherReport',
  props: {
    current: Object,
    forecast: Array,
  },
};
</script>

<style scoped>
.weatherreport {
    position: fixed;
    bottom: 0;
    width: 100%;
    color: darkcyan;
}

/* .current {} */
/* .forecast {} */
</style>
