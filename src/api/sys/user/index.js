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

export function addUser(user) {
    return request({
        url: '/sys/user/save',
        method: 'post',
        user
    })
}

export function updateUser(user) {
    return request({
        url: '/sys/user/update',
        method: 'put',
        user
    })
}

export function deleteUser(ids) {
    return request({
        url: '/sys/user/delete',
        method: 'delete',
        ids
    })
}

export function handlerRole(id, data) {
    return request({
        url: `/sys/user/role/${id}`,
        method: 'post',
        data
    })
}
