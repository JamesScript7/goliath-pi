<template>
  <div id="jokeoftheday" v-if="joke" :style="myStyle">
      <div class="lamejoke">
        {{ joke }}
      </div>
  </div>
</template>

<script>
export default {
  name: 'JokeOfTheDay',
  props: {
    joke: String,
  },
  watch: {
    joke: {
      handler() {
        this.setBackgroundColor();
      },
    },
  },
  data() {
    return {
      myStyle: {
        backgroundColor: '',
      },
    };
  },
  methods: {
    setBackgroundColor() {
      const colorList = [
        '#DD4124',
        '#009B77',
        '#6B5B95',
        '#001f3f',
        '#9B2335',
        '#FF851B',
        '#85144b',
        '#88B04B',
        '#98B4D4',
      ];
      const randomNum = Math.floor(Math.random() * Math.floor(colorList.length));
      this.myStyle.backgroundColor = colorList[randomNum];
    },
  },
  created() {
    this.setBackgroundColor();
  },
};
</script>

<style scoped>
#jokeoftheday {
    position: fixed;
    font-size: 7rem;
    width: 100%;
    height: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lamejoke {
    padding: 1em;
}
</style>
