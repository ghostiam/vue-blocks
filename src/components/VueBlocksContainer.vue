<template>
  <div class="vue-container">
    <VueLink :lines="lines" :options="optionsForChild"/>
    <VueBlock v-for="block in blocks" :key="block.id" v-bind.sync="block" :options="optionsForChild" @update="update"/>
  </div>
</template>

<script>
  import VueBlock from './VueBlock'
  import VueLink from './VueLink'
  import mouseHelper from '../helpers/mouse'

  export default {
    name: 'VueBlockContainer',
    components: {VueBlock, VueLink},
    props: {
      data: {
        type: Object,
        default: {blocks: [], links: [], container: {}}
      },
      options: {
        type: Object
      }
    },
    mounted () {
      document.documentElement.addEventListener('mousemove', this.handleMove, true)
      document.documentElement.addEventListener('mousedown', this.handleDown, true)
      document.documentElement.addEventListener('mouseup', this.handleUp, true)
      document.documentElement.addEventListener('wheel', this.handleWheel, true)

      this.centerX = this.$el.clientWidth / 2
      this.centerY = this.$el.clientHeight / 2

      this.importData()
    },
    beforeDestroy: function () {
      document.documentElement.removeEventListener('mousemove', this.handleMove, true)
      document.documentElement.removeEventListener('mousedown', this.handleDown, true)
      document.documentElement.removeEventListener('mouseup', this.handleUp, true)
      document.documentElement.removeEventListener('wheel', this.handleWheel, true)
    },
    created () {
      this.mouseX = 0
      this.mouseY = 0

      this.lastMouseX = 0
      this.lastMouseY = 0

      this.minScale = 0.2
      this.maxScale = 2
    },
    data () {
      return {
        dragging: false,
        centerX: 0,
        centerY: 0,
        scale: 1,
        blocks: [],
        links: []
      }
    },
    computed: {
      optionsForChild () {
        return {
          width: 200,
          titleHeight: 20,
          scale: this.scale,
          center: {
            x: this.centerX,
            y: this.centerY
          }
        }
      },
      // Links calculate
      lines () {
        let lines = []

        for (let link of this.links) {
          let originBlock = this.blocks.find(block => {
            return block.id === link.origin_id
          })

          let targetBlock = this.blocks.find(block => {
            return block.id === link.target_id
          })

          if (originBlock.length === 0 || targetBlock.length === 0) {
            console.warn('removeLink', link)
            this.removeLink(link.id)
            continue
          }

          let x1 = this.centerX + originBlock.x * this.scale + (this.optionsForChild.width / 2) + (this.optionsForChild.width * this.scale / 2)
          let y1 = this.centerY + originBlock.y * this.scale

          let x2 = this.centerX + targetBlock.x * this.scale + (this.optionsForChild.width / 2) - (this.optionsForChild.width * this.scale / 2)
          let y2 = this.centerY + targetBlock.y * this.scale

          lines.push({
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
          })
        }

        return lines
      },
      container () {
        return {
          centerX: this.centerX,
          centerY: this.centerY,
          scale: this.scale
        }
      }
    },
    methods: {
      // Events
      handleMove (e) {
        let mouse = mouseHelper.getMousePosition(this.$el, e)
        this.mouseX = mouse.x
        this.mouseY = mouse.y

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

          this.lastMouseX = this.mouseX
          this.lastMouseY = this.mouseY
        }

        if (e.preventDefault) e.preventDefault()
      },
      handleUp (e) {
        if (this.dragging) {
          this.dragging = false
          this.update()
        }
      },
      handleWheel (e) {
        if (e.preventDefault) e.preventDefault()

        let deltaScale = Math.pow(1.1, e.deltaY * -0.01)
        this.scale *= deltaScale

        if (this.scale < this.minScale) {
          this.scale = this.minScale
          return
        } else if (this.scale > this.maxScale) {
          this.scale = this.maxScale
          return
        }

        let zoomingCenter = {
          x: this.mouseX,
          y: this.mouseY
        }

        let deltaOffsetX = (zoomingCenter.x - this.centerX) * (deltaScale - 1)
        let deltaOffsetY = (zoomingCenter.y - this.centerY) * (deltaScale - 1)

        this.centerX -= deltaOffsetX
        this.centerY -= deltaOffsetY

        this.update()
      },
      // Processing
      importData () {
        this.blocks = this.data.blocks
        this.links = this.data.links

        let container = this.data.container
        this.centerX = container.centerX
        this.centerY = container.centerY
        this.scale = container.scale
      },
      update () {
        this.$emit('update:data', {blocks: this.blocks, links: this.links, container: this.container})
      }
    },
    watch: {
      data (newValue, oldValue) {
        this.importData()
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
