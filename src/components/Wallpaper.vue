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
  /* width: 100%; */
  min-width: 100%;
  /* height: auto; */
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  filter: blur(1px);
}
</style>
