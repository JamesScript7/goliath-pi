<template>
  <div class="weatherreport">
    <div class="weatherreport__current">
      <div>{{ current.temp }}</div>
      <div>{{ current.temp_min }}</div>
      <div>{{ current.temp_max }}</div>
      <div>{{ current.description }}</div>
      <img :alt="current.description" :src="current.icon" />
    </div>
    <div class="weatherreport__forecast">
      <div class="weatherreport__days">tue</div>
      <div class="weatherreport__days">wed</div>
      <div class="weatherreport__days">thu</div>
      <div class="weatherreport__days">fri</div>
      <div class="weatherreport__days">sat</div>
    </div>
  </div>
</template>

// Template:
// -------------------------------------------------
// |  Today     |  Tues    | Wed       | Thurs     |
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
    display: flex;
    color: #fff;
    background-color: rgb(8,8,8);
}

.weatherreport__current {
  flex: 1;
}

.weatherreport__forecast {
  flex: 1;
  display: flex;
}

/* TEST CSS */
.weatherreport__days {
  flex-grow: 1;
  background-color: #1f3056;
}

.weatherreport__days:nth-child(odd) {
  background-color: #476cc6;
}
</style>
