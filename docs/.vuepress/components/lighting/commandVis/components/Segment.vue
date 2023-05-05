<template>
    <VCard
        style="align-self: center;"
        :class="(inline ? $style.inline : undefined) + ' ' + $style.base"
        
        :elevation="cardElevation"
        :color=cardColor
        :variant="(cardVariant as any)" 
        :loading="cardLoading"
    >
        <VCardText 
            :class="inline ? $style.inline : undefined" 
            class="text-center"    
        >{{ text }}</VCardText>
    </VCard>
</template>

<script lang="ts">
export default {
    props: {
        text: String,
        inline: Boolean,
        
        //VCard Stuff
        cardVariant: String,
        cardElevation: Number,
        cardColor: String,
        cardLoading: Boolean
    }
}
</script>

<style module>
.base {
    align-self: center;
    height: 100%;
}
.inline {
    display: inline-flex;
    min-width: unset !important;
    padding: 1px;
    padding-left: 2px;
    padding-right: 2px;
}
</style>