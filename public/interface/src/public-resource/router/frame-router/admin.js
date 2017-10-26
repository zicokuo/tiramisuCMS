import component_frame from '../../../components/frame.vue'
import component_dashboard from '../../../components/admin/home.vue'

const admin_router = {
  name: 'admin_router',
  path: '/admin*',
  component: component_frame,
  children: [
    {
      path: '',
      name: 'home',
      component: component_dashboard,
    }
  ]
}
export default admin_router