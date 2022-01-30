<template>
  <svg width="100%" height="100%">
    <g v-for="(p, index) in renderedPathes" :key="'g'+index">
      <path v-if="outline" :d="p.data" :style="p.styleOutline"></path>
      <path :d="p.data" :style="p.styleLink"></path>
    </g>
    <g>
      <path v-for="(a, index) in renderedArrows" :key="'a'+index"
        d="M -1 -1 L 0 1 L 1 -1 z"
        :style="a.styleArrow"
        :transform="a.transform"></path>
    </g>
  </svg>
</template>

<script>
  export default {
    props: {
      lines: {
        type: Array,
        default () {
          return []
        }
      },
      outline: {
        type: Boolean,
        default: false
      }
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
      renderedPathes () {
        if (!this.lines) {
          return []
        }

        let pathes = []
        this.lines.forEach(l => {
          let dist = this.distance(l.x1, l.y1, l.x2, l.y2) * 0.25
          pathes.push({
            data: `M ${l.x1}, ${l.y1} C ${(l.x1 + dist)}, ${l.y1}, ${(l.x2 - dist)}, ${l.y2}, ${l.x2}, ${l.y2}`,
            styleLink: l.styleLink,
            styleOutline: l.styleOutline
          })
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

          let angle = -Math.atan2(pos2.x - pos.x, pos2.y - pos.y)
          let degrees = (angle >= 0 ? angle : (2 * Math.PI + angle)) * 180 / Math.PI

          arrows.push({
            transform: `translate(${pos.x}, ${pos.y}) rotate(${degrees})`,
            styleArrow: {
              stroke: l.styleLink.stroke,
              strokeWidth: l.styleLink.strokeWidth * 2,
              fill: l.styleLink.stroke
            }
          })
        })

        return arrows
      }
    }
  }
</script>

<style scoped>

</style>
