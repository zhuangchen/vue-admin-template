// 顶部菜单项
export interface ITopMenuItem {
    key: string // 导航唯一标识
    id: string // 导航id
    name: String // 导航名字
    sidebarMenu?: ISidebarMenuItem[] // 侧边菜单
    subMenu?: ISidebarMenuItem[] // 子菜单
}
// 顶部菜单
export interface ITopMenu {
    defaultActive: string  // 默认激活的菜单项
    mode: 'horizontal' | 'vertical' // 菜单模式
    topMenuItems: ITopMenuItem[] // 菜单项
}


// 分组菜单
// 侧边菜单项
export interface ISidebarMenuItem {
    id: string // 导航id
    name: string // 导航名称
    isBlank?: boolean // 是否新窗口
    url?: string // 导航链接
    icon?: string // 导航图标
    disabled?: boolean // 是否禁用
    isGroup?: boolean  // 是否是分组菜单
    subMenu?: ISidebarMenuItem[] // 子菜单
}
// 侧边菜单
export interface ISidebarMenu {
    defaultOpeneds: string[] // 当前展开的子菜单index索引
    collapseTransition: boolean //是否开启折叠动画
    uniqueOpened: boolean // 是否保持一个菜单展开
    defaultActive: string // 默认激活的菜单项
    mode: 'horizontal' | 'vertical' // 菜单模式
    sidebarMenuItems: ISidebarMenuItem[] // 菜单项
}