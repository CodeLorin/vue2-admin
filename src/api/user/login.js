import request from "@/utils/request";
import qs from 'qs'

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}
export function captcha(data) {
    return request({
        url: '/captcha',
        method: 'get'
    })
}