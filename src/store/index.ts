import {createStore, createLogger} from 'vuex';
import layout from './layout-module';
import user from './user-module';
import ui from './ui-module';
const debug = process.env.NODE_ENV === 'development';
const store = createStore({
  modules: {
    user,
    ui,
    layout
  },
  strict: debug,
  plugins: debug ? [createLogger({})] : [],
});
export default store;
