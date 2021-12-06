import request from "@/utils/request";

export function logout() {
    return request({
        url: '/logout',
        method: 'post',
    })
}
