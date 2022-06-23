import { getRouter } from "@/api/router/getRouter";
import router from "../router";
import store from '../store'

export const initMenu = () => {
    getRouter().then(res => {
        if (res.data) {
            handlerTree(res.data.nav)
        }
        store.dispatch('setRouterList', res.data)
    })
}
export function refreshMenu() {
    console.log(store.state.menuList)
    handlerTree(store.state.menuList)
}
function handlerTree(data) {
    data.forEach(menu => {
        if (menu.children) {
            menu.children.forEach(e => {
                // 转成路由
                let route = menuToRoute(e)
                if (route) {
                    router.addRoute('lorin', route)
                }

            })
        } else {
            router.addRoute('lorin', menuToRoute(menu))
        }
    })

}

const menuToRoute = (menu) => {
    let route = {
        name: menu.name,
        path: menu.path,
        meta: {
            icon: menu.icon,
            title: menu.title
        },
    }
    route.component = () => import(`@/views/${menu.component}`)
    return route
}
