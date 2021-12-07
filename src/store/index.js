import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import {getRouter} from "@/api/router/getRouter";
import {userInfo} from "@/api/user/userInfo";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tabList: [],
        isCollapse: false,
        userInfo: {},
        menuList: [],
        permList: [],
        isGetRouter: false,
        token: ''
    },
    mutations: {
        // 保存标签
        saveTab(state, tab) {
            if (state.tabList.findIndex(item => item.path === tab.path) === -1) {
                state.tabList.push({name: tab.meta.title, path: tab.path});
            }
        },
        // 移除标签
        removeTab(state, tab) {
            if (tab.name !== "首页") {
                let index = state.tabList.findIndex(item => item.path === tab.path);
                state.tabList.splice(index, 1);
            }
        },
        // 重置标签
        resetTab(state) {
            state.tabList = [{name: "首页", path: "/home"}];
        },
        // 侧边栏折叠
        setCollapse(state) {
            state.isCollapse = !state.isCollapse;
        },
        // 设置菜单栏
        setMenuList(state, data) {
            state.menuList = data;
        },
        setPermList(state, data) {
            state.permList = data
            state.isGetRouter = true
        },
        // 用户退出
        logout(state) {
            sessionStorage.clear()
            localStorage.clear()
            sessionStorage.removeItem('vuex')
            localStorage.removeItem('vuex')
            state.menuList = []
            state.tabList = []
            state.permList = []
            state.isCollapse = false
            state.userInfo = {}
            state.isGetRouter = false
            state.token = ''
        },
        // 设置用户信息
        setUserInfo(state, data) {
            state.userInfo = data;
        },
        // 设置jwt
        setToken(state, data) {
            state.token = data
        }
    },
    actions: {
        async setRouterList(context) {
            const {data} = await getRouter()
            context.commit('setMenuList', data.menu);
            context.commit('setPermList', data.authorization)
        },
        async setUserInfo(context) {
            const {data} = await userInfo()
            context.commit('setUserInfo', data);
        },
        saveTab(context, data) {
            context.commit('saveTab', data);
        },
    },
    modules: {},
    //持久化存储
    plugins: [persistedState({storage: window.sessionStorage})],
});
