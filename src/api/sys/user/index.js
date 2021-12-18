import request from '@/utils/request'

export function userList(queryForm) {
    return request({
        url: '/sys/user/list',
        method: 'get',
        params: queryForm
    })
}

export function userInfo(id) {
    return request({
        url: `/sys/user/info/${id}`,
        method: 'get',
    })
}

export function addUser(data) {
    return request({
        url: '/sys/user/add',
        method: 'post',
        data
    })
}

export function updateUser(data) {
    return request({
        url: '/sys/user/update',
        method: 'put',
        data
    })
}

export function deleteUser(data) {
    return request({
        url: '/sys/user/delete',
        method: 'delete',
        data
    })
}

export function handlerRole(id, data) {
    return request({
        url: `/sys/user/role/${id}`,
        method: 'post',
        data
    })
}
export function rePassword(data) {
    return request({
        url: `/sys/user/repass`,
        method: 'put',
        data
    })
}
