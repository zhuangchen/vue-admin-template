import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {IUser} from '@/model/user';
import {fetchUserInfo} from '@/api';
const Types = {
    SET_SUBSYSTEMS: 'SET_SUBSYSTEMS',
    SET_AVATOR: 'SET_AVATOR',
    SET_FULLNAME: 'SET_FULLNAME',
    SET_DEPARTMENT: 'SET_DEPARTMENT',
    SET_MENUS: 'SET_MENUS',
    SET_PERMISSIONS: 'SET_PERMISSIONS'
};
const state: IUser = {
    avatar: '',
    fullName: '',
    nickname: '',
    department: '',
    menus: [],
    permissions: [],
    subSystems: []
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
    }
};
const actions: ActionTree<IUser, any> = {
    getUserInfo(context): Promise<string | IUser> {
        return new Promise((resolve, reject) => {
            fetchUserInfo().then(
                res => {
                    context.commit(Types.SET_AVATOR, res.avatar);
                    context.commit(Types.SET_FULLNAME, res.fullName);
                    context.commit(Types.SET_SUBSYSTEMS, res.subSystems);
                    context.commit(Types.SET_MENUS, res.menus);
                    context.commit(Types.SET_PERMISSIONS, res.permissions);
                    resolve(res);
                },
                () => {
                    context.commit('SET_PERMISSIONS', ['permission_error']);
                    const MSG = '请求用户信息失败';
                    reject(MSG);
                }
            ).catch(() => {
                context.commit('SET_PERMISSIONS', ['permission_error']);
                const MSG = '请求用户信息失败';
                reject(MSG);
            });
        });
    },
    setMenus(context){
        context.commit(Types.SET_MENUS, []);
    }
};
const mutations: MutationTree<IUser> = {
    [Types.SET_PERMISSIONS](state, permissions: string[]): void {
        state.permissions = permissions;
    },
    [Types.SET_SUBSYSTEMS](state, subSystems): void {
        state.subSystems = subSystems;
    },
    [Types.SET_AVATOR](state, avatar: string): void {
        state.avatar = avatar;
    },
    [Types.SET_FULLNAME](state, fullName: string): void {
        state.fullName = fullName;
    },
    [Types.SET_MENUS](state, menus): void {
        state.menus = menus;
    }
};
export default {
    state,
    actions,
    mutations,
    getters
};
