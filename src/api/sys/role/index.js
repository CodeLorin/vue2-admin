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

export function addRole(role) {
    return request({
        url: '/sys/role/save',
        method: 'post',
        role
    })
}

export function updateRole(role) {
    return request({
        url: '/sys/role/update',
        method: 'put',
        role
    })
}

export function deleteRole(ids) {
    return request({
        url: '/sys/role/delete',
        method: 'delete',
        ids
    })
}

export function handlerPerm(data) {
    return request({
        url: `/sys/role/perm/${data}`,
        method: 'post',
    })
}
