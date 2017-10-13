//  检测浏览器是否支持Storage,否则使用Cookie进行储存
import C from './cookies'

let d = new Date()

const expired = 24 * 60 * 60 * 1000 // 1日
let storageSupport = (typeof(Storage) === 'function')

//  todo storage应该增加数据时效性
const storage = {
  get (name) {
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
      return value
    } else {
      return JSON.parse(C.get(name))
    }
    // return JSON.parse(storageSupport ? localStorage.getItem(name) : C.get(name))
  },
  set (name, value) {
    // storageSupport ? localStorage.setItem(name, value) : C.set(name, value, 1)
    if (storageSupport) {
      let data = [value, d.getTime()]
      localStorage.setItem(name, JSON.stringify(data))
    } else {
      C.set(name, value, 1)
    }
  },
  rem (name) {
    storageSupport ? localStorage.removeItem(name) : C.delete(name)
  }
}
export default storage
