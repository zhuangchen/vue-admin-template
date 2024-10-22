import layout from '@/components/layout/layout.vue';
const NotFoundView = () => import('@/views/common/404.vue');
const HomeView = () => import('@/views/common/Home.vue');
const NoAuthorityView = () => import('@/views/common/403.vue');
const ServiceErrorView = () => import('@/views/common/500.vue');
import {RouteRecordRaw} from 'vue-router';
const constantRoutes = [
    { 
        path: '', 
        redirect: '/home',
        component: layout,
        children: [
            {
                name: 'Home',
                path: '/home',
                component: HomeView
            }
        ] 
    },
    { path: '/404', name: 'NotFound', component: NotFoundView },
    { path: '/500', name: 'ServiceError', component: ServiceErrorView },
    { path: '/403', name: 'NoAuthority', component: NoAuthorityView }
];
const asyncRouterMap: RouteRecordRaw = 
    { 
        path: '', 
        component: layout,
        children: [
        ] 
    };
export  {
    constantRoutes,
    asyncRouterMap
};
