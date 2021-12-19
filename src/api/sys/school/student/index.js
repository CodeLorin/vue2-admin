import request from '@/utils/request'

export function studentList(queryForm) {
    return request({
        url: '/sys/student/list',
        method: 'get',
        params: queryForm
    })
}

export function studentInfo(id) {
    return request({
        url: `/sys/student/info/${id}`,
        method: 'get',
    })
}

export function addStudent(data) {
    return request({
        url: '/sys/student/add',
        method: 'post',
        data
    })
}

export function updateStudent(data) {
    return request({
        url: '/sys/student/update',
        method: 'put',
        data
    })
}

export function deleteStudent(data) {
    return request({
        url: '/sys/student/delete',
        method: 'delete',
        data
    })
}
export function getStudentTeacher() {
    return request({
        url: '/sys/student/info/teacher',
        method: 'get',

    })
}
