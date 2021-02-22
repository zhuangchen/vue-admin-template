import {ISidebarMenuItem, ITopMenuItem} from '@/model/menu';
// ISidebarMenuItem -> ITopMenuItem
// 处理用户菜单生成顶部菜单
const generateTopMemus = (menus: ISidebarMenuItem[]): ITopMenuItem[] => {
    return menus.map((n, index) => {
        return {
            key: `top-menu-item-${index}`,
            id: n.id,
            name: n.name,
            sidebarMenu: n.subMenu
        };
    });
};
export {
    generateTopMemus
};