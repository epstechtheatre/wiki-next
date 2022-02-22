<template lang="html">
    <div class="page-tag-wrapper">
        Tags:
        <router-link
        v-for="tag in $page.frontmatter.tags"
        :key="tag"
        :to="{ path: `/tags.html#${tag}`}">
        {{tag}}
        </router-link>
    </div>
</template>

<style scoped lang="stylus">
@require '../styles/wrapper.styl'

.page-tag-wrapper {
    @extend $wrapper
    padding-top: 5px;
    padding-bottom: 5px;
}
</style>