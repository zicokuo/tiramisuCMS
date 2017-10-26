let Dump = {}
Dump.install = function (Vue) {
  Vue.prototype.$dump = (msg) => {
    console.log('---->调试')
    console.log(msg)
    console.log(' ')
  }
}
module.exports = Dump