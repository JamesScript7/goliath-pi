<template>
  <div id="wallpaper">
    <img :alt="imgDescription" :src="imgUrl">
  </div>
</template>

<script>
export default {
  name: 'Wallpaper',
  props: {
    imgUrl: String,
    imgDescription: String,
  },
};
</script>

<style scoped>
#wallpaper img {
  min-width: 100%;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
