module.exports = {
  name: 'x-profile',
  view: require('./view.html'),
  actions: {
    setUser: (user) => state => Object.assign({}, state, { user })
  },
  observedAttributes: ['id'],
  loadProfile: function (id) {
    var url = 'https://randomuser.me/api/?noinfo' + (id ? '&seed=' + id : '')
    var actions = this.actions

    fetch(url, {
      method: 'get'
    }).then(function (response) {
      return response.json()
    }).then(function (response) {
      var user = response.results[0]
      console.log(user)
      actions.setUser(user)
    }).catch(function (err) {
      console.error(response)
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
