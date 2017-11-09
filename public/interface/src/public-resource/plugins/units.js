import Cache from './../modules/cache.js'

let Units = {}

Units.install = function (Vue) {
    //  数组合并 - 浅拷贝
    Vue.prototype.$array_merge = (array1, array2) => {
        for (let key in array2) {
            array1[key] = array2[key]
        }
        return array1
    }
    Vue.prototype.$cache = (name, value, exp = 7200, remove = false) => {
        if (remove) {
            return Cache.rem(name)
        }
        return value ? Cache.set(name, value, exp) : Cache.get(name)
    }
    Vue.prototype.$dump = (msg) => {
        console.log('---->调试')
        console.log(msg)
        console.log(' ')
    }
}
module.exports = Units