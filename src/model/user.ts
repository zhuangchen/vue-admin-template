interface IUser {
    avatar: string | null // 用户头像
    fullName: string | null // 用户姓名
    nickname: string | null  // 用户昵称
    department: string | null // 用户部门
    menus: any // 用户菜单
    permissions: string[] | null // 用户权限
}