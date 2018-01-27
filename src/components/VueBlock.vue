<template>
  <div class="vue-block" :class="{selected: selected}" :style="style">
    <header :style="headerStyle" @mousedown.stop="headerDown">{{title}}</header>
    <div v-for="l in lines">Content {{l}}</div>
  </div>
</template>

<script>
  export default {
    name: 'VueBlock',
    props: {
      x: {
        type: Number,
        default: 0,
        validator: function (val) {
          return typeof val === 'number'
        }
      },
      y: {
        type: Number,
        default: 0,
        validator: function (val) {
          return typeof val === 'number'
        }
      },
      title: {
        type: String,
        default: 'Title'
      },
      options: {
        type: Object
      },
      lines: Array
    },
    created () {
      this.mouseX = 0
      this.mouseY = 0

      this.lastMouseX = 0
      this.lastMouseY = 0
    },
    mounted () {
      document.documentElement.addEventListener('mousemove', this.handleMove, true)
      document.documentElement.addEventListener('mousedown', this.handleDown, true)
      document.documentElement.addEventListener('mouseup', this.handleUp, true)
    },
    beforeDestroy: function () {
      document.documentElement.removeEventListener('mousemove', this.handleMove, true)
      document.documentElement.removeEventListener('mousedown', this.handleDown, true)
      document.documentElement.removeEventListener('mouseup', this.handleUp, true)
    },
    data () {
      return {
        top: this.y,
        left: this.x,
        width: this.options.width,
        height: this.options.height,
        selected: false,
        dragging: false
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

          this.moveWithDiff(diffX, diffY)
        }
      },
      handleDown (e) {
        const target = e.target || e.srcElement
        if (this.$el.contains(target)) {
          this.selected = true

          this.lastMouseX = this.mouseX
          this.lastMouseY = this.mouseY
        }

        if (!this.$el.contains(target)) {
          this.selected = false
        }

        if (e.preventDefault) e.preventDefault()
      },
      headerDown (e) {
        if (e.stopPropagation) e.stopPropagation()
        if (e.preventDefault) e.preventDefault()

        this.dragging = true
      },
      handleUp () {
        if (this.dragging) {
          this.dragging = false
          this.save()
        }
      },
      save () {
        this.$emit('update')
      },
      // public
      moveWithDiff (diffX, diffY) {
        this.left += diffX / this.options.scale
        this.top += diffY / this.options.scale

        this.$emit('update:x', this.left)
        this.$emit('update:y', this.top)
      }
    },
    computed: {
      style () {
        return {
          top: this.options.center.y + this.top * this.options.scale + 'px',
          left: this.options.center.x + this.left * this.options.scale + 'px',
          width: this.width + 'px',
          transform: 'scale(' + (this.options.scale + '') + ')',
          transformOrigin: 'top left'
        }
      },
      headerStyle () {
        return {
          height: this.options.titleHeight + 'px'
        }
      }
    }
  }
</script>

<style scoped>
  .vue-block {
    position: absolute;
    box-sizing: border-box;
    border: 1px solid black;
    background: white;
    z-index: 1;
  }

  .vue-block.selected {
    border: 1px solid red;
    z-index: 2;
  }

  .vue-block > header {
    background: #bfbfbf;
    text-align: center;
    cursor: move;
  }
</style>
