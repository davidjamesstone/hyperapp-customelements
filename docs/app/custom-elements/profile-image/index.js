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
