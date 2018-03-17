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
