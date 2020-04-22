## Vue-Blocks

### Demo

[Demo](https://ghostiam.github.io/vue-blocks/index.html)

### Basic usage

``` html
<template>
  <div id="app">
    <VueBlocksContainer
      ref="container"
      :blocksContent="blocks"
      :scene.sync="scene"
      class="container"/>
  </div>
</template>

<script>
  import VueBlocksContainer from '...path.../vue-blocks/src'

  export default {
    name: 'App',
    components: {
      VueBlocksContainer
    },
    data: function () {
      return {
        blocks: [
          {
            name: 'test',
            title: 'Test block',
            family: 'Test',
            description: 'Description text',
            fields: [
              {
                name: 'in1',
                type: 'event',
                attr: 'input'
              },
              {
                name: 'in2',
                type: 'event',
                attr: 'input'
              },
              {
                name: 'out1',
                type: 'event',
                attr: 'output'
              },
              {
                name: 'out2',
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
              x: 0,
              y: 0,
              name: 'test',
              title: 'Test block',
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
              id: 2,
              x: 0,
              y: 50,
              name: 'test',
              title: 'Test block 2',
              values: {
                property: [
                  {
                    name: 'message',
                    type: 'string'
                  }
                ]
              }
            }
          ],
          links: [],
          container: {
            centerX: 0,
            centerY: 0,
            scale: 1
          },
          defaults: { // optional
            styleBlock: {
              backgroundColor: "orange"
            },
            styleHeader: {
              backgroundColor: "aliceblue",
              fontSize: '14px',
              fontFamily: 'Arial, Verdana'
            },
            styleDelete: {
              color: "black"
            },
            deleteMark: '',
            styleInputs: {
              fontWeight: 'bolder'
            },
            styleOutputs: {
              fontWeight: 'lighter'
            },
            styleLink: {
              stroke: '#F00',
              strokeWidth: 4,
              fill: 'none',
              strokeDasharray: '10, 5'
            },
            styleOutline: {
              stroke: '#0F0',
              strokeWidth: 6,
              strokeOpacity: 0.6,
              fill: 'none'
            },
            styleTempLink: {
              stroke: '#0000ff',
              strokeWidth: 4,
              fill: 'none'
            }
          }
        }
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

  body,
  #app,
  .container {
    width: 100%;
    height: 100%;
  }
</style>
```

### Props

#### blocksContent

Type: `Array.<Node>`<br>
Required: `true`<br>
Default: `[]`

Object `Node`:
```
{
  name: 'name-node',
  title: 'Title node',
  family: 'family - just for grouping',
  description: 'Description text',
  fields: Array.<NodeField>
}
```

Object `NodeField`: 
```
{
  name: 'name',
  type: 'type-name', // not used
  attr: 'attribute' // input/output or custom
  'other': - for custom
}
```

Custom attributes are available in `scene.blocks[index].values.YourAttrName`

#### scene

Type: `Object`<br>
Required: `false`<br>
Default: 
```
{
  blocks: [],
  links: [],
  container: {},
  defaults: {}
}
```

Object `Scene`:
```
{
  blocks: Array.<Block>,
  links: Array.<BlockLinks>,
  container: {
   centerX: number
   centerY: number
   scale: number
  },
  defaults: Object.<Defaults>
}
```

Object `Block`:
```
{
  id: number,
  x: number,
  y: number,
  name: string,
  title: string,
  values: {
    customAttribute: [ // show "NodeField"
      name: NodeField (without name and attr fields)
    ]
  },
  styleBlock: { // OPTIONAL block styles
  },
  styleHeader: { OPTIONAL header styles
  },
  styleDelete: { OPTIONAL delete button styles
  },
  deleteMark: 'del', OPTIONAL delete button content - default: unicode character "✖"
  styleInputs: { OPTIONAL inputs styles
  },
  styleOutputs: { OPTIONAL outputs styles
  }
}
```

Object `BlockLinks`:
```
{
  id: number, // ID
  originID: number, // Origin block ID
  originSlot: number, // Origin block slot number
  targetID: number, // Target block ID
  targetSlot: number, // Target block slot number
  styleLink: { // OPTIONAL svg path styles
    stroke: string, // default: '#F00'
    strokeWidth: number, // default: 4 - multiplied by current scale
    fill: string // default: 'none'
  },
  styleOutline: { // OPTIONAL svg path outline styles
    stroke: string, // default: '#0F0'
    strokeWidth: number, // default: 6 - multiplied by current scale
    strokeOpacity: number, // default: 0.6
    fill: string // default: 'none'
  }
}
```

Object `Defaults`:

Optional default styles for all objects:
```
{
    styleBlock: {
      backgroundColor: "orange"
    },
    styleHeader: {
      backgroundColor: "aliceblue",
      fontSize: '14px',
      fontFamily: 'Arial, Verdana'
    },
    styleDelete: {
      color: "black"
    },
    deleteMark: '',
    styleInputs: {
      fontWeight: 'bolder'
    },
    styleOutputs: {
      fontWeight: 'lighter'
    },
    styleLink: {
      stroke: '#F00',
      strokeWidth: 4, // multiplied by current scale
      fill: 'none',
      strokeDasharray: '10, 5'
    },
    styleOutline: {
      stroke: '#0F0',
      strokeWidth: 6, // multiplied by current scale
      strokeOpacity: 0.6,
      fill: 'none'
    },
    styleTempLink: {
      stroke: '#0000ff',
      strokeWidth: 4, // multiplied by current scale
      fill: 'none'
    }
}
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

# build for github pages
npm run build:docs

```

## License

[MIT license](LICENSE)
