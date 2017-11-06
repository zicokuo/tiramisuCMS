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
        let cache = () => import('./../modules/cache.js');
        if (remove) {
            return cache.rem(name)
        }
        return value ? cache.set(name, value, exp) : cahce.get(name);
    }
    Vue.prototype.$dump = (msg) => {
        console.log('---->调试')
        console.log(msg)
        console.log(' ')
    }
}
module.exports = Units