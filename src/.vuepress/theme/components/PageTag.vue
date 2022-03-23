<template lang="html">
    <router-link
        :to="{ path: `/tags.html?target=${tagText}`}">
        <v-chip label outlined ripple>
            <span class="page-tag-text">{{tagText.trim()}}</span>
        </v-chip>
    </router-link>
</template>

<script lang='ts'>
export default {
    props: ["tagText"]
}
</script>

<style scoped lang="stylus">
.page-tag-text
    color var(--textColour)

</style>