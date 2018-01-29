<template>
  <div id="app">
    <VueBlocksContainer :blocksContent="blocks" :scene.sync="scene" @blockSelect="selectBlock"
                        @blockDeselect="deselectBlock" class="container"/>
    <VueBlockProperty :property="selectedBlockProperty" @save="saveProperty"/>
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
            name: 'Animation',
            family: 'Animations',
            description: 'Control your animation',
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
            name: 'Delay',
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
          }
        ],
        scene: {
          blocks: [
            {
              id: 1,
              x: 315,
              y: 14,
              name: 'Animation',
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
              id: 2,
              x: -742,
              y: 35,
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
              id: 3,
              x: -109,
              y: 94,
              name: 'Delay',
              title: 'Delay',
              values: {
                property: {
                  delay: {
                    label: 'Delay (s)',
                    type: 'number',
                    value: 9999
                  }
                }
              }
            },
            {
              id: 4,
              x: -284,
              y: -59,
              name: 'Animation',
              title: 'Animation',
              values: {
                property: {
                  animation: {
                    label: 'Animation',
                    type: 'animation',
                    value: 1234
                  },
                  test: {
                    label: 'test',
                    type: 'string'
                  }
                }
              }
            }
          ],
          links: [
            {
              id: 1,
              originID: 2,
              originSlot: 0,
              targetID: 3,
              targetSlot: 0
            },
            {
              id: 2,
              originID: 3,
              originSlot: 0,
              targetID: 1,
              targetSlot: 1
            },
            {
              id: 3,
              originID: 2,
              originSlot: 0,
              targetID: 4,
              targetSlot: 0
            },
            {
              id: 4,
              originID: 4,
              originSlot: 0,
              targetID: 1,
              targetSlot: 0
            }
          ],
          container: {
            centerX: 995,
            centerY: 135,
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
        selectedBlock: null
      }
    },
    computed: {
      selectedBlockProperty () {
        if (!this.selectedBlock || !this.selectedBlock.values || !this.selectedBlock.values.property) {
          return null
        }

        return this.selectedBlock.values.property
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

<style>
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
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    padding: 20px 0 0 20px;
  }

  .container {
    width: 100%;
    height: 100%;
    border: 1px solid black;
  }
</style>
