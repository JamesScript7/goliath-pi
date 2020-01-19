<template>
  <div class="home">
    <!-- Move to own component? -->
    <img alt="imgDescription" :src="imgUrl" class="wallpaper">
    <DateAndTime />
    <!-- TODO: -->
    <!-- <CureatrDailyReport /> -->
    <!-- <WeatherReport /> -->
  </div>
</template>

<script>
import axios from 'axios';
// @ is an alias to /src
import DateAndTime from '@/components/DateAndTime.vue';

const PHOTO_REFRESH_INTERVAL = 10000;

export default {
  name: 'home',
  components: {
    DateAndTime,
    // TODO:
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

      axios.get('http://localhost:4000/random-photo')
        .then((response) => {
          console.log('response', response);
          // this.imgUrl = `${this.imgUrl}${response.data.urls.full}`;
          this.imgUrl = 'https://source.unsplash.com/random/2048x1536';
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
    // this.photoCountdown();
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
  }

  .wallpaper {
    /* Set rules to fill background */
    min-height: 100%;
    /* Set up proportionate scaling */
    width: 100%;
    height: auto;
    /* Set up positioning */
    position: fixed;
    top: 0;
    left: 0;
    /* TODO: perhaps remove? */
    filter: blur(1px);
  }
</style>
