import {ActionTree, GetterTree, MutationTree} from 'vuex';
const Types = {
    SET_GUIDE_STATUS: 'SET_GUIDE_STATUS',
    SET_SIDEBAR_STATUS: 'SET_SIDEBAR_STATUS'
};
const state: IUI = {
    isCollapseSidebar: false
};
const getters: GetterTree<IUI, any> = {
    getSidebarStatus(state): boolean { return state.isCollapseSidebar; }
};
const mutations: MutationTree<IUI> = {
    [Types.SET_SIDEBAR_STATUS](state, status: boolean) {
        state.isCollapseSidebar = status;
    }
};
const actions: ActionTree<IUI, any> = {
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
