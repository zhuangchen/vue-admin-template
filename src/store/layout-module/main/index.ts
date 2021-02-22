import {ActionTree, GetterTree, MutationTree} from 'vuex';
const Types = {
    CUT_VIEW_MODE: 'CUT_VIEW_MODE'  // 切换模式状态
};
type mode =
  | 'iframe' | 'router';
interface IMainState {
    viewMode: mode 
}
const state: IMainState = {
    viewMode: 'router'
};
const getters: GetterTree<IMainState, any> = {
    getViewMode(state): mode {
        return state.viewMode;
    }
};
const mutations: MutationTree<IMainState> = {
    [Types.CUT_VIEW_MODE](state, mode: mode) {
        state.viewMode = mode;
    }
};
const actions: ActionTree<IMainState, any> = {
    cutViewMode(context, mode: mode): Promise<mode> {
        return new Promise((resolve) => {
            if(mode !== state.viewMode){
                context.commit(Types.CUT_VIEW_MODE, mode);
                resolve(mode);
            }
        });
    }
};
export default {
    state,
    actions,
    mutations,
    getters
};
