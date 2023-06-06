import { defineClientConfig } from "@vuepress/client";

import '@mdi/font/css/materialdesignicons.css';
import "vuetify/styles";
import { createVuetify } from 'vuetify';
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { createPinia } from "pinia";

import Layout from "./layouts/Layout.vue";

export default defineClientConfig({
    enhance({app, router, siteData}) {
        const vuetify = createVuetify({
            ssr: true,
            components,
            directives,
            theme: {
                defaultTheme: "dark",
                themes: {
                    "dark": {
                        variables: {
                            "theme-background": "#22272e",
                            "theme-on-background": "#adbac7"
                        }
                    }
                }
            }
        })

        const pinia = createPinia();

        app.use(vuetify).use(pinia);
    },

    layouts: {
        Layout
    }
})