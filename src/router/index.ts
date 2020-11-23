import {createRouter, createWebHashHistory} from 'vue-router';
import commonRoutes from './common';
// router instance
let router = createRouter({
    history: createWebHashHistory(),
    routes: commonRoutes,
});
// router guard
router.beforeEach((_to, _from,next) => {
    next();
});
router.afterEach(() => {
});
export default router;