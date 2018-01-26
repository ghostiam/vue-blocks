<template>
  <div id="app">
    <VueBlocksContainer class="container"/>
  </div>
</template>

<script>
  import VueBlocksContainer from './components/VueBlocksContainer'

  export default {
    name: 'App',
    components: {
      VueBlocksContainer
    }
  }
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
  }

  html {
    width: 100vw;
    height: 100vh;
  }

  body {
    width: 100%;
    height: 100%;
  }

  #app {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    padding: 20px 0 0 20px;
  }

  .container {
    width: 100%;
    height: 100%;
    border: 1px solid black;
  }
</style>
