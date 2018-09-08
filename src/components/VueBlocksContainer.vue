<template>
  <div class="vue-container">
    <VueLink :lines="lines"/>
    <VueBlock v-for="block in blocks"
              :key="block.id"
              v-bind.sync="block"
              :options="optionsForChild"
              @update="updateScene"
              @linkingStart="linkingStart(block, $event)"
              @linkingStop="linkingStop(block, $event)"
              @linkingBreak="linkingBreak(block, $event)"
              @select="blockSelect(block)"
              @delete="blockDelete(block)"
    />
  </div>
</template>

<script>
  import merge from 'deepmerge'
  import mouseHelper from '../helpers/mouse'

  import VueBlock from './VueBlock'
  import VueLink from './VueLink'

  export default {
    name: 'VueBlockContainer',
    components: {
      VueBlock,
      VueLink
    },
    props: {
      blocksContent: {
        type: Array,
        default () {
          return []
        }
      },
      scene: {
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

      this.importBlocksContent()
      this.importScene()
    },
    beforeDestroy () {
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
      this.maxScale = 5

      this.linking = false
      this.linkStartData = null

      this.inputSlotClassName = 'inputSlot'

      this.defaultScene = {
        blocks: [],
        links: [],
        container: {}
      }
    },
    data () {
      return {
        dragging: false,
        //
        centerX: 0,
        centerY: 0,
        scale: 1,
        //
        nodes: [],
        blocks: [],
        links: [],
        //
        tempLink: null,
        selectedBlock: null,
        hasDragged: false
      }
    },
    computed: {
      optionsForChild () {
        return {
          width: 200,
          titleHeight: 20,
          scale: this.scale,
          inputSlotClassName: this.inputSlotClassName,
          center: {
            x: this.centerX,
            y: this.centerY
          }
        }
      },
      container () {
        return {
          centerX: this.centerX,
          centerY: this.centerY,
          scale: this.scale
        }
      },
      // Links calculate
      lines () {
        let lines = []

        for (let link of this.links) {
          let originBlock = this.blocks.find(block => {
            return block.id === link.originID
          })

          let targetBlock = this.blocks.find(block => {
            return block.id === link.targetID
          })

          if (!originBlock || !targetBlock) {
            console.log('Remove invalid link', link)
            this.removeLink(link.id)
            continue
          }

          if (originBlock.id === targetBlock.id) {
            console.log('Loop detected, remove link', link)
            this.removeLink(link.id)
            continue
          }

          let originLinkPos = this.getConnectionPos(originBlock, link.originSlot, false)
          let targetLinkPos = this.getConnectionPos(targetBlock, link.targetSlot, true)

          if (!originLinkPos || !targetLinkPos) {
            console.log('Remove invalid link (slot not exist)', link)
            this.removeLink(link.id)
            continue
          }

          let x1 = originLinkPos.x
          let y1 = originLinkPos.y

          let x2 = targetLinkPos.x
          let y2 = targetLinkPos.y

          lines.push({
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            style: {
              stroke: '#F85',
              strokeWidth: 4 * this.scale,
              fill: 'none'
            },
            outlineStyle: {
              stroke: '#666',
              strokeWidth: 6 * this.scale,
              strokeOpacity: 0.6,
              fill: 'none'
            }
          })
        }

        if (this.tempLink) {
          this.tempLink.style = {
            stroke: '#8f8f8f',
            strokeWidth: 4 * this.scale,
            fill: 'none'
          }

          lines.push(this.tempLink)
        }

        return lines
      }
    },
    methods: {
      // Events
      /** @param e {MouseEvent} */
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

          this.hasDragged = true
        }

        if (this.linking && this.linkStartData) {
          let linkStartPos = this.getConnectionPos(this.linkStartData.block, this.linkStartData.slotNumber, false)
          this.tempLink = {
            x1: linkStartPos.x,
            y1: linkStartPos.y,
            x2: this.mouseX,
            y2: this.mouseY
          }
        }
      },
      handleDown (e) {
        const target = e.target || e.srcElement
        if ((target === this.$el || target.matches('svg, svg *')) && e.which === 1) {
          this.dragging = true

          let mouse = mouseHelper.getMousePosition(this.$el, e)
          this.mouseX = mouse.x
          this.mouseY = mouse.y

          this.lastMouseX = this.mouseX
          this.lastMouseY = this.mouseY

          this.deselectAll()
          if (e.preventDefault) e.preventDefault()
        }
      },
      handleUp (e) {
        const target = e.target || e.srcElement

        if (this.dragging) {
          this.dragging = false

          if (this.hasDragged) {
            this.updateScene()
            this.hasDragged = false
          }
        }

        if (this.$el.contains(target) && (typeof target.className !== 'string' || target.className.indexOf(this.inputSlotClassName) === -1)) {
          this.linking = false
          this.tempLink = null
          this.linkStartData = null
        }
      },
      handleWheel (e) {
        const target = e.target || e.srcElement
        if (this.$el.contains(target)) {
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

          this.updateScene()
        }
      },
      // Processing
      getConnectionPos (block, slotNumber, isInput) {
        if (!block || slotNumber === -1) {
          return undefined
        }

        let x = 0
        let y = 0

        x += block.x
        y += block.y

        y += this.optionsForChild.titleHeight

        if (isInput && block.inputs.length > slotNumber) {
        } else if (!isInput && block.outputs.length > slotNumber) {
          x += this.optionsForChild.width
        } else {
          console.error('slot ' + slotNumber + ' not found, is input: ' + isInput, block)
          return undefined
        }

        // (height / 2 + blockBorder + padding)
        y += (16 / 2 + 1 + 2)
        //  + (height * slotNumber)
        y += (16 * slotNumber)

        x *= this.scale
        y *= this.scale

        x += this.centerX
        y += this.centerY

        return {x: x, y: y}
      },
      // Linking
      linkingStart (block, slotNumber) {
        this.linkStartData = {block: block, slotNumber: slotNumber}
        let linkStartPos = this.getConnectionPos(this.linkStartData.block, this.linkStartData.slotNumber, false)
        this.tempLink = {
          x1: linkStartPos.x,
          y1: linkStartPos.y,
          x2: this.mouseX,
          y2: this.mouseY
        }

        this.linking = true
      },
      linkingStop (targetBlock, slotNumber) {
        if (this.linkStartData && targetBlock && slotNumber > -1) {
          this.links = this.links.filter(value => {
            return !(value.targetID === targetBlock.id && value.targetSlot === slotNumber)
          })

          let maxID = Math.max(0, ...this.links.map(function (o) {
            return o.id
          }))

          // skip if looping
          if (this.linkStartData.block.id !== targetBlock.id) {
            this.links.push({
              id: maxID + 1,
              originID: this.linkStartData.block.id,
              originSlot: this.linkStartData.slotNumber,
              targetID: targetBlock.id,
              targetSlot: slotNumber
            })
            this.updateScene()
          }
        }

        this.linking = false
        this.tempLink = null
        this.linkStartData = null
      },
      linkingBreak (targetBlock, slotNumber) {
        if (targetBlock && slotNumber > -1) {
          let findLink = this.links.find(value => {
            return value.targetID === targetBlock.id && value.targetSlot === slotNumber
          })

          if (findLink) {
            let findBlock = this.blocks.find(value => {
              return value.id === findLink.originID
            })

            this.links = this.links.filter(value => {
              return !(value.targetID === targetBlock.id && value.targetSlot === slotNumber)
            })

            this.linkingStart(findBlock, findLink.originSlot)

            this.updateScene()
          }
        }
      },
      removeLink (linkID) {
        this.links = this.links.filter(value => {
          return !(value.id === linkID)
        })
      },
      // Blocks
      addNewBlock (nodeName, x, y) {
        let maxID = Math.max(0, ...this.blocks.map(function (o) {
          return o.id
        }))

        let node = this.nodes.find(n => {
          return n.name === nodeName
        })

        if (!node) {
          return
        }
        let block = this.createBlock(node, maxID + 1)

        // if x or y not set, place block to center
        if (x === undefined || y === undefined) {
          x = (this.$el.clientWidth / 2 - this.centerX) / this.scale
          y = (this.$el.clientHeight / 2 - this.centerY) / this.scale
        } else {
          x = (x - this.centerX) / this.scale
          y = (y - this.centerY) / this.scale
        }

        block.x = x
        block.y = y
        this.blocks.push(block)

        this.updateScene()
      },
      createBlock (node, id) {
        let inputs = []
        let outputs = []
        let values = {}

        node.fields.forEach(field => {
          if (field.attr === 'input') {
            inputs.push({
              name: field.name,
              label: field.label || field.name
            })
          } else if (field.attr === 'output') {
            outputs.push({
              name: field.name,
              label: field.label || field.name
            })
          } else {
            if (!values[field.attr]) {
              values[field.attr] = {}
            }

            let newField = merge({}, field)
            delete newField['name']
            delete newField['attr']

            if (!values[field.attr][field.name]) {
              values[field.attr][field.name] = {}
            }

            values[field.attr][field.name] = newField
          }
        })

        return {
          id: id,
          x: 0,
          y: 0,
          selected: false,
          name: node.name,
          title: node.title || node.name,
          inputs: inputs,
          outputs: outputs,
          values: values
        }
      },
      deselectAll (withoutID = null) {
        this.blocks.forEach((value) => {
          if (value.id !== withoutID && value.selected) {
            this.blockDeselect(value)
          }
        })
      },
      // Events
      blockSelect (block) {
        block.selected = true
        this.selectedBlock = block
        this.deselectAll(block.id)
        this.$emit('blockSelect', block)
      },
      blockDeselect (block) {
        block.selected = false

        if (block &&
          this.selectedBlock &&
          this.selectedBlock.id === block.id
        ) {
          this.selectedBlock = null
        }

        this.$emit('blockDeselect', block)
      },
      blockDelete (block) {
        if (block.selected) {
          this.blockDeselect(block)
        }
        this.links.forEach(l => {
          if (l.originID === block.id || l.targetID === block.id) {
            this.removeLink(l.id)
          }
        })
        this.blocks = this.blocks.filter(b => {
          return b.id !== block.id
        })
        this.updateScene()
      },
      //
      prepareBlocks (blocks) {
        return blocks.map(block => {
          let node = this.nodes.find(n => {
            return n.name === block.name
          })

          if (!node) {
            return null
          }

          let newBlock = this.createBlock(node, block.id)

          newBlock = merge(newBlock, block, {
            arrayMerge: (d, s) => {
              return s.length === 0 ? d : s
            }
          })

          return newBlock
        }).filter(b => {
          return !!b
        })
      },
      prepareBlocksLinking (blocks, links) {
        if (!blocks) {
          return []
        }

        let newBlocks = []

        blocks.forEach(block => {
          let inputs = links.filter(link => {
            return link.targetID === block.id
          })

          let outputs = links.filter(link => {
            return link.originID === block.id
          })

          block.inputs.forEach((s, index) => {
            // is linked
            block.inputs[index].active = inputs.some(i => i.targetSlot === index)
          })

          block.outputs.forEach((s, index) => {
            // is linked
            block.outputs[index].active = outputs.some(i => i.originSlot === index)
          })

          newBlocks.push(block)
        })

        return newBlocks
      },
      importBlocksContent () {
        if (this.blocksContent) {
          this.nodes = merge([], this.blocksContent)
        }
      },
      importScene () {
        let scene = merge(this.defaultScene, this.scene)

        let blocks = this.prepareBlocks(scene.blocks)
        blocks = this.prepareBlocksLinking(blocks, scene.links)

        // set last selected after update blocks from props
        if (this.selectedBlock) {
          let block = blocks.find(b => this.selectedBlock.id === b.id)
          if (block) {
            block.selected = true
          }
        }

        this.blocks = blocks
        this.links = merge([], scene.links)

        let container = scene.container
        if (container.centerX) {
          this.centerX = container.centerX
        }
        if (container.centerY) {
          this.centerY = container.centerY
        }
        if (container.scale) {
          this.scale = container.scale
        }
      },
      exportScene () {
        let clonedBlocks = merge([], this.blocks)
        let blocks = clonedBlocks.map(value => {
          delete value['inputs']
          delete value['outputs']
          delete value['selected']

          return value
        })

        return {
          blocks: blocks,
          links: this.links,
          container: this.container
        }
      },
      updateScene () {
        this.$emit('update:scene', this.exportScene())
      }
    },
    watch: {
      blocksContent () {
        this.importBlocksContent()
      },
      scene () {
        this.importScene()
      }
    }
  }
</script>

<style lang="less" scoped>
  .vue-container {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }
</style>
