// 用户信息接口模拟数据
import {  ISidebarMenuItem} from '@/model/menu';
import {  IUser, ISubSystem} from '@/model/user';

// 模拟子系统信息
const mockMenuSubSystems: ISubSystem[] = [
    {
        appName: '子应用1',
        appId: 'app-1',
        appHost: '//localhost:8081',
        appRegRule: '/app1'
    },
    {
        appName: '子应用2',
        appId: 'app-2',
        appHost: '//localhost:8082',
        appRegRule: '/app2'
    }
];
// 模拟菜单
const mockMenus: ISidebarMenuItem[] = [
    {
        id: '1',
        name: '顶部菜单-1',
        icon: '',
        subMenu: [
            {
                id: '1-1',
                name: '子应用2-主页',
                url: '/app2/home',
                icon: 'el-icon-location' 
            }
        ]
    },
    {
        id: '2',
        name: '顶部菜单-2',
        icon: '',
        subMenu: [
            {
                id: '2-1',
                name: '子应用1-主页',
                url: '/app1/home',
                icon: 'el-icon-document' 
            }
        ]
    }
];
const mockUserState: IUser = {
    subSystems: mockMenuSubSystems,
    avatar: 'https://avatars.githubusercontent.com/u/17979210?s=60&v=4',
    fullName: '庄晨',
    nickname: '调试用户',
    department: '研发三部',
    menus: mockMenus,
    permissions: ['all_authority']
};
export const userResponseData: Ajax.AjaxResponse = {
    message: '操作成功',
    result: mockUserState,
    status: true,
    statusCode: 'SYS000',
    total: 0
};
