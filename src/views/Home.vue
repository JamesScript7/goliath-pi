<template>
  <div class="home">
    <Wallpaper
      :imgUrl="imgUrl"
      :imgDescription="imgDescription" />
    <CureatrDailyReport :snippet="snippet" />
    <DateAndTime :moment="moment" />
    <WeatherReport
      :current="currentWeatherData"
      :forecast="forecastWeatherData"
      />
    <JokeOfTheDay :joke="joke" />
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
// @ is an alias to /src
import Wallpaper from '@/components/Wallpaper.vue';
import CureatrDailyReport from '@/components/CureatrDailyReport.vue';
import DateAndTime from '@/components/DateAndTime.vue';
import WeatherReport from '@/components/WeatherReport.vue';
import JokeOfTheDay from '@/components/JokeOfTheDay.vue';

const ONE_SECOND = 1000;
const THIRTY_MINUTES = (ONE_SECOND * 60) * 30;
const PHOTO_REFRESH_INTERVAL = (ONE_SECOND * 60) * 5;

// LOCALHOST
const RANDOM_PHOTO_API_URL = 'http://localhost:4000/random-photo';
const WEATHER_REPORT_API_URL = 'http://localhost:4000/weather-report';
const TOP_DAILY_REPORT_URL = 'http://localhost:4000/top-daily-report';
const JOKE_URL = 'http://localhost:4000/joke';

// NETWORK
// const RANDOM_PHOTO_API_URL = 'http://10.3.0.73:4000/random-photo';
// const WEATHER_REPORT_API_URL = 'http://10.3.0.73:4000/weather-report';
// const TOP_DAILY_REPORT_URL = 'http://10.3.0.73:4000/top-daily-report';
// const JOKE_URL = 'http://10.3.0.73:4000/joke';

export default {
  name: 'home',
  components: {
    Wallpaper,
    CureatrDailyReport,
    DateAndTime,
    WeatherReport,
    JokeOfTheDay,
  },
  data() {
    return {
      imgUrl: '',
      imgDescription: '',
      joke: '',
      snippet: {},
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
    grabJoke() {
      axios.get(JOKE_URL)
        .then((response) => {
          if (response.status === 200) {
            this.joke = response.data.contents.jokes[0].joke.text;
          } else {
            console.error('response:', response);
          }
        }).catch((err) => {
          console.error('Axios unsplash error:', err);
        });
    },
    grabRandomPhoto() {
      axios.get(RANDOM_PHOTO_API_URL)
        .then((response) => {
          if (response.status === 200) {
            // useful? response.data.color

            this.imgDescription = response.data.alt_description || response.data.description;
            this.imgUrl = response.data.urls.full;
          } else {
            console.error('response:', response);
          }
        }).catch((err) => {
          console.error('Axios unsplash error:', err);
        });
    },
    grabCureatrDailyReport() {
      axios.get(TOP_DAILY_REPORT_URL)
        .then((response) => {
          if (response.status === 200) {
            this.snippet = response.data;
          } else {
            console.error('response', response);
          }
        }).catch((err) => {
          console.error('Axios gmailapi error:', err);
        });
    },
    grabWeatherReport() {
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
      setInterval(() => {
        console.log('updatePhoto');
        this.grabRandomPhoto();
      }, PHOTO_REFRESH_INTERVAL);
    },
    updateTime() {
      setInterval(() => {
        console.log('updateTime setInterval');
        const currentTime = moment().format('h:mm');

        if (this.moment.time !== currentTime) {
          this.moment.time = currentTime;
        }
      }, ONE_SECOND);
    },
    updateWeather() {
      setInterval(() => {
        console.log('updateWeather setInterval');
        this.grabWeatherReport();
      }, THIRTY_MINUTES);
    },
  },
  created() {
    this.grabJoke();
    this.grabRandomPhoto();
    this.grabCureatrDailyReport();
    this.grabWeatherReport();

    // timers
    // this.updatePhoto();
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
