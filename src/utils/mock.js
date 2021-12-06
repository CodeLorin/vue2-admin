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
        username: 'lorin',
        avatar: 'https://cdn.jsdelivr.net/gh/CodeLorin/img@master/20210425/xxx.6b4667utjuc0.jfif'
    }
    return Result
})
// 获取导航
Mock.mock('/sys/getmenu', 'get', () => {
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
