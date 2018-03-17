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
  observedAttributes: ['max']
}
