<template>
  <div id="app">
    <VueBlocksContainer :data.sync="blocksData" class="container"/>

  </div>
</template>

<script>
  import VueBlocksContainer from './components/VueBlocksContainer'

  export default {
    name: 'App',
    components: {
      VueBlocksContainer
    },
    data: function () {
      return {
        blocksData: JSON.parse(`{"blocks":[{"id":1,"x":-477,"y":-25,"title":"test 1","lines":["1"]},{"id":2,"x":143,"y":-48,"title":"test 2","lines":["1","2","3","4","5"]},{"id":3,"x":-176,"y":59,"title":"test 3","lines":["1","2"]}],"links":[{"id":1,"origin_id":1,"origin_slot":0,"target_id":2,"target_slot":0},{"id":2,"origin_id":1,"origin_slot":0,"target_id":3,"target_slot":0},{"id":3,"origin_id":3,"origin_slot":0,"target_id":2,"target_slot":1}],"container":{"centerX":655.6966211381854,"centerY":170.54603325466186,"scale":1}}`)
      }
    },
    watch: {
      blocksData (newValue, oldValue) {
        console.log(JSON.stringify(newValue))
      }
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
