import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store'

Vue.use(VueRouter)
import Layout from "../layout/Home";
import Home from "../views/home/Index";

const routes = [
    {
        path: '/',
        name: 'lorin',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: '首页',
                component: Home
            },
            {
                path: '/usercenter',
                name: '个人中心',
                component: () => import('../views/usercenter/Index.vue')
            },

        ],
    },
    {
        path: "/login",
        name: "Login",
        component: () => import('../views/Login')
    },

]

const createRouter = () =>
    new VueRouter({
        scrollBehavior: () => ({y: 0}),
        routes
    })
import {initMenu} from '@/utils/menu'
import {Message} from "element-ui";


const router = createRouter()
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.path === '/login') {
        next()
    } else if (store.state.token === null || store.state.token === "") {
        next('/login')
        Message.warning("请先登录！！")
        NProgress.done()
    } else if (!store.state.isGetRouter || router.getRoutes().length <= 4) {
        initMenu()
    }
    next()
})
router.afterEach(() => {
        NProgress.done()
    }
)
export default router


