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
      links: Array,
      /** @type {Array} */
      blocks: Array,
      options: Object
    },
    methods: {
      verticalOffset (y, slot) {
        let skipHeader = this.options.titleHeight
        let offsetY = 10
        return y + skipHeader + offsetY + (offsetY * 2 * slot) * this.options.scale
      },
      distance (x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
      },
      removeLink (id) {
        console.log('removeLink', id)
      }
    },
    computed: {
      lines: function () {
        let lines = []

        for (let link of this.links) {
          let originBlock = this.blocks.find(block => {
            return block.id === link.origin_id
          })

          let targetBlock = this.blocks.find(block => {
            return block.id === link.target_id
          })

          if (originBlock.length === 0 || targetBlock.length === 0) {
            this.removeLink(link.id)
            continue
          }

          let x1 = this.options.center.x + originBlock.x * this.options.scale + (this.options.width / 2) + (this.options.width * this.options.scale / 2)
          let y1 = this.options.center.y + originBlock.y * this.options.scale

          let x2 = this.options.center.x + targetBlock.x * this.options.scale + (this.options.width / 2) - (this.options.width * this.options.scale / 2)
          let y2 = this.options.center.y + targetBlock.y * this.options.scale

          lines.push({
            x1: x1,
            y1: this.verticalOffset(y1, link.origin_slot),
            x2: x2,
            y2: this.verticalOffset(y2, link.target_slot)
          })
        }

        return lines
      },
      style () {
        return {
          stroke: 'rgb(255,0,0)',
          strokeWidth: 5 * this.options.scale,
          fill: 'none'
        }
      },
      renderedLines () {
        return []
      },
      renderedPathes () {
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
