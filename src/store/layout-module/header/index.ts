import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {ISidebarMenuItem, ITopMenuItem} from '@/model/menu';
import { generateTopMemus } from './generate';
const Types = {
    SET_TOP_MENUS: 'SET_TOP_MENUS',
    SET_CURRENT_TOP_MENU_ITEM: 'SET_CURRENT_TOP_MENU_ITEM',
    SET_CURRENT_TOP_MENU_ITEM_KEY: 'SET_CURRENT_TOP_MENU_ITEM_KEY'
};
interface IHeaderState {
    currentTopMenuItemKey: string    // 当前选中顶部菜单项唯一值
    currentTopMenuItem: ITopMenuItem | null  // 当前选中菜单项对象
    topMenus: ITopMenuItem[]   // 顶部菜单
}
const state: IHeaderState = {
    currentTopMenuItemKey: '',
    currentTopMenuItem: null,
    topMenus: []
};
const getters: GetterTree<IHeaderState, any> = {
    getCurrentTopMenuItem(state): ITopMenuItem | null {
        return state.currentTopMenuItem;
    },
    getCurrentTopMenuItemKey(state): string {
        return state.currentTopMenuItemKey;
    },
    getTopMenus(state): ITopMenuItem[] {
        return state.topMenus;
    }
};
const mutations: MutationTree<IHeaderState> = {
    [Types.SET_TOP_MENUS](state, topMenus: ITopMenuItem[]) {
        state.topMenus = topMenus;
    },
    [Types.SET_CURRENT_TOP_MENU_ITEM](state, currentTopMenuItem: ITopMenuItem) {
        state.currentTopMenuItem = currentTopMenuItem;
    },
    [Types.SET_CURRENT_TOP_MENU_ITEM_KEY](state, currentTopMenuItemKey: string) {
        state.currentTopMenuItemKey = currentTopMenuItemKey;
    }
};
const actions: ActionTree<IHeaderState, any> = {
    setCurrentTopMenuItem(context, currentTopMenuItem: ITopMenuItem): Promise<ITopMenuItem> {
        return new Promise((resolve) => {
            context.commit(Types.SET_CURRENT_TOP_MENU_ITEM, currentTopMenuItem);
            resolve(currentTopMenuItem);
        });
    },
    setCurrentTopMenuItemKey(context, currentTopMenuItemKey: string): Promise<string> {
        return new Promise((resolve) => {
            context.commit(Types.SET_CURRENT_TOP_MENU_ITEM_KEY, currentTopMenuItemKey);
            resolve(currentTopMenuItemKey);
        });
    },
    setTopMenus(context, menus: ISidebarMenuItem[]): Promise<ITopMenuItem[]> {
        return new Promise((resolve) => {
            const topMenus = generateTopMemus(menus);
            context.commit(Types.SET_TOP_MENUS, topMenus);
            resolve(topMenus);
        });
    }
};
export default {
    state,
    actions,
    mutations,
    getters
};
