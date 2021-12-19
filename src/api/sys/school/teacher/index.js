import request from '@/utils/request'

export function teacherList(queryForm) {
    return request({
        url: '/sys/teacher/list',
        method: 'get',
        params: queryForm
    })
}

export function teacherInfo(id) {
    return request({
        url: `/sys/teacher/info/${id}`,
        method: 'get',
    })
}

export function addTeacher(data) {
    return request({
        url: '/sys/teacher/add',
        method: 'post',
        data
    })
}

export function updateTeacher(data) {
    return request({
        url: '/sys/teacher/update',
        method: 'put',
        data
    })
}

export function deleteTeacher(data) {
    return request({
        url: '/sys/teacher/delete',
        method: 'delete',
        data
    })
}
