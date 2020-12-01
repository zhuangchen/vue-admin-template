import { createApp } from 'vue';
import elementComponents from '@/components/element';
import router from '@/router';
import App from './App.vue';
import store from '@/store';

/*样式层 */
import '@/style/index.scss';       // 全部样式导入，包含element-ui
import '@/vender/iconfont';        // symbol方式的图标引用,详见 https://www.iconfont.cn/
const app = createApp(App);
elementComponents.forEach((component) => {
    app.use(component as any);
});
app.use(store).use(router);
app.mount('#app');
