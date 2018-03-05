# hyperapp-customelements

`hyperapp-customelements` is a tiny (3KB) Web Components [Custom Elements library](#custom-elements) based on `hyperapp`.


## Custom Elements

Define Custom Elements that:

- work in all evergreen browsers and IE10.
- are based on [hyperapp](https://github.com/hyperapp/hyperapp) so you get
  - a beautifully simple API
  - a functional paradigm
  - immutable state data
  - Virtual DOM updates
- provide a solid migration path to Custom Elements V1

```js
const hyperviews = require('hyperviews/element')

const MyElement = hyperviews({
  name: 'my-element',
  state: {
    counter: 0
  },
  actions: {
    down: () => state => ({ counter: state.counter - 1 }),
    up: () => state => ({ counter: state.counter + 1 })
  }, 
  view: require('./view'), // `view` can be any `h()` returning function including JSX or a transformed hyperviews template
  constructor () {},
  attributeChangedCallback (name, oldValue, newValue) {},
  connectedCallback () {},
  disconnectedCallback () {},
  observedAttributes: [], // List of observed attribute names. Optional.
  //...any other properties/methods are added to the prototype
})
```

```html
<my-element></my-element>
```

You may notice that the API looks like Custom Elements V1, however the decision was taken to 
initially [target Custom Elements V0](https://github.com/WebReflection/ce-v0) but with a V1 flavour so, when V1 is widely supported, the upgrade will be simple. See [this article](https://medium.com/@WebReflection/a-custom-elements-v0-grampafill-dc1319420e9b) for more information. Huge thanks to [Andrea Giammarchi](https://github.com/WebReflection) for all his work in this area.

