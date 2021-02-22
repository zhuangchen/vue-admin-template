import {createStore, createLogger} from 'vuex';
import * as layout from './layout-module';
import user from './user-module';
import ui from './ui-module';
import permission from './permission-module';
const debug = process.env.NODE_ENV === 'development';
const store = createStore({
    modules: {
        user,
        ui,
        permission,
        ...layout
    },
    strict: debug,
    plugins: debug ? [createLogger({})] : []
});
export default store;
