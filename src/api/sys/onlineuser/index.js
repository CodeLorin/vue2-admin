import request from '@/utils/request'

export function onlineUserList() {
    return request({
        url: '/sys/onlineuser/list',
        method: 'get'
    })
}

export function logoutOnlineUser(data) {
    return request({
        url: `/sys/onlineuser/logout`,
        method: 'delete',
        data
    })
}
