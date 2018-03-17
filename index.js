var app = require('hyperapp').app
var CEV0Component = require('ce-v0/comp')

function hyperappCustomElement (options) {
  var view = options.view
  var state = options.state
  var ctor = options.constructor
  var mapAttrsToState = 'mapAttrsToState' in options
    ? !!options.mapAttrsToState
    : true

  var observedAttributes = options.observedAttributes
  var hasObservedAttributes = Array.isArray(observedAttributes)
  var actions = Object.assign(mapAttrsToState ? {
    __applyState: (item) => (state) => {
      return item
    }
  } : {}, options.actions)

  function mapToState (el) {
    if (hasObservedAttributes) {
      observedAttributes.forEach(function (name) {
        if (el.hasAttribute(name)) {
          var item = {}
          item[name] = el.getAttribute(name)
          el.actions.__applyState(item)
        }
      })
    }
  }

  var opts = {}
  if (typeof ctor === 'function') {
    opts.constructor = function () {
      this.actions = app(state, actions, view, this)

      ctor.call(this)

      if (mapAttrsToState) {
        mapToState(this)
      }
    }
  } else {
    opts.constructor = function () {
      this.actions = app(state, actions, view, this)

      if (mapAttrsToState) {
        mapToState(this)
      }
    }
  }

  // Only fire attributeChangedCallback
  // if it's an observed attribute as per CEV1
  var onattribute
  var attributeChangedCallback = options.attributeChangedCallback

  if (hasObservedAttributes) {
    onattribute = function (name, oldValue, newValue) {
      if (observedAttributes.indexOf(name) < 0) {
        return
      }

      if (attributeChangedCallback) {
        attributeChangedCallback.call(this, name, oldValue, newValue)
      }

      if (mapAttrsToState) {
        var partial = {}
        partial[name] = newValue
        this.actions.__applyState(partial)
      }
    }

    opts.onattribute = onattribute
  }

  for (var key in options) {
    switch (key) {
      case 'connectedCallback':
        opts.onconnected = options[key]
        break
      case 'disconnectedCallback':
        opts.ondisconnected = options[key]
        break
      case 'view':
      case 'state':
      case 'actions':
      case 'constructor':
      case 'attributeChangedCallback':
        break
      default:
        opts[key] = options[key]
        break
    }
  }

  return new CEV0Component(opts)
}

module.exports = hyperappCustomElement
