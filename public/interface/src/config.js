let rootPath = require('path').resolve(__dirname, 'src')
let extraPath = '/diavision/public'
// let extraPath = ''
export default {
    BASE_URL:extraPath,
    SERVER_DEV_URL: extraPath + '/server/',
    SERVER_URL: extraPath + '/server/admin/',
    SERVER_API_URL: extraPath + '/server/admin/server/',
    __ROOT__: rootPath,
    publicPath: rootPath + '/public-resource/',
    imagePath: rootPath + '/images/',
    componentPath: rootPath + '/components/'
}