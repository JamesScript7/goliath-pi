<template>
  <div class="jokeoftheday">
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
};
</script>

<style scoped>
.jokeoftheday {
    position: fixed;
    font-size: 8rem;
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
