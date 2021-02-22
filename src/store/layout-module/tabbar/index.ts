import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {ITabItem} from '@/model/tabbar';
const Types = {
    SET_DEFAULT_VISITING_TABS: 'SET_DEFAULT_VISITING_TABS',
    SET_PRIMARY_VISITING_TABS: 'SET_PRIMARY_VISITING_TABS',
    SET_CURRENT_VISITING_TAB: 'SET_CURRENT_VISITING_TAB',
    SET_CURRENT_VISITING_TAB_KEY: 'SET_CURRENT_VISITING_TAB_KEY'
};
interface ITabbarState {
    defaultVisitingTabs: ITabItem[] // 默认tabs
    primaryVisitingTabs: ITabItem[] // 非默认打开的tabs
    currentVisitingTab: ITabItem | null  // 当前激活的tab
    currentVisitingTabKey: string // 当前激活的tabKey
}
const state: ITabbarState = {
    defaultVisitingTabs: [],
    primaryVisitingTabs: [],
    currentVisitingTab: null,
    currentVisitingTabKey: ''
};
const getters: GetterTree<ITabbarState, any> = {
    getDefaultVisitingTabs(state): ITabItem[] {
        return state.defaultVisitingTabs;
    },
    getPrimaryVisitingTabs(state): ITabItem[] {
        return state.primaryVisitingTabs;
    },
    getCurrentVisitingTab(state): ITabItem | null {
        return state.currentVisitingTab;
    },
    getCurrentVisitingTabKey(state): string {
        return state.currentVisitingTabKey;
    }
};
const mutations: MutationTree<ITabbarState> = {
    [Types.SET_DEFAULT_VISITING_TABS](state, defaultVisitingTabs: ITabItem[]) {
        state.defaultVisitingTabs = defaultVisitingTabs;
    },
    [Types.SET_PRIMARY_VISITING_TABS](state, primaryVisitingTabs: ITabItem[]) {
        state.primaryVisitingTabs = primaryVisitingTabs;
    },
    [Types.SET_CURRENT_VISITING_TAB](state, currentVisitingTab: ITabItem | null) {
        state.currentVisitingTab = currentVisitingTab;
    },
    [Types.SET_CURRENT_VISITING_TAB_KEY](state, currentVisitingTabKey: string) {
        state.currentVisitingTabKey = currentVisitingTabKey;
    }
};
const actions: ActionTree<ITabbarState, any> = {
    setDefaultVisitingTabs(context, defaultVisitingTabs: ITabItem[]): Promise<ITabItem[]> {
        return new Promise((resolve) => {
            context.commit(Types.SET_DEFAULT_VISITING_TABS, defaultVisitingTabs);
            resolve(defaultVisitingTabs);   
        });
    },
    setPrimaryVisitingTabs(context, primaryVisitingTabs: ITabItem[]): Promise<ITabItem[]> {
        return new Promise((resolve) => {
            context.commit(Types.SET_PRIMARY_VISITING_TABS, primaryVisitingTabs);
            resolve(primaryVisitingTabs);   
        });
    },
    setCurrentVisitingTab(context, currentVisitingTab: ITabItem): Promise<ITabItem> {
        return new Promise((resolve) => {
            context.commit(Types.SET_CURRENT_VISITING_TAB, currentVisitingTab);
            resolve(currentVisitingTab);   
        });
    },
    setCurrentVisitingTabKey(context, currentVisitingTabKey: string): Promise<string> {
        return new Promise((resolve) => {
            context.commit(Types.SET_CURRENT_VISITING_TAB_KEY, currentVisitingTabKey);
            resolve(currentVisitingTabKey);   
        });
    }
};
export default {
    state,
    actions,
    mutations,
    getters
};
