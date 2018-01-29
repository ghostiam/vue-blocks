<template>
  <div class="blocks-properties">
    <div class="property" v-for="p in properties">
      <label :for="p.name">{{p.label||p.name}}:</label>
      <br>
      <input type="text" v-model="p.value">
    </div>
    <button @click.prevent="save">Save</button>
  </div>
</template>

<script>
  export default {
    name: 'VueBlockProperty',
    props: ['property'],
    data () {
      return {
        properties: []
      }
    },
    methods: {
      loadProperties () {
        this.properties = this.property
      },
      save () {
        this.$emit('save', this.properties)
      }
    },
    watch: {
      property () {
        this.loadProperties()
      }
    }
  }
</script>

<style lang="less" scoped>
  .blocks-properties {
    position: absolute;
    right: 0;
    top: 0;

    width: 300px;
    min-height: 200px;
    box-sizing: border-box;
    padding: 10px;

    background: #ffffff;
    border: 1px solid red;
    .property {

    }
  }
</style>
