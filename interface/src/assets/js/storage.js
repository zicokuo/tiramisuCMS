const storage = {
  get (name) {
    return JSON.parse(localStorage.getItem(name))
  },
  set (name, value) {
    localStorage.setItem(name, JSON.stringify(value))
  },
  rem (name) {
    localStorage.removeItem(name)
  }
}
export default storage
