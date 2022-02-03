import path from "path"
import { defineConfig } from "vuepress/config";

export default defineConfig({
    /**
    * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: 'EPS Technical Theatre Wiki',
    /**
      * Ref：https://v1.vuepress.vuejs.org/config/#description
      */
    description: "testing",

    /**
      * Extra tags to be injected to the page HTML `<head>`
      *
      * ref：https://v1.vuepress.vuejs.org/config/#head
      */
    head: [
		['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
    ],

    /**
      * Theme configuration, here is the default theme configuration for VuePress.
      *
      * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
      */
    // theme: "./theme/index.ts",
    themeConfig: {
        repo: 'epstechtheatre/tech-wiki',
        editLinks: true,
        docsDir: '',
        editLinkText: '',
        lastUpdated: true,
        nav: [
            {
            text: 'Guide',
            link: '/guide/',
            },
            {
            text: 'Config',
            link: '/config/'
            }
        ],
        sidebar: {
            '/guide/': [
            {
                title: 'Guide',
                collapsable: true,
                children: [
                '',
                'using-vue',
                "level0",
                "level1"
                ]
            }
            ],
        }
    },

    /**
      * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
      */
    plugins: [
        '@vuepress/plugin-back-to-top',
        '@vuepress/plugin-medium-zoom',
        "@vuepress/plugin-pwa",
        "@vuepress/plugin-last-updated",
        "@vuepress/plugin-active-header-links",
        "vuepress-plugin-typescript",
        "redirect",
        "@vuepress/client",
        "@vuepress/plugin-container",
        ["@vuepress/plugin-search", {searchMaxSuggestions: 10}],
    ]
})
