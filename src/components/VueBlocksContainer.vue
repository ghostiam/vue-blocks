<template>
  <div class="vue-container">
    <VueLink :links="links" :blocks="blocks" :options="options"/>
    <VueBlock v-for="block in blocks" :key="block.id" v-bind.sync="block" :options="options"/>
  </div>
</template>

<script>
  import VueBlock from './VueBlock'
  import VueLink from './VueLink'

  export default {
    name: 'VueBlockContainer',
    components: {VueBlock, VueLink},
    mounted () {
      document.documentElement.addEventListener('mousemove', this.handleMove, true)
      document.documentElement.addEventListener('mousedown', this.handleDown, true)
      document.documentElement.addEventListener('mouseup', this.handleUp, true)
      document.documentElement.addEventListener('wheel', this.wheel, true)

      this.centerX = this.$el.clientWidth / 2
      this.centerY = this.$el.clientHeight / 2
    },
    beforeDestroy: function () {
      document.documentElement.removeEventListener('mousemove', this.handleMove, true)
      document.documentElement.removeEventListener('mousedown', this.handleDown, true)
      document.documentElement.removeEventListener('mouseup', this.handleUp, true)
      document.documentElement.removeEventListener('wheel', this.wheel, true)
    },
    created () {
      this.mouseX = 0
      this.mouseY = 0

      this.lastMouseX = 0
      this.lastMouseY = 0
    },
    data () {
      return {
        dragging: false,
        centerX: 0,
        centerY: 0,
        scale: 0.5,
        blocks: [
          {
            id: 1,
            x: 20,
            y: 20,
            title: 'test 1'
          },
          {
            id: 2,
            x: 550,
            y: 20,
            title: 'test 2'
          },
          {
            id: 3,
            x: 300,
            y: 150,
            title: 'test 3'
          }
        ],
        links: [
          {
            id: 1,
            origin_id: 1,
            origin_slot: 0,
            target_id: 2,
            target_slot: 0
          },
          {
            id: 4,
            origin_id: 3,
            origin_slot: 0,
            target_id: 2,
            target_slot: 1
          },
          {
            id: 2,
            origin_id: 1,
            origin_slot: 0,
            target_id: 3,
            target_slot: 0
          }
        ]
      }
    },
    computed: {
      options () {
        return {
          width: 200,
          titleHeight: 20,
          scale: this.scale,
          center: {
            x: this.centerX,
            y: this.centerY
          }
        }
      }
    },
    methods: {
      handleMove (e) {
        this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
        this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop

        if (this.dragging) {
          let diffX = this.mouseX - this.lastMouseX
          let diffY = this.mouseY - this.lastMouseY

          this.lastMouseX = this.mouseX
          this.lastMouseY = this.mouseY

          this.centerX += diffX
          this.centerY += diffY
        }
      },
      handleDown (e) {
        const target = e.target || e.srcElement
        if (target === this.$el || target.matches('svg, svg *')) {
          this.dragging = true

          this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
          this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop

          this.lastMouseX = this.mouseX
          this.lastMouseY = this.mouseY
        }

        if (e.preventDefault) e.preventDefault()
      },
      handleUp (e) {
        if (this.dragging) {
          this.dragging = false
        }
      },
      wheel (e) {
        let dX = this.mouseX - this.centerX
        let dY = this.mouseY - this.centerY
        let deltaScale = Math.pow(1.1, -e.deltaY * 0.1)
        this.centerX -= dX * (deltaScale - 1)
        this.centerY -= dY * (deltaScale - 1)

        console.log(e, deltaScale, dX, dY)

        this.scale *= deltaScale
      }
    }
  }
</script>

<style scoped>
  .vue-container {
    position: relative;
    overflow: hidden;
  }
</style>
