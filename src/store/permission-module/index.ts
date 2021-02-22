import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {RouteRecordRaw} from 'vue-router';
import {ISidebarMenuItem} from '@/model/menu';
const HomeView = () => import('@/views/common/Home.vue');
import {
    addPrefixSlashForUrl,
    removePrefixSlashForUrl
} from '@/utils';
import {asyncRouterMap} from '@/router/common';
interface IPermissionState {
    asyncRoute: RouteRecordRaw | null,
}
// 所有有路径的菜单
const allHasUrlMenus:  ISidebarMenuItem[]= [];

// 过滤所有有路径的菜单
const filterHasUrlMenus = (menus: ISidebarMenuItem[]) => {
    menus.forEach(n => {
        if(n.url){
            allHasUrlMenus.push(n);
        }
        if(n.subMenu && n.subMenu.length >0) {
            filterHasUrlMenus(n.subMenu);
        }
    });
};
const Types = {
    SET_ASYNC_ROUTE: 'SET_ASYNC_ROUTE'
};
const state:  IPermissionState = {
    asyncRoute: null
};
const getters: GetterTree<IPermissionState, any> = {  
    getAsyncRoute(state) {
        return state.asyncRoute;
    }
};
const actions: ActionTree<IPermissionState, any> = {
    generateRoutes(context, menus: ISidebarMenuItem[]):Promise<RouteRecordRaw>{
        return new Promise((resolve) => {
            filterHasUrlMenus(menus);
            const routeRecordRaws = allHasUrlMenus.map( n => {
                return {
                    path: addPrefixSlashForUrl(n.url?? ''),
                    name: removePrefixSlashForUrl(n.url?? ''),
                    component: HomeView
                };
            });
            if(asyncRouterMap){
                asyncRouterMap.children = routeRecordRaws;
            }
            context.commit(Types.SET_ASYNC_ROUTE, asyncRouterMap);
            resolve(asyncRouterMap);
        });
    }
};
const mutations: MutationTree<IPermissionState> = {
    [Types.SET_ASYNC_ROUTE](state, asyncRoute: RouteRecordRaw): void {
        state.asyncRoute = asyncRoute;
    }
};
export default {
    state,
    actions,
    mutations,
    getters
};
