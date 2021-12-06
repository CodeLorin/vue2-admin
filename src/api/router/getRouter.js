import request from '@/utils/request'

export function getRouter() {
    return request({
        url: '/sys/getrouter',
        method: 'get',
    })
}
