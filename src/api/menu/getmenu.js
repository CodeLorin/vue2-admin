import request from '@/utils/request'

export function getMenu() {
    return request({
        url: '/sys/getmenu',
        method: 'get',
    })
}
