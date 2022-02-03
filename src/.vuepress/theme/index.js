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
      "@vuepress/client",
      ['container', {
        type: 'tip',
        defaultTitle: "TIP"
      }],
      ['container', {
        type: 'warning',
        defaultTitle: "WARNING"
      }],
      ['container', {
        type: 'danger',
        defaultTitle: "DANGER"
      }],
      ['container', {
        type: 'details',
        before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
        after: () => '</details>\n'
      }],

      ['container', {
        type: "command",
      }],

      ['smooth-scroll', enableSmoothScroll]
    ]
  }
}
