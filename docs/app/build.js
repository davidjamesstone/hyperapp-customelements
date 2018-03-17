(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
module.exports = {
  name: 'x-counter',
  state: {
    counter: 0
  },
  actions: {
    down: () => state => ({ counter: state.counter - 1 }),
    up: () => state => ({ counter: state.counter + 1 })
  },
  view: require('./view.html'),
  observedAttributes: [{ max: Number }]
}

},{"./view.html":2}],2:[function(require,module,exports){
module.exports = function view (state, actions) {
  return h('div', { class: 'field has-addons' }, [
    h('p', { class: 'control' }, h('button', { class: 'button', onclick: function (e) { actions.down() }, disabled: (!state.counter) }, '-')),
    h('p', { class: 'control' }, h('input', { class: 'input', type: 'text', value: (state.counter), readonly: 'readonly' })),
    h('p', { class: 'control' }, h('button', { class: 'button', onclick: function (e) { actions.up() }, disabled: (state.max && state.counter >= state.max) }, '+'))
  ])
}

},{}],3:[function(require,module,exports){
module.exports = {
  name: 'x-footer',
  view: require('./view.html')
}

},{"./view.html":4}],4:[function(require,module,exports){
module.exports = function view (state, actions) {
  return h('footer', { class: 'footer' }, h('div', { class: 'container' }, h('div', { class: 'content has-text-centered' }, h('p', {}, [
    h('a', { href: 'http://opensource.org/licenses/mit-license.php' }, 'MIT'),
    '.'
  ]))))
}

},{}],5:[function(require,module,exports){
module.exports = {
  name: 'x-header',
  state: {
    showMenu: false
  },
  actions: {
    toggleMenu: () => (state) => ({ showMenu: !state.showMenu })
  },
  view: require('./view.html')
}

},{"./view.html":6}],6:[function(require,module,exports){
module.exports = function view (state, actions) {
  return h('nav', { class: 'navbar is-transparent' }, [
    h('div', { class: 'navbar-brand' }, [
      h('a', { class: 'navbar-item', href: '#' }, 'HYPERAPP-CUSTOMELEMENTS'),
      h('div', { class: 'navbar-burger burger', onclick: function (e) { actions.toggleMenu() } }, [
        h('span', {}),
        h('span', {}),
        h('span', {})
      ])
    ]),
    h('div', { class: 'navbar-menu', style: { display: state.showMenu ? 'block' : 'none' } }, [
      h('div', { class: 'navbar-start' }, [
        h('a', { class: 'navbar-item', href: '#' }, 'Home'),
        h('div', { class: 'navbar-item has-dropdown is-hoverable' }, [
          h('a', { class: 'navbar-link', href: '#' }, 'Docs'),
          h('div', { class: 'navbar-dropdown is-boxed' }, [
            h('a', { class: 'navbar-item', href: '#' }, 'Overview'),
            h('a', { class: 'navbar-item', href: '#' }, 'Modifiers'),
            h('a', { class: 'navbar-item', href: '#' }, 'Columns'),
            h('a', { class: 'navbar-item', href: '#' }, 'Layout'),
            h('a', { class: 'navbar-item', href: '#' }, 'Form'),
            h('hr', { class: 'navbar-divider' }),
            h('a', { class: 'navbar-item', href: '#' }, 'Elements'),
            h('a', { class: 'navbar-item is-active', href: '#' }, 'Components')
          ])
        ])
      ]),
      h('div', { class: 'navbar-end' }, h('div', { class: 'navbar-item' }, h('div', { class: 'field is-grouped' }, [
        h('p', { class: 'control' }, h('a', { class: 'bd-tw-button button', href: '#' }, [
          h('span', { class: 'icon' }, h('i', { class: 'fab fa-twitter' })),
          h('span', {}, 'Tweet')
        ])),
        h('p', { class: 'control' }, h('a', { class: 'button is-primary', href: '#' }, [
          h('span', { class: 'icon' }, h('i', { class: 'fas fa-download' })),
          h('span', {}, 'Download')
        ]))
      ])))
    ])
  ])
}

},{}],7:[function(require,module,exports){
module.exports = {
  name: 'x-main',
  state: {
    counterMax: 10
  },
  actions: {
    setCounterMax: (value) => (state) => ({ counterMax: value })
  },
  view: require('./view.html')
}

},{"./view.html":8}],8:[function(require,module,exports){
module.exports = function view (state, actions) {
  return h('div', { class: 'section' }, [
    h('div', { class: 'columns' }, [
      h('div', { class: 'column is-one-fifth' }, [
        'Counter max:',
        h('input', { type: 'number', value: (state.counterMax), class: 'input', onchange: function (e) { actions.setCounterMax(+this.value) } })
      ]),
      h('div', { class: 'column is-two-fifths' }, [
        'Counter:',
        h('x-counter', { max: (state.counterMax) })
      ])
    ]),
    h('x-profile', { id: '' }),
    h('x-profile', { id: '' }),
    h('x-profile', { id: '' })
  ])
}

},{}],9:[function(require,module,exports){
module.exports = {
  name: 'x-profile-image',
  view: require('./view.html'),
  state: {
    getUrl: function () {
      if (!this.url) {
        return
      }

      if (this.size === 'medium') {
        return this.url.replace('https://randomuser.me/api/portraits/',
          'https://randomuser.me/api/portraits/med/')
      } else if (this.size === 'thumbnail') {
        return this.url.replace('https://randomuser.me/api/portraits/',
          'https://randomuser.me/api/portraits/thumb/')
      } else {
        return this.url
      }
    }
  },
  observedAttributes: ['url', 'size']
}

},{"./view.html":10}],10:[function(require,module,exports){
module.exports = function view (state, actions) {
  return state.url ? h('img', { src: (state.getUrl()) }) : undefined
}

},{}],11:[function(require,module,exports){
module.exports = {
  name: 'x-profile-nationality',
  view: require('./view.html'),
  observedAttributes: ['code']
}

},{"./view.html":12}],12:[function(require,module,exports){
module.exports = function view (state, actions) {
  return h('span', {}, state.code ? h('span', { class: 'flag flag-' + (state.code.toLowerCase()), alt: (state.code) }) : undefined)
}

},{}],13:[function(require,module,exports){
module.exports = {
  name: 'x-profile',
  view: require('./view.html'),
  mapAttrsToState: false,
  actions: {
    setUser: (user) => state => Object.assign({}, state, { user })
  },
  observedAttributes: ['id'],
  loadProfile: function (id) {
    var url = 'https://randomuser.me/api/?noinfo' + (id ? '&seed=' + id : '')
    var actions = this.actions

    window.fetch(url, {
      method: 'get'
    }).then(function (response) {
      return response.json()
    }).then(function (response) {
      var user = response.results[0]
      console.log(user)
      actions.setUser(user)
    }).catch(function (err) {
      console.error(err)
    })
  },
  attributeChangedCallback: function (name, oldValue, newValue) {
    this.loadProfile(newValue)
  },
  constructor () {
    if (this.hasAttribute('id')) {
      this.loadProfile(this.getAttribute('id'))
    }
  }
}

},{"./view.html":14}],14:[function(require,module,exports){
module.exports = function view (state, actions) {
  return h('div', {}, state.user ? h('div', { key: (state.user.id.value), class: 'card' }, h('div', { class: 'card-content' }, [
    h('div', { class: 'media' }, [
      h('div', { class: 'media-left' }, h('figure', { class: 'image is-48x48' }, h('x-profile-image', { size: 'thumbnail', url: (state.user.picture.large) }))),
      h('div', { class: 'media-content' }, [
        h('p', { class: 'title is-4' }, (state.user.name.title) + '\
            ' + (state.user.name.first) + '\
            ' + (state.user.name.last)),
        h('p', { class: 'subtitle is-6' }, [
          h('x-profile-nationality', { code: (state.user.nat) }),
          (state.user.id.name)
        ])
      ])
    ]),
    h('div', { class: 'content' }, [
      h('div', {}, [
        h('span', { class: 'icon has-text-success' }, h('i', { class: 'fa fa-phone' })),
        h('a', { href: 'tel:' + (state.user.phone) }, (state.user.phone))
      ]),
      h('div', {}, [
        h('span', { class: 'icon has-text-info' }, h('i', { class: 'fa fa-birthday-cake' })),
        h('time', { datetime: (state.user.registered) }, (new Date(state.user.dob).toDateString()))
      ]),
      h('div', {}, [
        h('span', { class: 'icon has-text-warning' }, h('i', { class: 'fa fa-envelope' })),
        h('a', { href: 'mailto:' + (state.user.email) }, (state.user.email))
      ])
    ])
  ])) : undefined)
}

},{}],15:[function(require,module,exports){
window.h = require('hyperapp').h

var define = require('../..')

define(require('./custom-elements/main'))
define(require('./custom-elements/header'))
define(require('./custom-elements/footer'))
define(require('./custom-elements/profile'))
define(require('./custom-elements/profile-image'))
var Nationality = define(require('./custom-elements/profile-nationality'))
var Counter = define(require('./custom-elements/counter'))

// Demo programmatically added elements
const myCounter = new Counter()
const myNationality = new Nationality()
myNationality.setAttribute('code', 'gb')

setTimeout(function () {
  document.body.appendChild(myCounter)
  document.body.appendChild(myNationality)
}, 5000)

},{"../..":16,"./custom-elements/counter":1,"./custom-elements/footer":3,"./custom-elements/header":5,"./custom-elements/main":7,"./custom-elements/profile":13,"./custom-elements/profile-image":9,"./custom-elements/profile-nationality":11,"hyperapp":18}],16:[function(require,module,exports){
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

},{"ce-v0/comp":17,"hyperapp":18}],17:[function(require,module,exports){
function Component(e){"use strict";/*! (C) 2017 Andrea Giammarchi - Mit Style License */
var t,a,r=function(e,t,a,r){var c=Object.getOwnPropertyDescriptor(e,t);c&&(c.enumerable=!1,a[r]=c)},c={},n={},o=e.extends||HTMLElement;for(t in e)switch(t){case"extends":case"name":break;case"static":a=e[t];for(t in a)r(a,t,c,t);break;case"constructor":r(e,t,n,"createdCallback");break;case"onattribute":r(e,t,n,"attributeChangedCallback");break;case"onconnected":r(e,t,n,"attachedCallback");break;case"ondisconnected":r(e,t,n,"detachedCallback");break;default:r(e,t,n,t)}return(Object.setPrototypeOf||function(e,a){if(e.__proto__=a,!(e instanceof a)){delete e.__proto__;for(t in a)try{r(a,t,e,t)}catch(e){}}return e})(Object.defineProperties(document.registerElement(e.name,{prototype:Object.create(o.prototype,n)}),c),o)}try{module.exports=Component}catch(e){}
},{}],18:[function(require,module,exports){
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd||n(e.hyperapp={})}(this,function(e){"use strict";e.h=function(e,n){for(var t,r=[],o=[],i=arguments.length;i-- >2;)r.push(arguments[i]);for(;r.length;)if((t=r.pop())&&t.pop)for(i=t.length;i--;)r.push(t[i]);else null!=t&&!0!==t&&!1!==t&&o.push(t);return"function"==typeof e?e(n||{},o):{nodeName:e,attributes:n||{},children:o,key:n&&n.key}},e.app=function(e,n,t,r){var o,i=[],u=r&&r.children[0]||null,l=u&&function e(n,t){return{nodeName:n.nodeName.toLowerCase(),attributes:{},children:t.call(n.childNodes,function(n){return 3===n.nodeType?n.nodeValue:e(n,t)})}}(u,[].map),f=s(e),a=s(n);return d(function e(n,t,r){for(var o in r)"function"==typeof r[o]?function(e,o){r[e]=function(e){return"function"==typeof(e=o(e))&&(e=e(p(n,f),r)),e&&e!==(t=p(n,f))&&!e.then&&d(f=h(n,s(t,e),f)),e}}(o,r[o]):e(n.concat(o),t[o]=t[o]||{},r[o]=s(r[o]))}([],f,a)),a;function c(){o=!o;var e=t(f,a);for(r&&!o&&(u=function e(n,t,r,o,u,l){if(o===r);else if(null==r)t=n.insertBefore(y(o,u),t);else if(o.nodeName&&o.nodeName===r.nodeName){!function(e,n,t,r){for(var o in s(n,t))t[o]!==("value"===o||"checked"===o?e[o]:n[o])&&m(e,o,t[o],r,n[o]);t.onupdate&&i.push(function(){t.onupdate(e,n)})}(t,r.attributes,o.attributes,u=u||"svg"===o.nodeName);for(var f=[],a={},c={},d=0;d<r.children.length;d++){f[d]=t.childNodes[d];var h=r.children[d],p=v(h);null!=p&&(a[p]=[f[d],h])}for(var d=0,b=0;b<o.children.length;){var h=r.children[d],g=o.children[b],p=v(h),k=v(g);if(c[p])d++;else if(null==k)null==p&&(e(t,f[d],h,g,u),b++),d++;else{var w=a[k]||[];p===k?(e(t,w[0],w[1],g,u),d++):w[0]?e(t,t.insertBefore(w[0],f[d]),w[1],g,u):e(t,f[d],null,g,u),b++,c[k]=g}}for(;d<r.children.length;){var h=r.children[d];null==v(h)&&N(t,f[d],h),d++}for(var d in a)c[a[d][1].key]||N(t,a[d][0],a[d][1])}else o.nodeName===r.nodeName?t.nodeValue=o:(t=n.insertBefore(y(o,u),l=t),N(n,l,r));return t}(r,u,l,l=e));e=i.pop();)e()}function d(){o||(o=!o,setTimeout(c))}function s(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function h(e,n,t){var r={};return e.length?(r[e[0]]=e.length>1?h(e.slice(1),n,t[e[0]]):n,s(t,r)):n}function p(e,n){for(var t=0;t<e.length;t++)n=n[e[t]];return n}function v(e){return e?e.key:null}function m(e,n,t,r,o){if("key"===n);else if("style"===n)for(var i in s(o,t))e[n][i]=null==t||null==t[i]?"":t[i];else"function"==typeof t||n in e&&!r?e[n]=null==t?"":t:null!=t&&!1!==t&&e.setAttribute(n,t),null!=t&&!1!==t||e.removeAttribute(n)}function y(e,n){var t="string"==typeof e||"number"==typeof e?document.createTextNode(e):(n=n||"svg"===e.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",e.nodeName):document.createElement(e.nodeName);if(e.attributes){e.attributes.oncreate&&i.push(function(){e.attributes.oncreate(t)});for(var r=0;r<e.children.length;r++)t.appendChild(y(e.children[r],n));for(var o in e.attributes)m(t,o,e.attributes[o],n)}return t}function N(e,n,t,r){function o(){e.removeChild(function e(n,t,r){if(r=t.attributes){for(var o=0;o<t.children.length;o++)e(n.childNodes[o],t.children[o]);r.ondestroy&&r.ondestroy(n)}return n}(n,t))}t.attributes&&(r=t.attributes.onremove)?r(n,o):o()}}});

},{}]},{},[15])
//# sourceMappingURL=build.js.map
