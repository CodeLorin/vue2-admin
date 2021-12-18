import axios from "axios"
import {Message} from "element-ui"
import {Loading} from "element-ui"
import NProgress from 'nprogress'
import store from '../store'
import router from "../router";

const loading = { //loading加载对象
    loadingInstance: null,
    open() {
        if (this.loadingInstance === null) {
            this.loadingInstance = Loading.service({
                text: '加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)',
                customClass: 'loading'
            })
        }
    },
    close() {
        if (this.loadingInstance !== null) {
            this.loadingInstance.close()
        }
        this.loadingInstance = null

    }
}
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10000
})
service.interceptors.request.use(
    config => {
        NProgress.start();
        loading.open()
        // TODO
        config.headers['Authorization'] = store.state.token;
        return config
    },
    error => {
        console.log("requests" + error) // for debug
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    response => {
        const res = response.data
        loading.close()
        NProgress.done()
        if (res.code === 200) {
            return res
        } else {
            Message({
                message: res.msg ? res.msg : '系统异常！',
                type: 'error',
                duration: 3 * 1000
            })
        }

        return Promise.reject(res.msg)
    }, error => {
        console.log('err' + error) // for debug
        loading.close()
        NProgress.done()
        if (error.response.data.msg) {
            Message({
                message: error.response.data.msg,
                type: 'error',
                duration: 3 * 1000
            })
        } else {
            Message({
                message: error.message,
                type: 'error',
                duration: 3 * 1000
            })
        }
        if (error.response.status === 401) {
            store.dispatch("logout")
            router.push('/login')
        }
        // if (error.response.status === 401 || error.response.status === 403) {
        //     store.dispatch("logout")
        //     router.push('/login')
        // }
        return Promise.reject(error)
    }
)


export default service
