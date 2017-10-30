let rootPath = require('path').resolve(__dirname, 'src')
export default {
    SERVER_DEV_URL: '/server/',
    SERVER_URL: '/server/admin/',
    SERVER_API_URL: '/server/admin/server/',
    __ROOT__: rootPath,
    publicPath: rootPath + '/public-resource/',
    imagePath: rootPath + '/images/',
    componentPath: rootPath + '/components/'
}