//  检测浏览器是否支持Storage,否则使用Cookie进行储存
import C from './cookies'

let d = new Date()

let expired = 24 * 60 * 60 * 1000 // 1日
let storageSupport = (typeof(localStorage) === 'object')

//  todo storage应该增加数据时效性
const Cache = {
  get: function (name, defaultValue = null) {
    // return JSON.parse(storageSupport ? localStorage.getItem(name) : C.get(name))
    let value = defaultValue
    if (storageSupport) {
      let value = JSON.parse(localStorage.getItem(name))
      if (value !== null) {
        //  检查时效
        if ((d.getTime() - value[1]) > expired) {
          this.rem(name)
          value = null
        } else {
          value = value[0]
        }
      }
      value = value || defaultValue
    } else {
      value = JSON.parse(C.get(name))
    }
    return value
  },
  set: function (name, value, isRewrite = true) {
    // storageSupport ? localStorage.setItem(name, value) : C.set(name, value, 1)
    if (storageSupport) {
      let data
      if (isRewrite === true) {
        //  覆盖
        data = [value, d.getTime()]
      } else {
        let source = localStorage.getItem(name)
        if (source !== null) {
          //  原来有数据,则合并source和value
          data = [source.assign(value), d.getTime()]
        } else {
          //  原来没有数据或者过期,则直接使用value
          data = [value, d.getTime()]
        }
      }
      localStorage.setItem(name, JSON.stringify(data))
    } else {
      C.set(name, value, 1)
    }
  },
  rem: function (name) {
    storageSupport ? localStorage.removeItem(name) : C.delete(name)
  }
}
export default Cache

