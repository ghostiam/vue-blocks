<template>
  <div class="blocks-property">
    {{block}}
  </div>
</template>

<script>
  export default {
    name: 'VueBlockProperty',
    props: ['block']
  }
</script>

<style lang="less" scoped>
  .blocks-property {
    position: absolute;
    right: 0;
    top: 0;

    width: 300px;
    min-height: 200px;

    border: 1px solid red;

  }
</style>
