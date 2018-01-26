<template>
  <div class="vue-block" :class="{selected: selected}" :style="style">
    <header :style="headerStyle" @mousedown.stop="headerDown">{{title}}</header>
    <div>Content</div>
    <div>Content</div>
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
      }
    },
    created () {
      this.mouseX = 0
      this.mouseY = 0

      this.lastMouseX = 0
      this.lastMouseY = 0

      this.mouseOffX = 0
      this.mouseOffY = 0
    },
    mounted () {
      document.documentElement.addEventListener('mousemove', this.handleMove, true)
      document.documentElement.addEventListener('mousedown', this.handleDown, true)
      document.documentElement.addEventListener('mouseup', this.handleUp, true)

      console.log(this.style)
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
        if (this.dragging) {
          this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
          this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop

          let diffX = this.mouseX - this.lastMouseX + this.mouseOffX
          let diffY = this.mouseY - this.lastMouseY + this.mouseOffY

          this.lastMouseX = this.mouseX
          this.lastMouseY = this.mouseY

          this.moveWithDiff(diffX, diffY)
        }
      },
      handleDown (e) {
        const target = e.target || e.srcElement
        if (this.$el.contains(target)) {
          this.selected = true

          this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
          this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop

          this.lastMouseX = this.mouseX
          this.lastMouseY = this.mouseY
        }

        if (!this.$el.contains(target)) {
          this.selected = false
        }
      },
      headerDown (e) {
        if (e.stopPropagation) e.stopPropagation()
        if (e.preventDefault) e.preventDefault()

        this.dragging = true
      },
      handleUp (e) {
        if (this.dragging) {
          this.dragging = false
        }
      },
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
          height: this.height + 'px',
          transform: 'scale(' + (this.options.scale + '') + ')'
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
