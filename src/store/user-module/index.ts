import {ActionTree, GetterTree, MutationTree, Module} from 'vuex';
const Types = {
  SET_AVATOR: 'SET_AVATOR',
  SET_FULLNAME: 'SET_FULLNAME',
  SET_DEPARTMENT: 'SET_DEPARTMENT',
  SET_MENUS: 'SET_MENUS',
  SET_PERMISSIONS: 'SET_PERMISSIONS',
};
const state: IUser = {
  avatar: '',
  fullName: '',
  nickname: '',
  department: '',
  menus: [],
  permissions: []
};
const getters: GetterTree<IUser, any> = {
  getOperationPermission(state) {
    return state.permissions;
  },
  getMenus(state) {
    return state.menus;
  },
  getUserInfo(state) {
    return state;
  },
};
const actions: ActionTree<IUser, any> = {
  setMenus(context){
    context.commit(Types.SET_MENUS, []);
  }
};
const mutations: MutationTree<IUser> = {
  [Types.SET_PERMISSIONS](state, permissions): void {
    state.permissions = permissions;
  },
  [Types.SET_AVATOR](state, avatar): void {
    state.avatar = avatar;
  },
  [Types.SET_FULLNAME](state, fullName): void {
    state.fullName = fullName;
  },
  [Types.SET_MENUS](state, menus): void {
    state.menus = menus;
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
