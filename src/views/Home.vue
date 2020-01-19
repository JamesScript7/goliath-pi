<template>
  <div class="home">
    <img alt="imgDescription" :src="imgUrl" class="wallpaper">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

// Home:
// [] wallpaper
// [] time

// Components:
// [] gmail daily report
// [] weather report

<script>
import axios from 'axios';
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
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
      setTimeout(() => {
        this.grabRandomPhoto();
      }, 10000);
    },
  },
  created() {
    // this.photoCountdown();
    this.grabRandomPhoto();
  },
  destroyed() {
    clearTimeout(this.photoCountdown);
  },
};
</script>

<style scoped>
  .home {
      border: 1px solid gold;
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
