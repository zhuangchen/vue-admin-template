const NotFoundView = () => import('@/views/common/404.vue');
const HomeView = () => import('@/views/common/Home.vue');
const NoAuthorityView = () => import('@/views/common/403.vue');
const ServiceErrorView = () => import('@/views/common/500.vue');
const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/404', name: 'NotFound', component: NotFoundView },
    { path: '/500', name: 'ServiceError', component: ServiceErrorView },
    { path: '/403', name: 'NoAuthority', component: NoAuthorityView },
    { path: '/:catchAll(.*)', redirect: '/404'}
  ];
  export default routes;