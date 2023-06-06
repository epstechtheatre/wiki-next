import { defaultTheme, defineUserConfig, viteBundler } from "vuepress"
import {registerComponentsPlugin} from "@vuepress/plugin-register-components";
import path from "path"

export default defineUserConfig({
    title: "EPS Tech Theatre Wiki",
    description: "Tech Theatre Wiki",
    lang: "en-CA",
    head: [
        ["meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
        }]
    ],

    theme: defaultTheme(),
    alias: {
        "@theme/ToggleColorModeButton.vue": path.resolve(__dirname, "./components/ColourModeToggle.vue")
    },
    plugins: [
        registerComponentsPlugin({
            components: {
                LightingCommand: path.resolve(__dirname, "./components/lighting/commandVis/LightingCommand.vue"),
                LightingKey: path.resolve(__dirname, "./components/lighting/commandVis/LightingKey.vue")
            }
        })
    ],
    bundler: viteBundler({
        viteOptions: {
            ssr: {
                noExternal: ["vuetify"]
            }
        }
    })
})