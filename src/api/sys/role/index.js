import request from '@/utils/request'

export function roleList(queryForm) {
    return request({
        url: '/sys/role/list',
        method: 'get',
        params: queryForm
    })
}

export function roleInfo(id) {
    return request({
        url: `/sys/role/info/${id}`,
        method: 'get',
    })
}

export function addRole(data) {
    return request({
        url: '/sys/role/add',
        method: 'post',
        data
    })
}

export function updateRole(data) {
    return request({
        url: '/sys/role/update',
        method: 'put',
        data
    })
}

export function deleteRole(data) {
    return request({
        url: '/sys/role/delete',
        method: 'delete',
        data
    })
}

export function handlerPerm(id, data) {
    return request({
        url: `/sys/role/perm/${id}`,
        method: 'post',
        data
    })
}
