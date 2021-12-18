import request from '@/utils/request'

export function getRouter() {
    return request({
        url: '/sys/menu/nav',
        method: 'get',
    })
}
