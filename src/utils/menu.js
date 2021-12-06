import {getMenu} from "@/api/menu/getmenu";
import router from "../router";
import store from '../store'
export const initMenu = () => {
    getMenu().then(res => {

        if (res.data) {
            res.data.menu.forEach(menu => {
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
        store.dispatch('setRouterList', res.data)
    })
}
const menuToRoute = (menu) => {
    let route = {
        name: menu.title,
        path: menu.path,
        meta: {
            icon: menu.icon,
        },
    }
    route.component = () => import(`@/views/${menu.component}`)
    return route
}
