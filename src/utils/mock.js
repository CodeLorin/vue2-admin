const Mock = require('mockjs')
const getBaseResult = () => {
    return {
        code: 200,
        msg: "success",
        data: null
    }
}
Mock.mock('/login', 'post', () => {
    let Result = getBaseResult()
    Result.msg = "登录成功"
    Result.data = "token"
    return Result
})
Mock.mock('/logout', 'post', () => {
    let Result = getBaseResult()
    Result.msg = "注销成功"
    return Result
})
// 获取用户信息
Mock.mock('/sys/userinfo', 'get', () => {
    let Result = getBaseResult()
    Result.data = {
        id: 1,
        username: 'bylorin',
        avatar: 'https://cdn.jsdelivr.net/gh/CodeLorin/img@master/20210425/xxx.6b4667utjuc0.jfif'
    }
    return Result
})
// 获取导航
Mock.mock('/sys/getrouter', 'get', () => {
    let Result = getBaseResult()
    Result.data = {
        menu: [
            {
                name: 'SysManga',
                title: '系统管理',
                icon: 'icon-guanli1',
                path: '',
                component: '',
                children: [
                    {
                        name: 'SysUser',
                        title: '用户管理',
                        icon: 'icon-zhanghao',
                        path: '/sys/users',
                        component: 'sys/User',
                        children: []
                    },
                    {
                        name: 'SysRole',
                        title: '角色管理',
                        icon: 'icon-jiaoseguanli',
                        path: '/sys/roles',
                        component: 'sys/Role',
                        children: []
                    },
                    {
                        name: 'SysMenu',
                        title: '菜单管理',
                        icon: 'icon-caidan',
                        path: '/sys/menus',
                        component: 'sys/Menus',
                        children: []
                    }
                ]
            },
            {
                name: 'SysTools',
                title: '系统工具',
                icon: 'icon-xitong',
                path: '',
                children: [
                    {
                        name: 'SysLog',
                        title: '系统日志',
                        icon: 'icon-rizhi',
                        path: '/sys/log',
                        component: 'tool/Log',
                        children: []
                    },
                    {
                        name: 'SysOnlineUser',
                        title: '在线用户',
                        icon: 'icon-zaixianyonghu',
                        path: '/sys/onlineuser',
                        component: 'tool/OnlineUser',
                        children: []
                    },
                ]
            },
            {
                path: "*",
                name: 404,
                title: 404,
                hidden: true,
                component: 'error/404'
            }
        ],
        authorization: []
    }
    return Result
})
Mock.mock('/sys/menu/list', 'get', () => {
    return {
        "code": 200, "msg": "操作成功", "data": [{
            "id": 1,
            "created": "2021-01-12 18:58:18",
            "updated": "2021-01-12 18:58:20",
            "status": 1,
            "parentId": 0,
            "name": "系统管理",
            "path": "",
            "perms": "sys:manage",
            "component": "",
            "type": 0,
            "icon": "el-icon-s-operation",
            "ordernum": 1,
            "children": [{
                "id": 2,
                "created": "2021-01-12 19:03:45",
                "updated": "2021-01-12 19:03:48",
                "status": 1,
                "parentId": 1,
                "name": "用户管理",
                "path": "/sys/users",
                "perms": "sys:user:list",
                "component": "sys/User",
                "type": 1,
                "icon": "el-icon-s-custom",
                "ordernum": 1,
                "children": [{
                    "id": 9,
                    "created": "2021-01-12 21:48:32",
                    "updated": null,
                    "status": 1,
                    "parentId": 2,
                    "name": "添加用户",
                    "path": null,
                    "perms": "sys:user:save",
                    "component": null,
                    "type": 2,
                    "icon": null,
                    "ordernum": 1,
                    "children": []
                }, {
                    "id": 10,
                    "created": "2021-01-12 21:49:03",
                    "updated": "2021-01-12 21:53:04",
                    "status": 1,
                    "parentId": 2,
                    "name": "修改用户",
                    "path": null,
                    "perms": "sys:user:update",
                    "component": null,
                    "type": 2,
                    "icon": null,
                    "ordernum": 2,
                    "children": []
                }, {
                    "id": 11,
                    "created": "2021-01-12 21:49:21",
                    "updated": null,
                    "status": 1,
                    "parentId": 2,
                    "name": "删除用户",
                    "path": null,
                    "perms": "sys:user:delete",
                    "component": null,
                    "type": 2,
                    "icon": null,
                    "ordernum": 3,
                    "children": []
                }, {
                    "id": 12,
                    "created": "2021-01-12 21:49:58",
                    "updated": null,
                    "status": 1,
                    "parentId": 2,
                    "name": "分配角色",
                    "path": null,
                    "perms": "sys:user:role",
                    "component": null,
                    "type": 2,
                    "icon": null,
                    "ordernum": 4,
                    "children": []
                }, {
                    "id": 13,
                    "created": "2021-01-12 21:50:36",
                    "updated": null,
                    "status": 1,
                    "parentId": 2,
                    "name": "重置密码",
                    "path": null,
                    "perms": "sys:user:repass",
                    "component": null,
                    "type": 2,
                    "icon": null,
                    "ordernum": 5,
                    "children": []
                }]
            }, {
                "id": 3,
                "created": "2021-01-12 19:03:45",
                "updated": "2021-01-12 19:03:48",
                "status": 1,
                "parentId": 1,
                "name": "角色管理",
                "path": "/sys/roles",
                "perms": "sys:role:list",
                "component": "sys/Role",
                "type": 1,
                "icon": "el-icon-rank",
                "ordernum": 2,
                "children": [{
                    "id": 7,
                    "created": "2021-01-12 23:02:25",
                    "updated": "2021-01-12 21:53:14",
                    "status": 0,
                    "parentId": 3,
                    "name": "添加角色",
                    "path": "",
                    "perms": "sys:role:save",
                    "component": "",
                    "type": 2,
                    "icon": "",
                    "ordernum": 1,
                    "children": []
                }, {
                    "id": 14,
                    "created": "2021-01-12 21:51:14",
                    "updated": null,
                    "status": 1,
                    "parentId": 3,
                    "name": "修改角色",
                    "path": null,
                    "perms": "sys:role:update",
                    "component": null,
                    "type": 2,
                    "icon": null,
                    "ordernum": 2,
                    "children": []
                }, {
                    "id": 15,
                    "created": "2021-01-12 21:51:39",
                    "updated": null,
                    "status": 1,
                    "parentId": 3,
                    "name": "删除角色",
                    "path": null,
                    "perms": "sys:role:delete",
                    "component": null,
                    "type": 2,
                    "icon": null,
                    "ordernum": 3,
                    "children": []
                }, {
                    "id": 16,
                    "created": "2021-01-12 21:52:02",
                    "updated": null,
                    "status": 1,
                    "parentId": 3,
                    "name": "分配权限",
                    "path": null,
                    "perms": "sys:role:perm",
                    "component": null,
                    "type": 2,
                    "icon": null,
                    "ordernum": 5,
                    "children": []
                }]
            }, {
                "id": 4,
                "created": "2021-01-12 19:03:45",
                "updated": "2021-01-12 19:03:48",
                "status": 1,
                "parentId": 1,
                "name": "菜单管理",
                "path": "/sys/menus",
                "perms": "sys:router:list",
                "component": "sys/Menu",
                "type": 1,
                "icon": "el-icon-router",
                "ordernum": 3,
                "children": [{
                    "id": 17,
                    "created": "2021-01-12 21:53:53",
                    "updated": "2021-01-12 21:55:28",
                    "status": 1,
                    "parentId": 4,
                    "name": "添加菜单",
                    "path": null,
                    "perms": "sys:router:save",
                    "component": null,
                    "type": 2,
                    "icon": null,
                    "ordernum": 1,
                    "children": []
                }, {
                    "id": 18,
                    "created": "2021-01-12 21:56:12",
                    "updated": null,
                    "status": 1,
                    "parentId": 4,
                    "name": "修改菜单",
                    "path": null,
                    "perms": "sys:router:update",
                    "component": null,
                    "type": 2,
                    "icon": null,
                    "ordernum": 2,
                    "children": []
                }, {
                    "id": 19,
                    "created": "2021-01-12 21:56:36",
                    "updated": null,
                    "status": 1,
                    "parentId": 4,
                    "name": "删除菜单",
                    "path": null,
                    "perms": "sys:router:delete",
                    "component": null,
                    "type": 2,
                    "icon": null,
                    "ordernum": 3,
                    "children": []
                }]
            }]
        }, {
            "id": 5,
            "created": "2021-01-12 19:06:11",
            "updated": null,
            "status": 1,
            "parentId": 0,
            "name": "系统工具",
            "path": "",
            "perms": "sys:tools",
            "component": null,
            "type": 0,
            "icon": "el-icon-s-tools",
            "ordernum": 2,
            "children": [{
                "id": 6,
                "created": "2021-01-12 19:07:18",
                "updated": "2021-01-12 16:32:13",
                "status": 1,
                "parentId": 5,
                "name": "系统日志",
                "path": "/sys/log",
                "perms": "sys:log:list",
                "component": "sys/Log",
                "type": 1,
                "icon": "el-icon-s-order",
                "ordernum": 1,
                "children": []
            }]
        }]
    }
})
Mock.mock(RegExp('/sys/menu/info/*'), 'get', () => {
    let Result = getBaseResult()
    Result.msg = '获取成功'
    Result.data = {
        "id": 3,
        "status": 1,
        "parentId": 1,
        "name": "角色管理",
        "path": "/sys/roles",
        "perms": "sys:role:list",
        "component": "sys/Role",
        "type": 1,
        "icon": "el-icon-rank",
        "orderNum": 2,
        "children": []
    }

    return Result
})
Mock.mock(RegExp('/sys/menu/*'), 'post', () => {
    let Result = getBaseResult()
    Result.msg = "添加成功"
    return Result
})
Mock.mock(RegExp('/sys/menu/*'), 'put', () => {
    let Result = getBaseResult()
    Result.msg = "修改成功"
    return Result
})
Mock.mock(RegExp('/sys/menu/*'), 'delete', () => {
    let Result = getBaseResult()
    Result.msg = "删除成功"
    return Result
})
// 获取角色
Mock.mock(RegExp('/sys/role/list*'), 'get', () => {
    let Result = getBaseResult()
    Result.data = {
        "records": [
            {
                "id": 3,
                "created": "2021-01-02 10:09:14",
                "updated": "2021-01-32 08:19:52",
                "status": 1,
                "name": "普通用户",
                "code": "base",
                "desc": "基础功能",
                "menuIds": []
            },
            {
                "id": 6,
                "created": "2021-01-12 13:29:03",
                "updated": "2021-01-12 15:50:45",
                "status": 1,
                "name": "超级管理员",
                "code": "admin",
                "desc": "最高权限",
                "menuIds": []
            }
        ],
        "total": 2,
        "size": 10,
        "current": 1,
        "orders": [],
        "optimizeCountSql": true,
        "hitCount": false,
        "countId": null,
        "maxLimit": null,
        "searchCount": true,
        "pages": 1
    }

    return Result

})

