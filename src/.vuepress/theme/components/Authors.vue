<template>
    <div class="authors inner">
        <p v-if="$page.frontmatter.authors">
            The following individuals helped write this page:
            <span class="author" v-for="author in $page.frontmatter.authors" :key="author">
                {{author}}
            </span>
        </p>
    </div>
</template>

<style lang="stylus" scoped>
@require '../styles/wrapper.styl'

.authors {
    @extend $wrapper
    padding-right: 2.5rem;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: smaller;
}

.copyright-logo {
    width: 20vw;
    max-width: 350px;
}
</style>