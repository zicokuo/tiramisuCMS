//  检测浏览器是否支持Storage,否则使用Cookie进行储存
import C from './cookies'

let d = new Date()

let expired = 24 * 60 * 60 * 1000 // 1日
let isStorage = (typeof (localStorage) === 'object')

//  todo storage应该增加数据时效性
const Cache = {
    get: function (name, defaultValue = null) {
        if (isStorage) {
            //  本地storage支持的话,则选用storage进行取值
            let value = JSON.parse(localStorage.getItem(name))
            // console.log(value)
            if (value !== null) {
                //  存在值后,检查时效
                if ((d.getTime() - value.expired) > expired) {
                    // console.log('cache取值:' + name + '失效')
                    //  失效的值进行删除,并返回null
                    this.rem(name)
                    return null
                } else {
                    return value = value.value || defaultValue
                }
            } else {
                return value
            }
        } else {
            return JSON.parse(C.get(name))
        }
    },
    set: function (name, value, isRewrite = true) {
        if (isStorage) {
            let data
            if (isRewrite === true) {
                //  覆盖
                data = {
                    'value': value,
                    'expired': d.getTime()
                }
            } else {
                let source = localStorage.getItem(name)
                if (source !== null) {
                    //  原来有数据,则合并source和value
                    data = {
                        'value': source.assign(value),
                        'expired': d.getTime()
                    }
                } else {
                    //  原来没有数据或者过期,则直接使用value
                    data = {
                        'value': value,
                        'expired': d.getTime()
                    }
                }
            }
            localStorage.setItem(name, JSON.stringify(data))
        } else {
            C.set(name, value, 1)
        }
    },
    rem: function (name) {
        isStorage ? localStorage.removeItem(name) : C.delete(name)
    },
}
module.exports = Cache
export default Cache