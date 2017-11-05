/**
 * Created by Administrator on 2017-11-04.
 */
let is_dev = true;
let rootPath = require('path').resolve(__dirname, 'src')
let serverUrl = is_dev ? '/server/' : 'http://www.diavision.cn/diavision/public/'
let config = {}
let configs = {
    //  开发模式
    dev: is_dev,
    //  项目根目录
    path: {
        rootPath: rootPath,
        publicPath: rootPath + 'public-resource/'
    },
    //  项目地址
    url: {
        rootUrl: '/',
        serverUrl: serverUrl,
        adminUrl: serverUrl + 'admin/'
    },

    //  动态添加路径
    pushPath: (name, path) => {
        configs.path[name] = path
    },

    //  动态添加地址
    pushUrl: (name, path) => {
        configs.url[name] = path
    },

}
config.install = function (Vue) {
    Vue.prototype.$getPath = (name) => {
        return configs.path[name] || null;
    }
    Vue.prototype.$getUrl = (name) => {
        return configs.url[name] || null;
    }
}

// export default configs
module.exports = config