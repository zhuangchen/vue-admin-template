import {ISidebarMenuItem} from './menu';
export interface ISubSystem {
    appHost: string  // 系统主域
    appName: string  // 系统名称
    appId: string   // 系统唯一标识id
    appRegRule: string  // 系统匹配规则，命中规则的路由会匹配此系统对于的页面
}

export interface IUser {
    avatar: string // 用户头像
    fullName: string // 用户姓名
    nickname: string  // 用户昵称
    department: string // 用户部门
    subSystems: ISubSystem[]  // 子系统信息
    menus: ISidebarMenuItem[] // 所有菜单
    permissions: string[] // 用户权限
}