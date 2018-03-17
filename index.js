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

  var opts = {}
  var converters = {}
  if (hasObservedAttributes) {
    opts.observedAttributes = []
    observedAttributes.forEach(function (attr) {
      if (typeof attr === 'string') {
        opts.observedAttributes.push(attr)
      } else {
        var name = Object.keys(attr)[0]
        opts.observedAttributes.push(name)
        if (typeof attr[name] === 'function') {
          converters[name] = attr[name]
        }
      }
    })
  }

  function convert (name, value) {
    var converter = converters[name]

    if (converter) {
      if (converter === Boolean) {
        return value !== 'false' && value !== '0'
      }

      return converters[name](value)
    }

    return value
  }

  function mapToState (el) {
    if (hasObservedAttributes) {
      opts.observedAttributes.forEach(function (name) {
        if (el.hasAttribute(name)) {
          var item = {}
          item[name] = convert(name, el.getAttribute(name))
          el.actions.__applyState(item)
        }
      })
    }
  }

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
        partial[name] = convert(name, newValue)
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
      case 'observedAttributes':
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
