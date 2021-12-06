import request from "@/utils/request";

export function getUserInfo() {
    return request({
        url: '/sys/userinfo',
        method: 'get',
    })
}
