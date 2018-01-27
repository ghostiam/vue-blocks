<template>
  <svg width="100%" height="100%">
    <line v-for="l in renderedLines" :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2" :style="style"></line>
    <path v-for="p in renderedPathes" :d="p" :style="style"></path>
  </svg>
</template>

<script>
  export default {
    props: {
      /** @type {Array} */
      lines: {
        type: Array,
        default () {
          return []
        }
      },
      color: {
        type: String,
        default: 'red'
      },
      curve: {
        type: Boolean,
        default: false
      },
      options: Object
    },
    methods: {
      distance (x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
      }
    },
    computed: {
      style () {
        return {
          stroke: this.color,
          strokeWidth: 5 * this.options.scale,
          fill: 'none'
        }
      },
      renderedLines () {
        if (this.curve) {
          return []
        }
        return this.lines
      },
      renderedPathes () {
        if (!this.curve || !this.lines) {
          return []
        }

        let pathes = []
        this.lines.forEach(l => {
          let dist = this.distance(l.x1, l.y1, l.x2, l.y2) * 0.25
          pathes.push('M ' + l.x1 + ', ' + l.y1 + ' C ' + (l.x1 + dist) + ', ' + l.y1 + ', ' + (l.x2 - dist) + ', ' + l.y2 + ', ' + l.x2 + ', ' + l.y2 + '')
        })

        return pathes
      }
    }
  }
</script>

<style scoped>

</style>
