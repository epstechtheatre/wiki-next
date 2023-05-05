<template>
    <VCard
        :color='$vuetify.theme.current.dark ? "grey-darken-3" : "grey-lighten-2"'
    >
        <VCardText>
            <VRow>
                <template v-for="(item, index) in keyNames">
                    <LightingKey 
                        :key-name="item.valueOf()" 
                        :partOfCommand='true'
                        :inline="inline"
                    />

                    <SegmentSeparator v-if="index < keyNames.length -1"
                        :separator="separator"
                        :inline="inline"
                    />
                </template>
                </VRow>
        </VCardText>
    </VCard>
</template>

<script lang="ts">
import SegmentSeparator from "./SegmentSeparator.vue";
import LightingKey from "../LightingKey.vue";

export default {
    props: {
        keyNames: {
            type: Array<String>,
            default: []
        },
        inline: {
            type: Boolean,
            default: false
        },
        separator: String
    },
    components: {
        SegmentSeparator,
        LightingKey
    }
}
</script>