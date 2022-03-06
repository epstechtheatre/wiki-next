<template lang="html">
    <div class="page-tag-wrapper">
        Tags:
        <div class='page-tags'>
            <router-link
            v-for="tag in $page.frontmatter.tags"
            :class="['page-tag', getTagColourID(tag)]"
            :key="tag"
            :to="{ path: `/tags.html#${tag}`}">
            {{tag.trim()}}
            </router-link>
        </div>
    </div>
</template>

<script lang='ts'>
export default {
    methods: {
        getTagColourID(tag: string): string {
            //Ten possible colours, to get the id,
            //we take the sums of the ascii codes of the first 2 letters.
            //This is not made to any standard, it is subject to change.
            //Also, this is really superficial so it doesn't really matter.

            if (tag.length == 0) return `page-tag-0`; //TODO something better?

            if (tag.length == 1) {
                return `page-tag-${tag.charCodeAt(0) % 10}`
            }

            return `page-tag-${(tag.charCodeAt(0) + tag.charCodeAt(1)) % 10}`
        }
    }
}
</script>

<style scoped lang="stylus">
@require '../styles/wrapper.styl'

.page-tag-wrapper {
    @extend $wrapper
    padding-top: 5px;
    padding-bottom: 5px;
    display: inline-block
}

.page-tags {
    display: block
}
.page-tag {
    // word-wrap: break-word
    display: inline-block
    text-align: center
    margin: 3px
    border-style: solid
    padding: 3px
    border-width: 1px
    border-radius: 10px
    min-width: 40px

    &.page-tag-0{
        color: color-contrast(var(--color-purple) vs white, black)
        background-color: var(--color-red)
    }
    &.page-tag-1{
        color: color-contrast(var(--color-purple) vs white, black)
        background-color: var(--color-purple)
    }
    &.page-tag-2{
        color: color-contrast(var(--color-green) vs white, black)
        background-color: var(--color-green)
    }
    &.page-tag-3{
        color: color-contrast(var(--color-blue) vs white, black)
        background-color: var(--color-blue)
    }
    &.page-tag-4{
        color: color-contrast(var(--color-amber) vs white, black)
        background-color: var(--color-amber)
    }
    &.page-tag-5{
        color: color-contrast(var(--color-indigo) vs white, black)
        background-color: var(--color-indigo)
    }
    &.page-tag-6{
        color: color-contrast(var(--color-teal) vs white, black)
        background-color: var(--color-teal)
    }
    &.page-tag-7{
        color: color-contrast(var(--color-light-blue) vs white, black)
        background-color: var(--color-light-blue)
    }
    &.page-tag-8{
        color: color-contrast(var(--color-lime) vs white, black)
        background-color: var(--color-lime)
    }
    &.page-tag-9{
        color: color-contrast(var(--color-orange) vs white, black)
        background-color: var(--color-orange)
    }
}
</style>