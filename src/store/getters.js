const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  checked: state => state.app.checked,
  token: state => state.user.token,
  name: state => state.user.name,
  avatar: state => state.user.avatar
}
export default getters
