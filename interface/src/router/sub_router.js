import index_router from './sub-router/index'
import admin_router from './sub-router/admin'
import weixin_router from './sub-router/weixin'

let sub_router = []
sub_router = sub_router.concat(weixin_router, admin_router)
sub_router = sub_router.concat(index_router)
export default sub_router