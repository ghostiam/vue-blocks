<template>
  <div id="app">
    <VueBlocksContainer ref="container" :blocksContent="blocks" :scene.sync="scene" @blockSelect="selectBlock"
                        @blockDeselect="deselectBlock" class="container"/>
    <VueBlockProperty :property="selectedBlockProperty" @save="saveProperty"/>
    <select name="type" v-model="selectedType">
      <template v-for="type in selectBlocksType">
        <optgroup :label="type">
          <option v-for="block in filteredBlocks(type)" :value="block.name">{{block.title || block.name}}</option>
        </optgroup>
      </template>
    </select>
    <button @click.stop="addBlock">Add</button>
  </div>
</template>

<script>
  import merge from 'deepmerge'

  import VueBlocksContainer from './components/VueBlocksContainer'
  import VueBlockProperty from './components/VueBlockProperty'

  export default {
    name: 'App',
    components: {
      VueBlocksContainer,
      VueBlockProperty
    },
    data: function () {
      return {
        blocks: [
          {
            name: 'text',
            title: 'Text',
            family: 'Animations',
            description: 'Show text',
            fields: [
              {
                name: 'text',
                label: 'Text',
                type: 'string',
                attr: 'property'
              },
              {
                name: 'delay',
                label: 'Delay (s)',
                type: 'number',
                attr: 'property'
              },
              {
                name: 'Show',
                type: 'event',
                attr: 'input'
              },
              {
                name: 'Hide',
                type: 'event',
                attr: 'input'
              },
              {
                name: 'onShow',
                type: 'event',
                attr: 'output'
              },
              {
                name: 'onHide',
                type: 'event',
                attr: 'output'
              }
            ]
          },
          {
            name: 'animation',
            title: 'Animation',
            family: 'Animations',
            description: 'Show animation',
            fields: [
              {
                name: 'animation',
                label: 'Animation',
                type: 'animation',
                attr: 'property'
              },
              {
                name: 'Play',
                type: 'event',
                attr: 'input'
              },
              {
                name: 'Stop',
                type: 'event',
                attr: 'input'
              },
              {
                name: 'onEnd',
                type: 'event',
                attr: 'output'
              }
            ]
          },
          {
            name: 'Chat message',
            family: 'Events',
            description: '',
            fields: [
              {
                name: 'message',
                label: 'Activation message',
                type: 'string',
                attr: 'property'
              },
              {
                name: 'onMessage',
                type: 'event',
                attr: 'output'
              }
            ]
          },
          {
            name: 'delay',
            title: 'Delay',
            family: 'Time',
            description: '',
            fields: [
              {
                name: 'delay',
                label: 'Delay (s)',
                type: 'number',
                attr: 'property',
                value: 1.0
              },
              {
                name: 'input',
                type: 'event',
                attr: 'input'
              },
              {
                name: 'output',
                type: 'event',
                attr: 'output'
              }
            ]
          },
          {
            name: 'shortcuts',
            title: 'Shortcuts',
            family: 'Events',
            description: 'Press shortcut for call event',
            fields: [
              {
                name: 'keys',
                label: 'Activation keys',
                type: 'keys',
                attr: 'property'
              },
              {
                name: 'onPress',
                type: 'event',
                attr: 'output'
              }
            ]
          },
          {
            name: 'splitter',
            title: 'Splitter',
            family: 'Helpers',
            description: 'Press shortcut for call event',
            fields: [
              {
                name: 'input',
                type: 'event',
                attr: 'input'
              },
              {
                name: 'output',
                type: 'event',
                attr: 'output'
              },
              {
                name: 'output',
                type: 'event',
                attr: 'output'
              },
              {
                name: 'output',
                type: 'event',
                attr: 'output'
              },
              {
                name: 'output',
                type: 'event',
                attr: 'output'
              }
            ]
          }
        ],
        scene: {
          blocks: [
            {
              id: 2,
              x: -700,
              y: -69,
              name: 'Chat message',
              title: 'Chat message',
              values: {
                property: [
                  {
                    name: 'message',
                    type: 'string'
                  }
                ]
              }
            },
            {
              id: 4,
              x: -157,
              y: -68.5,
              name: 'text',
              title: 'Text',
              values: {
                property: {
                  text: {
                    label: 'Text',
                    type: 'string'
                  }
                }
              }
            },
            {
              id: 5,
              x: 136,
              y: -48.5,
              name: 'text',
              title: 'Text',
              values: {
                property: {
                  text: {
                    label: 'Text',
                    type: 'string'
                  }
                }
              }
            },
            {
              id: 6,
              x: -440,
              y: -15.5,
              name: 'delay',
              title: 'Delay',
              values: {
                property: {
                  delay: {
                    label: 'Delay (s)',
                    type: 'number',
                    value: 1
                  }
                }
              }
            },
            {
              id: 7,
              x: -694,
              y: 60.5,
              name: 'shortcuts',
              title: 'Shortcuts',
              values: {
                property: {
                  keys: {
                    label: 'Activation keys',
                    type: 'keys'
                  }
                }
              }
            },
            {
              id: 8,
              x: -163,
              y: 59.5,
              name: 'text',
              title: 'Text',
              values: {
                property: {
                  text: {
                    label: 'Text',
                    type: 'string'
                  }
                }
              }
            },
            {
              id: 9,
              x: -429,
              y: 125.5,
              name: 'delay',
              title: 'Delay',
              values: {
                property: {
                  delay: {
                    label: 'Delay (s)',
                    type: 'number',
                    value: 1
                  }
                }
              }
            },
            {
              id: 10,
              x: 126,
              y: 127.5,
              name: 'text',
              title: 'Text',
              values: {
                property: {
                  text: {
                    label: 'Text',
                    type: 'string'
                  }
                }
              }
            },
            {
              id: 11,
              x: -856,
              y: 252.5,
              name: 'shortcuts',
              title: 'Shortcuts',
              values: {
                property: {
                  keys: {
                    label: 'Activation keys',
                    type: 'keys'
                  }
                }
              }
            },
            {
              id: 12,
              x: -616,
              y: 319.5,
              name: 'delay',
              title: 'Delay',
              values: {
                property: {
                  delay: {
                    label: 'Delay (s)',
                    type: 'number',
                    value: 1
                  }
                }
              }
            },
            {
              id: 13,
              x: -381,
              y: 252.5,
              name: 'text',
              title: 'Text',
              values: {
                property: {
                  text: {
                    label: 'Text',
                    type: 'string'
                  }
                }
              }
            },
            {
              id: 14,
              x: 166,
              y: 266.5,
              name: 'text',
              title: 'Text',
              values: {
                property: {
                  text: {
                    label: 'Text',
                    type: 'string'
                  }
                }
              }
            },
            {
              id: 15,
              x: -149,
              y: 269.5,
              name: 'delay',
              title: 'Delay',
              values: {
                property: {
                  delay: {
                    label: 'Delay (s)',
                    type: 'number',
                    value: 1
                  }
                }
              }
            },
            {
              id: 16,
              x: 413,
              y: 267.5,
              name: 'animation',
              title: 'Animation',
              values: {
                property: {
                  animation: {
                    label: 'Animation',
                    type: 'animation'
                  }
                }
              }
            },
            {
              id: 17,
              x: 13,
              y: 380.5,
              name: 'delay',
              title: 'Delay',
              values: {
                property: {
                  delay: {
                    label: 'Delay (s)',
                    type: 'number',
                    value: 1
                  }
                }
              }
            }
          ],
          links: [
            {
              id: 3,
              originID: 2,
              originSlot: 0,
              targetID: 4,
              targetSlot: 0
            },
            {
              id: 6,
              originID: 7,
              originSlot: 0,
              targetID: 8,
              targetSlot: 0
            },
            {
              id: 7,
              originID: 7,
              originSlot: 0,
              targetID: 9,
              targetSlot: 0
            },
            {
              id: 8,
              originID: 9,
              originSlot: 0,
              targetID: 10,
              targetSlot: 0
            },
            {
              id: 9,
              originID: 9,
              originSlot: 0,
              targetID: 8,
              targetSlot: 1
            },
            {
              id: 10,
              originID: 2,
              originSlot: 0,
              targetID: 6,
              targetSlot: 0
            },
            {
              id: 11,
              originID: 6,
              originSlot: 0,
              targetID: 4,
              targetSlot: 1
            },
            {
              id: 12,
              originID: 4,
              originSlot: 1,
              targetID: 5,
              targetSlot: 0
            },
            {
              id: 13,
              originID: 11,
              originSlot: 0,
              targetID: 13,
              targetSlot: 0
            },
            {
              id: 14,
              originID: 11,
              originSlot: 0,
              targetID: 12,
              targetSlot: 0
            },
            {
              id: 15,
              originID: 12,
              originSlot: 0,
              targetID: 13,
              targetSlot: 1
            },
            {
              id: 16,
              originID: 13,
              originSlot: 1,
              targetID: 15,
              targetSlot: 0
            },
            {
              id: 17,
              originID: 15,
              originSlot: 0,
              targetID: 14,
              targetSlot: 0
            },
            {
              id: 18,
              originID: 14,
              originSlot: 0,
              targetID: 16,
              targetSlot: 0
            },
            {
              id: 19,
              originID: 14,
              originSlot: 1,
              targetID: 16,
              targetSlot: 1
            },
            {
              id: 20,
              originID: 15,
              originSlot: 0,
              targetID: 17,
              targetSlot: 0
            },
            {
              id: 21,
              originID: 17,
              originSlot: 0,
              targetID: 14,
              targetSlot: 1
            }
          ],
          container: {
            centerX: 1042,
            centerY: 140,
            scale: 1
          }
        },
        /* scene: {
          blocks: [
            {
              id: 1,
              x: -490,
              y: -161,
              title: 'test 1',
              values: {},
              inputs: [],
              outputs: [
                {
                  name: 'out1',
                  active: true
                }
              ]
            },
            {
              id: 2,
              x: 161,
              y: -165,
              title: 'test 2',
              values: {},
              inputs: [
                {
                  name: 'in1',
                  active: true
                },
                {
                  name: 'in2',
                  active: true
                },
                {
                  name: 'in3',
                  active: false
                }
              ],
              outputs: []
            },
            {
              id: 3,
              x: -191,
              y: -152,
              title: 'test 3',
              values: {},
              inputs: [
                {
                  name: 'in1',
                  active: true
                }
              ],
              outputs: [
                {
                  name: 'out1',
                  active: true
                },
                {
                  name: 'out2',
                  active: false
                }
              ]
            },
            {
              id: 4,
              x: 441,
              y: -152,
              title: 'test 4',
              values: {},
              inputs: [
                {
                  name: 'in1',
                  active: false
                },
                {
                  name: 'in2',
                  active: false
                },
                {
                  name: 'in3',
                  active: false
                }
              ],
              outputs: [
                {
                  name: 'out1',
                  active: false
                },
                {
                  name: 'out2',
                  active: false
                },
                {
                  name: 'out3',
                  active: false
                }
              ]
            },
            {
              id: 7,
              x: 40,
              y: 325,
              title: 'Hub',
              values: {},
              inputs: [
                {
                  name: 'input',
                  active: true
                }
              ],
              outputs: [
                {
                  name: 'output',
                  active: true
                },
                {
                  name: 'output',
                  active: true
                },
                {
                  name: 'output',
                  active: false
                }
              ]
            },
            {
              id: 8,
              x: -195,
              y: 133,
              title: 'Event 1',
              values: {},
              inputs: [],
              outputs: [
                {
                  name: 'event',
                  active: true
                }
              ]
            },
            {
              id: 9,
              x: -222,
              y: 324,
              title: 'Event 2',
              values: {},
              inputs: [],
              outputs: [
                {
                  name: 'event',
                  active: true
                }
              ]
            },
            {
              id: 10,
              x: 187,
              y: 104,
              title: 'Animation 1',
              values: {},
              inputs: [
                {
                  name: 'play',
                  active: true
                }
              ],
              outputs: [
                {
                  name: 'end',
                  active: false
                }
              ]
            },
            {
              id: 11,
              x: 185,
              y: 179,
              title: 'Animation 2',
              values: {},
              inputs: [
                {
                  name: 'play',
                  active: true
                }
              ],
              outputs: [
                {
                  name: 'end',
                  active: false
                }
              ]
            },
            {
              id: 12,
              x: 350,
              y: 295,
              title: 'Animation 1',
              values: {},
              inputs: [
                {
                  name: 'play',
                  active: true
                }
              ],
              outputs: [
                {
                  name: 'end',
                  active: false
                }
              ]
            },
            {
              id: 13,
              x: 351,
              y: 361,
              title: 'Animation 2',
              values: {},
              inputs: [
                {
                  name: 'play',
                  active: true
                }
              ],
              outputs: [
                {
                  name: 'end',
                  active: false
                }
              ]
            }
          ],
          links: [
            {
              id: 1,
              originID: 1,
              originSlot: 0,
              targetID: 2,
              targetSlot: 0
            },
            {
              id: 2,
              originID: 1,
              originSlot: 0,
              targetID: 3,
              targetSlot: 0
            },
            {
              id: 3,
              originID: 3,
              originSlot: 0,
              targetID: 2,
              targetSlot: 1
            },
            {
              id: 4,
              originID: 7,
              originSlot: 0,
              targetID: 12,
              targetSlot: 0
            },
            {
              id: 5,
              originID: 7,
              originSlot: 1,
              targetID: 13,
              targetSlot: 0
            },
            {
              id: 6,
              originID: 8,
              originSlot: 0,
              targetID: 10,
              targetSlot: 0
            },
            {
              id: 7,
              originID: 8,
              originSlot: 0,
              targetID: 11,
              targetSlot: 0
            },
            {
              id: 8,
              originID: 9,
              originSlot: 0,
              targetID: 7,
              targetSlot: 0
            }
          ],
          container: {
            centerX: 771.6966211381854,
            centerY: 206.54603325466186,
            scale: 1
          }
        } */
        selectedBlock: null,
        selectedType: 'delay'
      }
    },
    computed: {
      selectedBlockProperty () {
        if (!this.selectedBlock || !this.selectedBlock.values || !this.selectedBlock.values.property) {
          return null
        }

        return this.selectedBlock.values.property
      },
      selectBlocksType () {
        return this.blocks.map(b => {
          return b.family
        }).filter((value, index, array) => {
          return array.indexOf(value) === index
        })
      }
    },
    methods: {
      selectBlock (block) {
        console.log('select', block)
        this.selectedBlock = block
      },
      deselectBlock (block) {
        console.log('deselect', block)
      },
      filteredBlocks (type) {
        return this.blocks.filter(value => {
          return value.family === type
        })
      },
      addBlock () {
        console.log(this.selectedType)
        this.$refs.container.addNewBlock(this.selectedType)
      },
      saveProperty (val) {
        console.log(val)

        let scene = this.scene
        let block = scene.blocks.find(b => {
          return b.id === this.selectedBlock.id
        })
        block.values.property = val

        this.scene = merge({}, scene)
      }
    },
    watch: {
      blocks (newValue, oldValue) {
        console.log('blocks', JSON.stringify(newValue))
      },
      scene (newValue, oldValue) {
        console.log('scene', JSON.stringify(newValue))
      }
    }
  }
</script>

<style lang="less">
  html, body {
    margin: 0;
    padding: 0;
  }

  html {
    width: 100vw;
    height: 100vh;
  }

  body {
    width: 100%;
    height: 100%;
  }

  #app {
    width: ~"calc(100% - 40px)";
    height: ~"calc(100% - 40px)";
    padding: 20px 0 0 20px;
  }

  .container {
    width: 100%;
    height: ~"calc(100% - 50px)";
    border: 1px solid black;
  }
</style>
