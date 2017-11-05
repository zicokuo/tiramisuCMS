//  开发模式
let IS_DEV = false;
let rootPath = require('path').resolve(__dirname, 'src')
let extraPath = IS_DEV ? '/server/' : 'http://www.diavision.cn/diavision/public/'
// let extraPath = ''
export default {
    IS_DEV: IS_DEV,
    BASE_URL: extraPath,
    SERVER_DEV_URL: extraPath,
    SERVER_URL: extraPath + 'admin/',
    SERVER_API_URL: extraPath + 'admin/server/',
    __ROOT__: rootPath,
    publicPath: rootPath + '/public-resource/',
    imagePath: rootPath + '/images/',
    componentPath: rootPath + '/components/'
}