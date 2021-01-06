import { App } from 'vue';
import Slider from './src/index.vue';
(Slider as any).install = (app: App): void => {
    app.component(Slider.name, Slider);
};

export default Slider;

