import fs from "fs";
import path from "path";
import lodash from "lodash";
const {capitalize} = lodash;

export default {
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
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],

        ['link', { rel: 'stylesheet', href: `https://fonts.googleapis.com/css?family=Material+Icons` }],
    ],

    /**
      * Theme configuration, here is the default theme configuration for VuePress.
      *
      * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
      */
    // theme: "./theme/index.ts",
    themeConfig: {
        repo: 'epstechtheatre/wiki-next',
        editLinks: true,
        docsDir: 'src',
        editLinkText: '',
        lastUpdated: true,
        smoothScroll: true,
        sidebarDepth: 3,
        nav: [
            {
            text: 'Guides',
            items: [
              {text: "Lighting", link: "/lighting/"}
            ]
            }
        ],
        sidebar: {
          "/lighting/": getSideBar("lighting", "Lighting")
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
        "@vuepress/plugin-container",
        ["@vuepress/plugin-search", {searchMaxSuggestions: 10}],
        getLightingCommandContainerConfig(),
        getCollapsibleConfig(),
        getCollapsibleItemConfig()
    ]
}

function getSideBar(folder, title) {
  const validExtension = [".md"];

  //Deal with top level file
  const files = fs
    .readdirSync(path.join(`${__dirname}/../${folder}`))
    .filter(
      (item) =>
        item.toLowerCase() != "readme.md" &&
        fs.statSync(path.join(`${__dirname}/../${folder}`, item)).isFile() &&
        validExtension.includes(path.extname(item))
    );

  //Deal with nested folders
  const rootFileGroup = {
    title: title,
    children: ["", ...files]
  }

  const folders = fs
    .readdirSync(path.join(`${__dirname}/../${folder}`))
    .filter(
      (item) =>
        fs.statSync(path.join(`${__dirname}/../${folder}`, item)).isDirectory()
    );

  if (folders.length > 0) {
    console.log(folders)
    const folderGroups = folders.map(subFolder => parseFolder(folder, subFolder, validExtension));
    
    console.log(rootFileGroup, ...folderGroups)
    return [rootFileGroup, ...folderGroups];
  }
  
  console.log(rootFileGroup)
  return [rootFileGroup];
}

/**
 * @param {String} rootFolder
 * @param {String} folder 
 * @param {String[]} validExtension
 */
function parseFolder(rootFolder, folder, validExtension) {
  console.log(rootFolder);
  console.log(folder)
  const subFiles = fs
    .readdirSync(path.join(`${__dirname}/../${rootFolder}/${folder}`))
    .filter(
      (item) =>
        item.toLowerCase() != "readme.md" &&
        fs.statSync(path.join(`${__dirname}/../${rootFolder}/${folder}`, item)).isFile() &&
        validExtension.includes(path.extname(item))
    )
    .map(item => `/${rootFolder}/${folder}/` + item);

  if (fs.existsSync(`/${rootFolder}/${folder}/README.md`)) {
    return {title: capitalize(folder), children: [`/${rootFolder}/${folder}`, ...subFiles]}
  } else {
    return {title: capitalize(folder), children: subFiles}
  }
}






function getLightingCommandContainerConfig() {
  const asWordSeparatorString = "asWordSeparators="
  const mapToAttributes = {
    tip: "showTip='true'",
    legend: "showLegend='true'",
    inline: "inline='true'",
    simultaneousKeyWordSeparators: asWordSeparatorString + "'simultaneousKeys'", //Double quotes are intentional (needed when pasted into html)
    normalKeyWordSeparators: asWordSeparatorString + "'normalKeys'",
  }

  return ['container', {
    type: 'command',
    before: info => {
      const properties = info.split(" ");
      if (properties.length == 0) {
        return "<LightingCommand>"
      } else {
        const resultingAttributes = [];
        for (const property of properties) {

          if (property == "simultaneousKeyWordSeparators" || property == "normalKeyWordSeparators") {
            if (resultingAttributes.find(item => item.startsWith("asWordSeparators=")) !== undefined) continue;

            if (properties.includes("simultaneousKeyWordSeparators") && properties.includes("normalKeyWordSeparators")) {
              resultingAttributes.push(asWordSeparatorString + "'both'")
            }
          } else {
            if (mapToAttributes[property]) {
              resultingAttributes.push(mapToAttributes[property])
            }
          }
        }

        if (resultingAttributes.length == 0) {
          return "<LightingCommand>"
        }

        return `<LightingCommand ${resultingAttributes.join(" ")}>`
      }
    },
    after: () => '</LightingCommand>\n'
  }]
}

function getCollapsibleConfig() {
  return ['container', {
    type: 'collapsible',
    before: info => {
      //TODO param checking
      return `<v-expansion-panels ${info}>`
    },
    after: () => '</v-expansion-panels>\n'
  }]
}

function getCollapsibleItemConfig() {
  return ['container', {
    type: 'collapsibleItem',
    before: info => {
      return `<v-expansion-panel>
      <v-expansion-panel-header>${info}</v-expansion-panel-header>
      <v-expansion-panel-content>`
    },
    after: () => '</v-expansion-panel-content></v-expansion-panel>\n'
  }]
}