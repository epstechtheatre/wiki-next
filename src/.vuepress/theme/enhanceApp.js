import '../../../node_modules/material-design-icons-iconfont/dist/material-design-icons.css';
import "../../../node_modules/vuetify/dist/vuetify.css";
import '../../../node_modules/@mdi/font/css/materialdesignicons.css';
import TestingThing from "./components/TestingThing.vue";
import Vuetify from 'vuetify';

export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData // site metadata
}) => {
    // ...apply enhancements to the app
    Vue.use(Vuetify)
    options.vuetify = new Vuetify({
        icons: {
            iconfont: 'mdi'
        }
    });
    Vue.component("TestingThing", TestingThing);
}