let Units = {}

Units.install = function (Vue) {
    //  数组合并 - 浅拷贝
    Vue.prototype.$array_merge = (array1, array2) => {
        for (let key in array2) {
            array1[key] = array2[key]
        }
        return array1
    }
}
module.exports = Units