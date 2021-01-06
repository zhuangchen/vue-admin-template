// 顶部菜单项
export interface ITopMenuItem {
    id: string; // 导航id
    name: String; // 导航名字
    subMenus?: ITopMenuItem[]; // 子菜单
}
// 顶部菜单
export interface ITopMenu {
    defaultActive: string;   // 默认激活的菜单项
    mode: 'horizontal' | 'vertical'; // 菜单模式
    topMenuItems: ITopMenuItem[]; // 菜单项
}

// 侧边菜单项
export interface ISidebarMenuItem {

}
// 侧边菜单
export interface ISidebarMenu {

}