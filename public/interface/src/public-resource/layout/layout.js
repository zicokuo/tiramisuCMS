let Layout = {}

Layout.install = function (Vue, options) {
  //  修改页面标题
  let settings = {
    title: '',
    ticket: '',
  }
  for (let property in options) {
    settings[property] = options[property]  // 使用 options 的配置
  }
  Vue.prototype.$pageTitle = (title) => {
    settings.title = title
  }

  Vue.mixin({
    updated: function () {
      //  更新界面时候更新网页标题
      document.title = settings.title || 'TiramisuCMS'
    },
    mounted: function () {
      //  挂载时更新网页标题
      document.title = settings.title || 'TiramisuCMS'
    }
  })
}
module.exports = Layout