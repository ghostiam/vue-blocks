<template>
  <div id="app">
    <VueBlocksContainer :blocks="blocks" :scene.sync="scene" class="container"/>

  </div>
</template>

<script>
  import VueBlocksContainer from './components/VueBlocksContainer'

  export default {
    name: 'App',
    components: {
      VueBlocksContainer
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
                name: 'Animation',
                type: 'animation',
                attrs: 'property',
                hide: false
              },
              {
                name: 'Play',
                type: 'event',
                attrs: 'input',
                hide: false
              },
              {
                name: 'Stop',
                type: 'event',
                attrs: 'input',
                hide: true
              },
              {
                name: 'onEnd',
                type: 'event',
                attrs: 'output',
                hide: false
              }
            ]
          },
          {
            name: 'Chat message',
            family: 'Events',
            description: '',
            fields: [
              {
                name: 'Message',
                type: 'string',
                attrs: 'property'
              },
              {
                name: 'onMessage',
                type: 'event',
                attrs: 'output'
              }
            ]
          },
          {
            name: 'Delay',
            family: 'Time',
            description: '',
            fields: [
              {
                name: 'Delay(s)',
                type: 'number',
                attrs: 'property',
                defaultValue: 1.0
              },
              {
                name: 'input',
                type: 'event',
                attrs: 'input'
              },
              {
                name: 'output',
                type: 'event',
                attrs: 'output'
              }
            ]
          }
        ],
        scene: {}
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
