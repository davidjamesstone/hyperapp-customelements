# hyperapp-customelements

`hyperapp-customelements` is a tiny (3KB) Web Components [Custom Elements library](#custom-elements) based on `hyperapp`.

Define Custom Elements that:

- work in all evergreen browsers and IE10.
- are based on [hyperapp](https://github.com/hyperapp/hyperapp) so you get
  - a beautifully simple API
  - a functional paradigm
  - immutable state data
  - Virtual DOM updates
- provide a solid migration path to Custom Elements V1

See it in action [here](https://davidjamesstone.github.io/hyperapp-customelements/)

```js
const define = require('hyperapp-customelements')

const MyElement = define({
  // Required
  name: 'my-element',
  view () {
    // Any `h()` returning function including JSX or a transformed `hyperviews` template
  },

  // Optional
  state: {
    // Initial hyperapp state
  },
  actions: {
    // Hyperapp actions
  },
  constructor () {
    // Wired actions are now available as `this.actions`
  },
  observedAttributes: Array, // Array of attribute names to observe
  attributeChangedCallback (name, oldValue, newValue) {
    // Invoked when an observed attribute changes.
    // Attribute changes are reflected to state by default.
    // It's therefore not always necessary to provide this function.
    // Set `mapAttrsToState` to `false` to update state manually.
  },
  connectedCallback () {
    // Invoked when the element is inserted into the document
  },
  disconnectedCallback () {
    // Invoked when the element is removed from the document
  },
  //...any other properties/methods are added to the element prototype
})
```

Then use declaratively

```html
<my-element></my-element>
```

or programmatically

```js
const myElement = new MyElement()
document.body.appendChild(myElement)
```

## Example

```js
const define = require('hyperapp-customelements')

define({
  name: 'x-counter',
  state: {
    counter: 0
  },
  actions: {
    down: value => state => ({ count: state.count - value }),
    up: value => state => ({ count: state.count + value })
  },
  view: (state, actions) => (
    <div>
      <h1>{state.count}x</h1>
      <button onclick={() => actions.down(1)} disabled={state.count <= 0}>ー</button>
      <button onclick={() => actions.up(1)} disabled={state.count >= state.max}>＋</button>
    </div>
  ),
  observedAttributes: ['max']
})
```

```html
<x-counter max="10"></x-counter>
```
# Notes

You may notice that the API looks like Custom Elements V1, however the decision was taken to 
initially [target Custom Elements V0](https://github.com/WebReflection/ce-v0) but with a V1 flavour so, when V1 is widely supported, the upgrade will be simple. See [this article](https://medium.com/@WebReflection/a-custom-elements-v0-grampafill-dc1319420e9b) for more information. Huge thanks to [Andrea Giammarchi](https://github.com/WebReflection) for all his work in this area.

