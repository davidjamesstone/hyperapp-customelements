var app = require('hyperapp').app
var CEV0Component = require('ce-v0/comp')

function hyperviews (options) {
  var view = options.view
  var state = options.state
  var actions = options.actions
  var ctor = options.constructor

  var opts = {
    constructor: (typeof ctor === 'function')
      ? function () { this.actions = app(state, actions, view, this); ctor.call(this) }
      : function () { this.actions = app(state, actions, view, this) }
  }

  // Only fire attributeChangedCallback
  // if it's an observed attribute as per CEV1
  var onattribute
  var attributeChangedCallback = options.attributeChangedCallback

  if (attributeChangedCallback) {
    if (Array.isArray(options.observedAttributes)) {
      var observedAttributes = options.observedAttributes

      onattribute = function (name, oldValue, newValue) {
        if (observedAttributes && observedAttributes.indexOf(name) < 0) {
          return
        }

        attributeChangedCallback.call(this, name, oldValue, newValue)
      }
    }
  }

  for (var key in options) {
    switch (key) {
      case 'attributeChangedCallback':
        opts.onattribute = onattribute
        break
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
        break
      default:
        opts[key] = options[key]
        break
    }
  }

  return new CEV0Component(opts)
}

module.exports = hyperviews
