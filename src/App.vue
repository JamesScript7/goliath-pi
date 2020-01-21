<template>
  <div id="app">
    <img alt="company-logo" src="./assets/logo.png" class="company-logo" />
    <router-view/>
  </div>
</template>

<style>
html,
body {
    margin: 0;
    height: 100%;
    background-color: black;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.company-logo {
    position: fixed;
    top: 0;
    left: 0;
    width: 15rem;
    margin: 2rem;
    z-index: 1;
}
</style>
