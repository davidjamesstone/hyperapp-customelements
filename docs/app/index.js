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
// const myCounter = new Counter()
// const myNationality = new Nationality()
// myNationality.setAttribute('code', 'gb')

// setTimeout(function () {
//   document.body.appendChild(myCounter)
//   document.body.appendChild(myNationality)
// }, 5000)
