<template>
  <div class="weatherreport">
    <div class="weatherreport__current">
      <div class="current__left">
        <div>Today</div>
        <div class="current__temp">{{ current.temp }}</div>
      </div>
      <div class="current__right">
        <!-- <div>{{ current.temp_min }}</div> -->
        <!-- <div>{{ current.temp_max }}</div> -->
        <img :alt="current.description" :src="current.icon" />
        <div>{{ current.description }}</div>
      </div>
    </div>
    <div class="weatherreport__forecast">
      <div class="weatherreport__days">Tues</div>
      <div class="weatherreport__days">Wed</div>
      <div class="weatherreport__days">Thurs</div>
      <div class="weatherreport__days">Fri</div>
      <div class="weatherreport__days">Sat</div>
    </div>
  </div>
</template>

// Template:
// ------------------------------------------------------------------
// |  Today     [    ]           |  Tues    | Wed       | Thurs     |
// |  [ 63 ]    [icon] clear sky |  60/52   | 63/51     | 78/53     |
// |  [    ]    [    ]           |  cloudy  | overcast  | clear sky |
// ------------------------------------------------------------------

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
    background-color: rgba(8,8,8, 0.95);
}

.weatherreport__current {
  flex: 1;
  text-align: left;
  padding: 1.5em 1.5em 1.5em 3em;
  display: flex;
}

.current__temp {
  font-size: 4.5rem;
}

.current__temp::after {
  content: '\2109';
  font-size: 1rem;
  vertical-align: text-top;
}

.weatherreport__forecast {
  flex: 1;
  display: flex;
}

.weatherreport__days {
  flex-grow: 1;
  border-left: 1px solid black;
}

/* .weatherreport__days:nth-child(odd) {} */
</style>
