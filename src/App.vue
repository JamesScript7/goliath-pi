<template>
  <div id="app">
      <div class="company-logo">
        <img alt="company-logo" src="./assets/logo.png" />
      </div>
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
    width: 35%;
    padding: 1.5rem;
    text-align: left;
    background: linear-gradient(to right, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
    z-index: 1;
}

.company-logo img {
    width: 18rem;
}
</style>
