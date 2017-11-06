const index_router = {
    icon: 'el-icon-i--homepage_fill',
    title: '首页',
    name: 'index_router',
    path: '(admin)*',
    component: ()=>import('../../../components/index/index.vue')
}
export default index_router