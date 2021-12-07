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
                        path: '/sys/role',
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
            "created": "2021-01-15T18:58:18",
            "updated": "2021-01-15T18:58:20",
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
                "created": "2021-01-15T19:03:45",
                "updated": "2021-01-15T19:03:48",
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
                    "created": "2021-01-17T21:48:32",
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
                    "created": "2021-01-17T21:49:03",
                    "updated": "2021-01-17T21:53:04",
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
                    "created": "2021-01-17T21:49:21",
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
                    "created": "2021-01-17T21:49:58",
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
                    "created": "2021-01-17T21:50:36",
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
                "created": "2021-01-15T19:03:45",
                "updated": "2021-01-15T19:03:48",
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
                    "created": "2021-01-15T23:02:25",
                    "updated": "2021-01-17T21:53:14",
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
                    "created": "2021-01-17T21:51:14",
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
                    "created": "2021-01-17T21:51:39",
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
                    "created": "2021-01-17T21:52:02",
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
                "created": "2021-01-15T19:03:45",
                "updated": "2021-01-15T19:03:48",
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
                    "created": "2021-01-17T21:53:53",
                    "updated": "2021-01-17T21:55:28",
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
                    "created": "2021-01-17T21:56:12",
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
                    "created": "2021-01-17T21:56:36",
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
            "created": "2021-01-15T19:06:11",
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
                "created": "2021-01-15T19:07:18",
                "updated": "2021-01-18T16:32:13",
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
