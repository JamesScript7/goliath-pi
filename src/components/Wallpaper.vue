<template>
  <div class="wallpaper">
    <img alt="imgDescription" :src="imgUrl">
  </div>
</template>

<script>
export default {
  name: 'Wallpaper',
  props: {
    imgUrl: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wallpaper img {
  /* Set rules to fill background */
  min-height: 100%;
  /* Set up proportionate scaling */
  width: 100%;
  height: auto;
  /* Set up positioning */
  position: fixed;
  top: 0;
  left: 0;
  /* filter: blur(1px); */
}
</style>
