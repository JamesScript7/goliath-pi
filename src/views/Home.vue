<template>
  <div class="home">
    <Wallpaper v-bind:imgUrl="imgUrl" />
    <!-- <CureatrDailyReport /> -->
    <DateAndTime v-bind:moment="moment" />
    <WeatherReport />
  </div>
</template>

// TODO:
// Add Cureatr logo
// WeatherReport client and serverside

<script>
import axios from 'axios';
import moment from 'moment';
// @ is an alias to /src
import Wallpaper from '@/components/Wallpaper.vue';
// import CureatrDailyReport from '@/components/CureatrDailyReport.vue';
import DateAndTime from '@/components/DateAndTime.vue';
import WeatherReport from '@/components/WeatherReport.vue';

const ONE_SECOND = 1000;
const THIRTY_MINUTES = (ONE_SECOND * 60) * 30;
const PHOTO_REFRESH_INTERVAL = (ONE_SECOND * 60) * 5;
const RANDOM_PHOTO_API_URL = 'http://localhost:4000/random-photo';
const WEATHER_REPORT_API_URL = 'http://localhost:4000/weather-report';

export default {
  name: 'home',
  components: {
    Wallpaper,
    // CureatrDailyReport
    DateAndTime,
    WeatherReport,
  },
  data() {
    return {
      imgUrl: '',
      moment: {
        day: moment().format('dddd'),
        monthAndDate: moment().format('MMM Do'),
        time: moment().format('h:mm'),
        amPm: moment().format('a'),
      },
    };
  },
  methods: {
    grabRandomPhoto() {
      console.log('grabRandomPhoto');

      axios.get(RANDOM_PHOTO_API_URL)
        .then((response) => {
          // if status is ok check?
          // NOTE: prep the data better?
          this.imgUrl = response.data.urls.full;
        });
    },
    grabWeatherReport() {
      console.log('grabWeatherReport');

      axios.get(WEATHER_REPORT_API_URL)
        .then((response) => {
          console.log(response);
          // if status is ok check?
          // NOTE: prep the data better?
          // this.imgUrl = response.data.urls.full;
        });
    },
    photoCountdown() {
      console.log('photoCountdown');

      setInterval(() => {
        this.grabRandomPhoto();
      }, PHOTO_REFRESH_INTERVAL);
    },
    updateTime() {
      console.log('updateTime');

      setInterval(() => {
        console.log('updateTime setInterval');
        const currentTime = moment().format('h:mm');

        if (this.moment.time !== currentTime) {
          this.moment.time = currentTime;
        }
      }, ONE_SECOND);
    },
    updateWeather() {
      console.log('updateWeather');

      setInterval(() => {
        console.log('updateWeather setInterval');
        // TODO:
        // Updates weather every 30 minutes?
      }, THIRTY_MINUTES);
    },
  },
  created() {
    this.photoCountdown();
    this.grabRandomPhoto();
    this.updateTime();
  },
  destroyed() {
    clearInterval(this.photoCountdown);
    clearInterval(this.updateTime);
  },
};
</script>

<style scoped>
  .home {
    position: relative;
    width: 100%;
    height: 100vh;
  }
</style>
