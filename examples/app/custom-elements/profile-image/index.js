module.exports = {
  name: 'x-profile-image',
  view: require('./view.html'),
  state: {
    url: '',
    size: 'medium',
    getUrl: () => {
      if (!this.url) {
        return
      }

      if (this.size === 'large') {
        return this.url
      } else if (this.size === 'medium') {
        return this.url.replace('https://randomuser.me/api/portraits/',
          'https://randomuser.me/api/portraits/med/')
      } else if (this.size === 'thumbnail') { 
        return this.url.replace('https://randomuser.me/api/portraits/',
          'https://randomuser.me/api/portraits/thumb/')
      }
    }
  },
  actions: {
    setUrl: (url) => state => {
      state.url = url
      return state
    },
    setSize: (size) => state => {
      state.size = size
    },
  },
  observedAttributes: ['url', 'size'],
  attributeChangedCallback: function (name, oldValue, newValue) {
    switch (name) {
      case 'url':
        this.actions.setUrl(newValue)
      case 'size':
        this.actions.setSize(newValue)
      default:
    }
  },
  constructor () {
    if (this.hasAttribute('url')) {
      this.actions.setUrl(this.getAttribute('url'))
    }
    if (this.hasAttribute('size')) {
      this.actions.setSize(this.getAttribute('size'))
    }
  }
}
