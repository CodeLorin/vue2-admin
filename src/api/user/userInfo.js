import request from "@/utils/request";

export function userInfo() {
    return request({
        url: '/sys/userInfo',
        method: 'get',
    })
}
