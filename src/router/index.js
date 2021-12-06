import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'lorin',
        meta: {
            title: 'lorin'
        },
        component: () => import('../layout/Home'),
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                meta: {
                    title: '系统首页'
                },
                component: () => import('../views/home/Index')
            },
            {
                path: '/usercenter',
                meta: {
                    title: '个人中心'
                },
                name: 'UserCenter',
                component: () => import('../views/usercenter/Index.vue')
            },

        ],
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: '系统登录'
        },
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
    // set title
    window.document.title = to.meta.title;
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


