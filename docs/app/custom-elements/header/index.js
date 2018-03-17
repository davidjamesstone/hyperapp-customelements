module.exports = {
  name: 'x-header',
  state: {
    showMenu: false
  },
  mapAttrsToState: false,
  actions: {
    toggleMenu: () => (state) => ({ showMenu: !state.showMenu })
  },
  view: require('./view.html')
}
