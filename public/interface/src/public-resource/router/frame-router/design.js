import component_frame from '../../../components/frame.vue'
import component_design_index from '../../../components/design/index.vue'

const design_router = {
  name: 'design_router',
  title: '设计',
  path: '/admin/design*',
  component: component_frame,
  children: [
    {
      path: '',
      name: 'home',
      title: '设计首页',
      component: component_design_index,
    }
  ]
}
export default design_router