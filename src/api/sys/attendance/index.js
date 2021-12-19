import request from '@/utils/request'

export function attendanceList(queryForm) {
    return request({
        url: '/sys/attendance/list',
        method: 'get',
        params: queryForm
    })
}

export function attendanceInfo(id) {
    return request({
        url: `/sys/attendance/info/${id}`,
        method: 'get',
    })
}

export function addAttendance(data) {
    return request({
        url: '/sys/attendance/add',
        method: 'post',
        data
    })
}

export function updateAttendance(data) {
    return request({
        url: '/sys/attendance/update',
        method: 'put',
        data
    })
}

export function deleteAttendance(data) {
    return request({
        url: '/sys/attendance/delete',
        method: 'delete',
        data
    })
}
export function getAttendanceRecord() {
    return request({
        url: '/sys/attendance/list/record',
        method: 'get',
    })
}
