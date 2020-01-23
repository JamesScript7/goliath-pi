<template>
  <div class="jokeoftheday">
      <div class="lamejoke --hide">
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
};
</script>

<style scoped>
.--hide {
    display: none;
}

.jokeoftheday {
    position: fixed;
    font-size: 7rem;
    height: 100%;
    color: #fff;
    background-color: black;
    display: flex;
    align-items: center;
}

.lamejoke {
    padding: 1em;
}
</style>
