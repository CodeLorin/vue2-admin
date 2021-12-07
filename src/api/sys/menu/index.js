import request from '@/utils/request'

export function menuList() {
    return request({
        url: '/sys/menu/list',
        method: 'get',
    })
}

export function addMenu(data) {
    return request({
        url: '/sys/menu/add',
        method: 'post',
        data
    })
}

export function updateMenu(data) {
    return request({
        url: '/sys/menu/update',
        method: 'put',
        data
    })
}

export function delMenu(data) {
    return request({
        url: '/sys/menu/del',
        method: 'delete',
        data
    })
}

export function menuInfo(data) {
    return request({
        url: `/sys/menu/info/${data}`,
        method: 'get',
    })
}
