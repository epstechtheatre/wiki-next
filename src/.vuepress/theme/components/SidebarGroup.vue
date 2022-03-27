<template>
  <v-list-group v-if='item.children'>
    <template v-slot:activator>
      <v-list-item-title>{{item.title}}</v-list-item-title>
    </template>  

    <v-list-item 
      v-for='child in item.children'
      :key='child.title'      
      :to="child.path"
      link
      active
    >
      <v-list-item-content>
        <v-list-item-title>
          {{ child.title }}
        </v-list-item-title>
      </v-list-item-content> 
    </v-list-item>

  </v-list-group>
</template>

<script>
import { isActive } from '../util'
import DropdownTransition from '../components/DropdownTransition.vue'

export default {
  name: 'SidebarGroup',

  components: {
    DropdownTransition
  },

  props: [
    'item',
    'open',
    'collapsable',
    'depth'
  ],

  // ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  beforeCreate () {
    this.$options.components.SidebarLinks = require('../components/SidebarLinks.vue').default
  },

  methods: { isActive }
}
</script>

<style lang="stylus">
// .sidebar-group
//   .sidebar-group
//     padding-left 0.5em
//   &:not(.collapsable)
//     .sidebar-heading:not(.clickable)
//       cursor auto
//       color inherit
//   // refine styles of nested sidebar groups
//   &.is-sub-group
//     padding-left 0
//     & > .sidebar-heading
//       font-size 0.95em
//       line-height 1.4
//       font-weight normal
//       padding-left 2rem
//       &:not(.clickable)
//         opacity 0.5
//     & > .sidebar-group-items
//       padding-left 1rem
//       & > li > .sidebar-link
//         font-size: 0.95em;
//         border-left none
//   &.depth-2
//     & > .sidebar-heading
//       border-left none

// .sidebar-heading
//   color var(--textColor)
//   transition color .15s ease
//   cursor pointer
//   font-size 1.1em
//   font-weight bold
//   // text-transform uppercase
//   padding 0.35rem 1.5rem 0.35rem 1.25rem
//   width 100%
//   box-sizing border-box
//   margin 0
//   border-left 0.25rem solid transparent
//   &.open, &:hover
//     color inherit
//   .arrow
//     position relative
//     top -0.12em
//     left 0.5em
//   &.clickable
//     &.active
//       font-weight 600
//       color $accentColor
//       border-left-color var(--accentColor)
//     &:hover
//       color var(--accentColor)

// .sidebar-group-items
//   transition height .1s ease-out
//   font-size 0.95em
//   overflow hidden
</style>
