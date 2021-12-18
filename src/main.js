import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false
// element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
// request
import request from "./utils/request"

Vue.prototype.$axios = request
// 滚动条
import 'nprogress/nprogress.css'
// mock.js
// if (process.env.NODE_ENV === 'development') {
//     require('./utils/mock')
// }
// 动画
import 'animate.css'
// 图标
import './assets/icon/iconfont.css'


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
