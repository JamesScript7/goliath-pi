<template>
  <div id="home">
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
const TWENTY_ONE_SECONDS = (ONE_SECOND * 21);
const FIVE_MINUTES = (ONE_SECOND * 60) * 5;
const THIRTY_MINUTES = (ONE_SECOND * 60) * 30;
const ONE_HOUR = (ONE_SECOND * 60) * 60;

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
      snippet: {},
      moment: {
        day: moment().format('dddd'),
        monthAndDate: moment().format('MMM Do'),
        time: moment().format('h:mm'),
        amPm: moment().format('a'),
      },
      currentWeatherData: {},
      forecastWeatherData: [],
      joke: '',
      jokeGrabbed: false,
      dailyReportGrabbed: false,
      intervalTime: undefined,
      // DELETE DEMO STUFF BELOW:
      jcounter: 0,
      jokeDemo: [
        'I ate a clock yesterday, it was very time-consuming.',
        'I’m a big fan of whiteboards. I find them quite re-markable.',
        'I was gonna tell a time-traveling joke, but you guys didn\'t like it.',
        'How do you throw a space party? You planet!',
        'Why did the gym close down? It just didn\'t work out!',
      ],
    };
  },
  methods: {
    grabJoke() {
      console.log('grabJoke');

      axios.get(JOKE_URL)
        .then((response) => {
          if (response.status === 200) {
            this.joke = response.data.contents.jokes[0].joke.text;
          } else {
            console.error('response:', response);
          }
        }).catch((err) => {
          console.error('Axios joke error:', err);
        });
    },
    grabRandomPhoto() {
      console.log('grabRandomPhoto');

      axios.get(RANDOM_PHOTO_API_URL)
        .then((response) => {
          if (response.status === 200) {
            // useful? response.data.color
            this.imgDescription = response.data.alt_description || response.data.description;
            this.imgUrl = response.data.urls.full;

            this.updatePhoto(THIRTY_MINUTES);
          } else {
            console.error('response:', response);
            this.updatePhoto(FIVE_MINUTES);
          }
        }).catch((err) => {
          console.error('Axios unsplash error:', err);
          this.updatePhoto(FIVE_MINUTES);
        });
    },
    grabCureatrDailyReport() {
      console.log('grabCureatrDailyReport');

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
      console.log('grabWeatherReport');

      axios.get(WEATHER_REPORT_API_URL)
        .then((response) => {
          if (response.status === 200) {
            this.currentWeatherData = response.data.currentData;
            this.forecastWeatherData = response.data.forecastData;

            this.updateWeather(ONE_HOUR);
          } else {
            console.error('response', response);
          }
          this.updateWeather(FIVE_MINUTES);
        }).catch((err) => {
          console.error('Axios openweathermap error:', err);
          this.updateWeather(FIVE_MINUTES);
        });
    },
    checkTime() {
      const d = new Date();
      const day = d.getDay();
      const hours = d.getHours();
      const minutes = d.getMinutes();

      // weekday: mon-fri / hours: 7am-7pm
      const isWeekDay = (day >= 1 && day <= 5);
      const isBetweenHours = (hours >= 7 && hours <= 19);
      // console.log('day:', day, 'hour:', hours);

      // 12:30pm - Tell a joke
      if (isWeekDay
        && hours === 12
        && minutes === 30
        && !this.jokeGrabbed) {
        this.grabJoke();
        this.jokeGrabbed = true;

        setTimeout(() => {
          this.joke = '';
        }, TWENTY_ONE_SECONDS);
      }

      // 6:00am - Get the latest Daily report
      if (isWeekDay
        && hours === 6
        && !this.dailyReportGrabbed) {
        this.grabCureatrDailyReport();
        this.dailyReportGrabbed = true;
      }

      // 10:00pm - Reset
      if (isWeekDay
        && hours === 22) {
        this.jokeGrabbed = false;
        this.dailyReportGrabbed = false;
      }

      return isWeekDay && isBetweenHours;
    },
    startTimer() {
      this.intervalTime = setInterval(() => {
        console.log('*');

        // Clock - Update minute
        const currentTime = moment().format('h:mm');
        if (this.moment.time !== currentTime) {
          this.moment.time = currentTime;
        }

        this.checkTime();
      }, ONE_SECOND);
    },
    updatePhoto(time) {
      if (this.checkTime()) {
        setTimeout(() => {
          this.grabRandomPhoto();
        }, time);
      } else {
        setTimeout(() => {
          this.updatePhoto(THIRTY_MINUTES);
        }, ONE_HOUR);
      }
    },
    updateWeather(time) {
      if (this.checkTime()) {
        setTimeout(() => {
          this.grabWeatherReport();
        }, time);
      } else {
        setTimeout(() => {
          this.updateWeather(ONE_HOUR);
        }, ONE_HOUR);
      }
    },
    // DELETE DEMO STUFF
    updateJokeDemo() {
      this.joke = `${this.jokeDemo[this.jcounter]}`;
      this.jcounter += 1;

      setInterval(() => {
        console.log('updatejokedemo');
        this.joke = `${this.jokeDemo[this.jcounter]}`;
        this.jcounter += 1;

        if (this.jcounter === this.jokeDemo.length) {
          this.jcounter = 0;
        }
      }, ONE_SECOND * 3);
    },
    updatePhotoDemo() {
      setInterval(() => {
        this.grabRandomPhoto();
      }, ONE_SECOND * 5);
    },
  },
  created() {
    this.grabRandomPhoto();
    this.grabCureatrDailyReport();
    this.grabWeatherReport();

    this.startTimer();

    // DELETE DEMO STUFF
    // 1
    // this.updatePhotoDemo();

    // 2
    // this.grabJoke();
    // setTimeout(() => {
    //   this.joke = '';
    // }, ONE_SECOND * 5);

    // 3
    // this.updateJokeDemo();
  },
  destroyed() {
    clearInterval(this.intervalTime);
  },
};
</script>

<style scoped>
  #home {
    position: relative;
    width: 100%;
    height: 100vh;
  }
</style>
