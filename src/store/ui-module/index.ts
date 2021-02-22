import {ActionTree, GetterTree, MutationTree} from 'vuex';
interface IUIState {
    isCollapseSidebar: boolean // 侧边栏是否折叠 
}
const Types = {
    SET_GUIDE_STATUS: 'SET_GUIDE_STATUS',
    SET_SIDEBAR_STATUS: 'SET_SIDEBAR_STATUS'
};
const state: IUIState = {
    isCollapseSidebar: false
};
const getters: GetterTree<IUIState, any> = {
    getSidebarStatus(state): boolean { return state.isCollapseSidebar; }
};
const mutations: MutationTree<IUIState> = {
    [Types.SET_SIDEBAR_STATUS](state, status: boolean) {
        state.isCollapseSidebar = status;
    }
};
const actions: ActionTree<IUIState, any> = {
    setSidebarStatus(context, status: boolean): Promise<any> {
        return new Promise((resolve) => {
            context.commit(Types.SET_SIDEBAR_STATUS, status);
            resolve(status);
        });
    }
};
export default {
    state,
    actions,
    mutations,
    getters
};
