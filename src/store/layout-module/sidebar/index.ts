import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {ISidebarMenuItem} from '@/model/menu';
const Types = {
    SET_CACHE_SIDEBAR_MENUS: 'SET_CACHE_SIDEBAR_MENUS',
    SET_CURRENT_SIDEBAR_MENUS: 'SET_CURRENT_SIDEBAR_MENUS',
    SET_CURRENT_SIDEBAR_MENU_ITEM: 'SET_CURRENT_SIDEBAR_MENU_ITEM',
    SET_CURRENT_SIDEBAR_MENU_ITEM_KEY: 'SET_CURRENT_SIDEBAR_MENU_ITEM_KEY'
};
interface ISidebarState {
    cacheSidebarMenus:  ISidebarMenuItem[]  // 缓存的侧边菜单数据
    currentSidebarMenus: ISidebarMenuItem[] // 当前菜单
    currentSidebarMenuItem: ISidebarMenuItem | null // 当前激活的侧边菜单对象
    currentSidebarMenuItemKey: string // 当前激活的侧边菜单对象唯一值
}
const state: ISidebarState = {
    cacheSidebarMenus: [],
    currentSidebarMenus: [],
    currentSidebarMenuItem: null,
    currentSidebarMenuItemKey: ''
};
const getters: GetterTree<ISidebarState, any> = {
    getCacheSidebarMenus(state): ISidebarMenuItem[] {
        return state.cacheSidebarMenus;
    },
    getCurrentSidebarMenus(state): ISidebarMenuItem[] {
        return state.currentSidebarMenus;
    },
    getCurrentSidebarMenuItem(state): ISidebarMenuItem | null {
        return state.currentSidebarMenuItem;
    },
    getCurrentSidebarMenuItemKey(state): string {
        return state.currentSidebarMenuItemKey;
    }
};
const mutations: MutationTree<ISidebarState> = {
    [Types.SET_CACHE_SIDEBAR_MENUS](state, cacheSidebarMenus: ISidebarMenuItem[]) {
        state.cacheSidebarMenus = cacheSidebarMenus;
    },
    [Types.SET_CURRENT_SIDEBAR_MENUS](state, currentSidebarMenus: ISidebarMenuItem[]) {
        state.currentSidebarMenus = currentSidebarMenus;
    },
    [Types.SET_CURRENT_SIDEBAR_MENU_ITEM](state, currentSidebarMenuItem: ISidebarMenuItem | null) {
        state.currentSidebarMenuItem = currentSidebarMenuItem;
    },
    [Types.SET_CURRENT_SIDEBAR_MENU_ITEM_KEY](state, currentSidebarMenuItemKey: string) {
        state.currentSidebarMenuItemKey = currentSidebarMenuItemKey;
    }
};
const actions: ActionTree<ISidebarState, any> = {
    setCacheSidebarMenus(context, cacheSidebarMenus: ISidebarMenuItem[]): Promise<ISidebarMenuItem[]> {
        return new Promise((resolve) => {
            context.commit(Types.SET_CACHE_SIDEBAR_MENUS, cacheSidebarMenus);
            resolve(cacheSidebarMenus);   
        });
    },
    setCurrentSidebarMenus(context, currentSidebarMenus: ISidebarMenuItem[]): Promise<ISidebarMenuItem[]> {
        return new Promise((resolve) => {
            context.commit(Types.SET_CURRENT_SIDEBAR_MENUS, currentSidebarMenus);
            resolve(currentSidebarMenus);   
        });
    },
    setCurrentSidebarMenuItem(context, currentSidebarMenuItem: ISidebarMenuItem): Promise<ISidebarMenuItem> {
        return new Promise((resolve) => {
            context.commit(Types.SET_CURRENT_SIDEBAR_MENU_ITEM, currentSidebarMenuItem);
            resolve(currentSidebarMenuItem);   
        });
    },
    setCurrentSidebarMenuItemKey(context, currentSidebarMenuItemKey: string): Promise<string> {
        return new Promise((resolve) => {
            context.commit(Types.SET_CURRENT_SIDEBAR_MENU_ITEM_KEY, currentSidebarMenuItemKey);
            resolve(currentSidebarMenuItemKey);   
        });
    }
};
export default {
    state,
    actions,
    mutations,
    getters
};
