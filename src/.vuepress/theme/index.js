const path = require('path')

/**
 * @type {import('@vuepress/types').Theme<import('@vuepress/types').DefaultThemeConfig>}
 */
module.exports = (options, ctx) => {
  const { themeConfig, siteConfig } = ctx

  // resolve algolia
  const isAlgoliaSearch = (
    themeConfig.algolia
    || Object
        .keys(siteConfig.locales && themeConfig.locales || {})
        .some(base => themeConfig.locales[base].algolia)
  )

  const enableSmoothScroll = themeConfig.smoothScroll === true

  return {
    alias () {
      return {
        '@AlgoliaSearchBox': isAlgoliaSearch
          ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
          : path.resolve(__dirname, 'noopModule.js')
      }
    },

    plugins: [
      ['@vuepress/active-header-links', options.activeHeaderLinks],
      '@vuepress/search',
      '@vuepress/plugin-nprogress',
      ['container', {
        type: 'tip',
        defaultTitle: "Tip",
        before: info => `<v-alert border="left" colored-border elevation='2' dense type='success' class='custom-block'><div class='custom-block-title'>${info}</div>`,
        after: () => `</v-alert>`
      }],
      ['container', {
        type: 'warning',
        defaultTitle: "Warning",
        before: info => `<v-alert border="left" colored-border elevation='2' dense type='warning' class='custom-block'><div class='custom-block-title'>${info}</div>`,
        after: () => `</v-alert>`
      }],
      ['container', {
        type: 'danger',
        defaultTitle: "Danger",
        before: info => `<v-alert border="left" colored-border elevation='2' dense type='error' class='custom-block'><div class='custom-block-title'>${info}</div>`,
        after: () => `</v-alert>`
      }],
      ['container', {
        type: 'info',
        defaultTitle: "Info",
        before: info => `<v-alert border="left" colored-border elevation='2' dense type='info' class='custom-block'><div class='custom-block-title'>${info}</div>`,
        after: () => `</v-alert>`
      }],
      ['container', {
        type: 'details',
        before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
        after: () => '</details>\n'
      }],
      ['smooth-scroll', enableSmoothScroll]
    ]
  }
}