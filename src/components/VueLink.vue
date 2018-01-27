<template>
  <svg width="100%" height="100%">
    <g v-for="l in renderedLines">
      <line v-if="outline" :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2" :style="outlineStyle"></line>
      <line :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2" :style="style"></line>
    </g>
    <g v-for="p in renderedPathes">
      <path v-if="outline" :d="p" :style="outlineStyle"></path>
      <path :d="p" :style="style"></path>
    </g>
    <path
      v-for="a in renderedArrows"
      d="M -1 -1 L 0 1 L 1 -1 z"
      :style="arrowStyle"
      :transform="a"></path>
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
        default: '#F85' // '#AAC'
      },
      outlineColor: {
        type: String,
        default: 'black' // '#AAC'
      },
      strokeWidth: {
        type: Number,
        default: 4
      },
      outlineStrokeWidth: {
        type: Number,
        default: 8
      },
      curve: {
        type: Boolean,
        default: false
      },
      outline: {
        type: Boolean,
        default: true
      },
      options: Object
    },
    methods: {
      distance (x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
      },
      computeConnectionPoint (x1, y1, x2, y2, t) {
        let dist = this.distance(x1, y1, x2, y2)
        let p0 = {x: x1, y: y1}
        let p1 = {x: x1 + dist * 0.25, y: y1}
        let p2 = {x: x2 - dist * 0.25, y: y2}
        let p3 = {x: x2, y: y2}

        let c1 = (1 - t) * (1 - t) * (1 - t)
        let c2 = 3 * ((1 - t) * (1 - t)) * t
        let c3 = 3 * (1 - t) * (t * t)
        let c4 = t * t * t

        let x = c1 * p0.x + c2 * p1.x + c3 * p2.x + c4 * p3.x
        let y = c1 * p0.y + c2 * p1.y + c3 * p2.y + c4 * p3.y
        return {x: x, y: y}
      }
    },
    computed: {
      style () {
        return {
          stroke: this.color,
          strokeWidth: this.strokeWidth * this.options.scale,
          fill: 'none'
        }
      },
      outlineStyle () {
        return {
          stroke: this.outlineColor,
          strokeWidth: this.outlineStrokeWidth * this.options.scale,
          strokeOpacity: 0.6,
          fill: 'none'
        }
      },
      arrowStyle () {
        return {
          stroke: this.color,
          strokeWidth: this.strokeWidth * 2 * this.options.scale,
          fill: this.color
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
      },
      renderedArrows () {
        if (!this.lines) {
          return []
        }

        let arrows = []

        this.lines.forEach(l => {
          // l.x1, l.y1, l.x2, l.y2
          let pos = this.computeConnectionPoint(l.x1, l.y1, l.x2, l.y2, 0.5)
          let pos2 = this.computeConnectionPoint(l.x1, l.y1, l.x2, l.y2, 0.51)

          let angle = 0
          if (this.curve) {
            angle = -Math.atan2(pos2.x - pos.x, pos2.y - pos.y)
          } else {
            angle = l.y2 > l.y1 ? 0 : Math.PI
          }

          let degrees = (angle >= 0 ? angle : (2 * Math.PI + angle)) * 180 / Math.PI
          // {x: pos.x, y: pos.y, angle: angle}
          arrows.push(`translate(${pos.x}, ${pos.y}) rotate(${degrees})`)
        })

        return arrows
      }
    }
  }
</script>

<style scoped>

</style>
