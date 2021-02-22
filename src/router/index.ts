import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import {constantRoutes} from './common';
import store from '@/store';
import nprogress from 'nprogress';
// router instance
let router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
});
// router guard
router.beforeEach((_to, _from, next) => {
    nprogress.start();
    if(store.getters.getAsyncRoute || store.getters.getOperationPermission.includes('permission_error')){
        next();
    } else {
        store.dispatch('getUserInfo').then(res => {
            store.dispatch('setTopMenus', res.menus);
            store.dispatch('generateRoutes', res.menus).then(res => {
                // 添加异步路由
                router.addRoute(res);
                router.addRoute({ path: '/:catchAll(.*)', redirect: '/404'});
                next({ path: _to.fullPath });
            });
        }, ()=>{
            // 获取用户信息失败前往403
            router.addRoute({ path: '/:catchAll(.*)', redirect: '/404'});
            next({ path: '/403' });
        });
    }
});
router.afterEach(() => {
    nprogress.done();
});
export default router;