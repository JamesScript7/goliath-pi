<template>
  <div class="home">
    <Wallpaper :imgUrl="imgUrl" />
    <!-- <CureatrDailyReport /> -->
    <DateAndTime :moment="moment" />
    <WeatherReport
      :current="currentWeatherData"
      :forecast="forecastWeatherData"
      />
  </div>
</template>

// TODO:
// Add Cureatr logo
// gmail api omg

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
      currentWeatherData: {},
      forecastWeatherData: [],
    };
  },
  methods: {
    grabRandomPhoto() {
      console.log('grabRandomPhoto');

      axios.get(RANDOM_PHOTO_API_URL)
        .then((response) => {
          if (response.status === 200) {
            this.imgUrl = response.data.urls.full;
          } else {
            console.error('response:', response);
          }
        }).catch((err) => {
          console.error('Axios unsplash error:', err);
        });
    },
    grabWeatherReport() {
      console.log('grabWeatherReport');

      axios.get(WEATHER_REPORT_API_URL)
        .then((response) => {
          if (response.status === 200) {
            this.currentWeatherData = response.data.currentData;
            this.forecastWeatherData = response.data.forecastData;
          } else {
            console.error('response', response);
          }
        }).catch((err) => {
          console.error('Axios openweathermap error:', err);
        });
    },
    updatePhoto() {
      console.log('updatePhoto');

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

        this.grabWeatherReport();
      }, THIRTY_MINUTES);
    },
  },
  created() {
    this.grabRandomPhoto();
    this.grabWeatherReport();

    // setIntervals
    this.updatePhoto();
    // this.updateTime();
    // this.updateWeather();
  },
  destroyed() {
    clearInterval(this.updatePhoto);
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