Mock.mock(RegExp('/sys/role/info/*'), 'get', () => {
    let Result = getBaseResult()
    Result.data = {
        "id": 6,
        "created": "2021-01-12 13:29:03",
        "updated": "2021-01-12 15:50:45",
        "status": 1,
        "name": "超级管理员",
        "code": "admin",
        "desc": "最高权限",
        "menuIds": [1, 2, 3, 4, 5, 6]
    }

    return Result
})

Mock.mock(RegExp('/sys/role/*'), 'post', () => {
    let Result = getBaseResult()
    Result.msg = "添加成功"
    return Result
})
Mock.mock(RegExp('/sys/role/*'), 'put', () => {
    let Result = getBaseResult()
    Result.msg = "修改成功"
    return Result
})
Mock.mock(RegExp('/sys/role/*'), 'delete', () => {
    let Result = getBaseResult()
    Result.msg = "删除成功"
    return Result
})

// 用户管理

Mock.mock(RegExp('/sys/user/list*'), 'get', () => {
    let Result = getBaseResult()
    Result.data = {
        "records": [
            {
                "id": 1,
                "created": "2021-01-12 22:13:53",
                "updated": "2021-01-12 16:57:32",
                "status": 1,
                "username": "admin",
                "password": "$2a$10$R7zegeWzOXPw871CmNuJ6upC0v8D373GuLuTw8jn6NET4BkPRZfgK",
                "avatar": "https://cdn.jsdelivr.net/gh/CodeLorin/img@master/20210425/xxx.6b4667utjuc0.jfif",
                "email": "admin@qq.com",
                "city": "广州",
                "lastLogin": "2020-12-32 08:38:37",
                "roles": [
                    {
                        "id": 6,
                        "created": "2021-01-12 13:29:03",
                        "updated": "2021-01-12 15:50:45",
                        "status": 1,
                        "name": "超级管理员",
                        "code": "admin",
                        "remark": "系统默认最高权限，不可以编辑和任意修改",
                        "menuIds": []
                    },
                    {
                        "id": 3,
                        "created": "2021-01-02 10:09:14",
                        "updated": "2021-01-32 08:19:52",
                        "status": 1,
                        "name": "普通用户",
                        "code": "normal",
                        "remark": "只有基本查看功能",
                        "menuIds": []
                    }
                ]
            },
            {
                "id": 2,
                "created": "2021-01-32 08:20:22",
                "updated": "2021-01-32 08:55:57",
                "status": 1,
                "username": "lorin",
                "password": "$2a$10$0ilP4ZD1kLugYwLCs4pmb.ZT9cFqzOZTNaMiHxrBnVIQUGUwEvBIO",
                "avatar": "https://cdn.jsdelivr.net/gh/CodeLorin/img@master/20210425/xxx.6b4667utjuc0.jfif",
                "email": "lorin@qq.com",
                "city": null,
                "lastLogin": null,
                "roles": [
                    {
                        "id": 3,
                        "created": "2021-01-02 10:09:14",
                        "updated": "2021-01-32 08:19:52",
                        "status": 1,
                        "name": "普通用户",
                        "code": "normal",
                        "remark": "只有基本查看功能",
                        "menuIds": []
                    }
                ]
            }
        ],
        "total": 2,
        "size": 10,
        "current": 1,
        "orders": [],
        "optimizeCountSql": true,
        "hitCount": false,
        "countId": null,
        "maxLimit": null,
        "searchCount": true,
        "pages": 1
    }

    return Result
})


Mock.mock(RegExp('/sys/user/*'), 'post', () => {
    let Result = getBaseResult()
    Result.msg = "添加成功"
    return Result
})
Mock.mock(RegExp('/sys/user/*'), 'put', () => {
    let Result = getBaseResult()
    Result.msg = "修改成功"
    return Result
})
Mock.mock(RegExp('/sys/user/*'), 'delete', () => {
    let Result = getBaseResult()
    Result.msg = "删除成功"
    return Result
})
Mock.mock(RegExp('/sys/user/info/*'), 'get', () => {
    let Result = getBaseResult()
    Result.data = {
        "id": 2,
        "created": "2021-01-32 08:20:22",
        "updated": "2021-01-32 08:55:57",
        "status": 1,
        "username": "lorin",
        "password": "$2a$1asgasd",
        "avatar": "https://cdn.jsdelivr.net/gh/CodeLorin/img@master/20210425/xxx.6b4667utjuc0.jfif",
        "email": "lorin@qq.com",
        "city": null,
        "lastLogin": null,
        "roles": []
    }
    return Result
})
