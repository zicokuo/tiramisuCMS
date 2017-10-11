import _ from 'lodash'
var storage = _.localStorage
export default ({
  set: function (name, value) {
    value = JSON.stringify(value)
    storage.setItem(name, value)
  },
  get: function (name) {
    var value = storage(name)
    return JSON.parse(value)
  },
  delete: function (name) {
    storage.removeItem(name)
  }
})
