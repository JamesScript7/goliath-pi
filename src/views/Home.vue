<template>
  <div class="home">
    <Wallpaper v-bind:imgUrl="imgUrl" />
    <DateAndTime />
    <!-- <CureatrDailyReport /> -->
    <!-- <WeatherReport /> -->
  </div>
</template>

// PERHAPS timer can live here and update:
// Wallpaper component every x minutes
// DateAndTime component every x seconds

// TODO:
// create <Wallpaper /> and pass props: url
// move moment.js here and pass day, date, and time props into <DateAndTime />
// Add Cureatr logo somewhere?

<script>
import axios from 'axios';
// @ is an alias to /src
import DateAndTime from '@/components/DateAndTime.vue';
import Wallpaper from '@/components/Wallpaper.vue';

const PHOTO_REFRESH_INTERVAL = 20000;
const RANDOM_PHOTO_API_URL = 'http://localhost:4000/random-photo';

export default {
  name: 'home',
  components: {
    DateAndTime,
    Wallpaper,
    // CureatrDailyReport
    // WeatherReport
  },
  data() {
    return {
      imgUrl: '',
    };
  },
  methods: {
    grabRandomPhoto() {
      console.log('grabRandomPhoto');

      axios.get(RANDOM_PHOTO_API_URL)
        .then((response) => {
          console.log('response', response);

          // TODO: prep the data better?
          this.imgUrl = response.data.urls.full;
        });
    },
    photoCountdown() {
      console.log('photoCountdown');

      setInterval(() => {
        this.grabRandomPhoto();
      }, PHOTO_REFRESH_INTERVAL);
    },
  },
  created() {
    // TODO: uncomment when ready
    this.photoCountdown();
    this.grabRandomPhoto();
  },
  destroyed() {
    clearInterval(this.photoCountdown);
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
