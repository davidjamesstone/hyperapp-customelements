module.exports = {
  name: 'x-profile-nationality',
  view: require('./view.html'),
  state: {
    code: ''
  },
  actions: {
    setCode: code => state => { return { code } },
  },
  observedAttributes: ['code'],
  attributeChangedCallback: function (name, oldValue, newValue) {
    this.actions.setCode(newValue)
  },
  constructor () {
    if (this.hasAttribute('code')) {
      this.actions.setCode(this.getAttribute('code'))
    }
  }
}
