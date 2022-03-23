<template>
    <main class="page">
        <slot name="top" />
        <div class="page-header-navbar-spacer"/>
        <ClientOnly><LightingBoardPreferenceSelector v-if="$page.path.startsWith('/lighting')" class="lighting-board-preference-wrapper"/></ClientOnly>
        <Draft class="page-draft-warning" v-if="$page.frontmatter && $page.frontmatter.draft == true"/>
        <div class="page-title-content">
            <h1><span><v-icon v-if="$page.frontmatter.icon" aria-hidden="true" color="var(--textColour)">{{$page.frontmatter.icon}}</v-icon>{{$page.frontmatter.title}}</span></h1>
            <p class="page-displayed-metadata">
                <span v-if="$page.frontmatter.category !== undefined" class='page-category'><v-icon aria-label="Category" color="var(--textColour)">mdi-widgets</v-icon><v-chip label outlined><span class="page-category-text">{{$page.frontmatter.category}}</span></v-chip></span>
                <span v-if="$page.frontmatter.tags !== undefined && $page.frontmatter.tags.length > 0" class='page-tags'><v-icon aria-label="Tags" color="var(--textColour)">mdi-tag-multiple</v-icon><PageTag class="page-tag" :key="tag" v-for="tag in $page.frontmatter.tags" :tagText="tag"/></span>
            </p>
            <hr>
        </div>
        <Content :key="$page.path" class="theme-default-content"/>
        <Authors/>
        <PageEdit />

        <PageNav v-bind="{ sidebarItems }" />

        <slot name="bottom" />
        <Copyright />
    </main>
</template>

<script>
import PageEdit from './PageEdit.vue';
import PageNav from './PageNav.vue';
import Authors from "./Authors.vue";
import Copyright from "./Copyright.vue";
import PageTag from "./PageTag.vue";
import Draft from "./Draft.vue";
import LightingBoardPreferenceSelector from "./LightingBoardPreferenceSelector.vue";

export default {
    components: { PageEdit, PageNav, Authors, Copyright, PageTag, LightingBoardPreferenceSelector, Draft},
    props: ['sidebarItems'],

    beforeMount() {

    }
}

</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
    padding-bottom 2rem
    display block

.page-title-content {
    @extend $marginWrapper
    display: block

    .page-displayed-metadata {
        margin-bottom: 7px !important
    }

    .page-category {
        margin-right: 15px !important
        .page-category-text {
            color: var(--textColour)
        }
    }
}

.lighting-board-preference-wrapper
    @extend $marginWrapper
    display: block

.page-draft-warning
    @extend $marginWrapper
    display: block
    
.page-header-navbar-spacer
    height: $navbarHeight

.page-tag
    margin-right: 3px
</style>
