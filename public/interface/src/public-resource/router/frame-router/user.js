import component_template from '../../../components/template.vue'
import component_user_enter from '../../../components/user/user_entry.vue'

const user_router = {
  name: 'user_router',
  path: '/admin/user*',
  component: component_template,
  children: [{
    path: 'login',
    component: component_user_enter
  }]

}
export default user_router