//Allows .vue scripts to import other .vue files with proper typings
// declare module "*.vue" {
//     import Vue from 'vue'
//     export default Vue
// }

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}