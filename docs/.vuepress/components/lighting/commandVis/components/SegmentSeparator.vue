<template>
    <Segment
        :text="separator"
        :inline="inline"
        card-variant="text"
    />
</template>

<script lang="ts">
import Segment from './Segment.vue';
export default {
    props: {
        separator: String,
        inline: Boolean
    },
    components: {Segment}
}
</script>