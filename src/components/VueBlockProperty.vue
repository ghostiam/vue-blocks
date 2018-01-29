<template>
  <div class="blocks-property">
    <div v-for="p in properties">
      <label :for="p.name">{{p.label}}:</label>
      <input type="text" :value="p.value">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VueBlockProperty',
    props: ['block'],
    computed: {
      properties () {
        if (!this.block || !this.block.values || !this.block.values.property) {
          return null
        }

        return this.block.values.property
      }
    }
  }
</script>

<style lang="less" scoped>
  .blocks-property {
    position: absolute;
    right: 0;
    top: 0;

    width: 300px;
    min-height: 200px;

    background: #ffffff;
    border: 1px solid red;

  }
</style>
