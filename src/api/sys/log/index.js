import request from '@/utils/request'

export function logList(queryForm) {
    return request({
        url: '/sys/log/list',
        method: 'get',
        params: queryForm
    })
}

export function deleteLog(data) {
    return request({
        url: '/sys/log/delete',
        method: 'delete',
        data
    })
}
