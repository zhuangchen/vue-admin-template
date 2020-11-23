import { createApp } from 'vue';
import elementComponents from '@/components/element';
import router from '@/router';
import App from './App.vue';
import store from '@/store';
import '@/style/global.scss';
const app = createApp(App);
elementComponents.forEach((component) => {
    app.use(component as any);
});
app.use(store).use(router);
app.mount('#app');
