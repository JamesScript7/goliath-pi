<template>
  <div class="weatherreport">
    <div class="weatherreport__current">
      <div class="current__left">
        <div>
          <div>Today</div>
          <div class="current__temp">{{ current.temp }}</div>
        </div>
        <div>
          <div class="current__minmax">{{ current.temp_min }} / {{ current.temp_max }}</div>
        </div>
      </div>
      <div class="current__right">
        <img class="current__icon" :alt="current.description" :src="current.icon" />
        <div class="current__description">{{ current.description }}</div>
      </div>
    </div>
    <div class="weatherreport__forecast">
      <div class="weatherreport__days" v-for="(item, index) in forecast" :key="index">
        <div class="days__day">{{ item.day }}</div>
        <img :alt="item.description" :src="item.icon" />
        <div class="days__minmax">{{ item.min }} / {{ item.max }}</div>
        <div class="days__description">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>

// Template:
// ---------------------------------------------------------------------
// |  Today                         |  Tues    | Wed       | Thurs     |
// |                                |  [icon]  | [icon]    | [icon]    |
// |  [ 63 ]      [icon] clear sky  |  60/52   | 63/51     | 78/53     |
// |  [    ]52/65                   |  cloudy  | overcast  | clear sky |
// ---------------------------------------------------------------------

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
  padding: 1.5rem 1.5rem 1.5rem 3rem;
  display: flex;
}

.current__temp {
  font-size: 5rem;
  font-weight: bold;
}

.current__temp::after {
  content: '\2109';
  font-size: 1rem;
  vertical-align: text-top;
}

.current__left {
  flex: 1;
  font-size: 1.5em;
  display: flex;
  align-items: flex-end;
}

.current__right {
  flex: 2;
  align-items: center;
  margin-left: 2rem;
  display: flex;
}

.current__minmax {
  line-height: 2.5rem;
}

.current__icon {
  width: 100px;
}

.current__description {
  font-size: 2rem;
  text-transform: capitalize;
}

.weatherreport__forecast {
  flex: 1;
  padding: 1em;
  display: flex;
}

.weatherreport__days {
  flex-grow: 1;
  border-left: 1px solid #555;
}

.days__day,
.days__minmax {
    font-size: 1.5em;
}

.days__description {
  margin-top: 10px;
}

</style>
