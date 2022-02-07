<template>
    <object class="lighting_key_svg_graphic" type="image/svg+xml" name="Keyboard Graphic" :data="getUserGraphicPreference()"/>
</template>

<script lang="ts">
export default {
    props: {
        keyName: String
    },

    methods: {
        getUserGraphicPreference: () => {
            return "/images/svg/keyboard-overlay-source-element-ii.svg"
        }
    }
}

</script>

<style scoped>
.lighting_key_svg_graphic {
    position: absolute;
    top: 120%;

    pointer-events: none;
    max-width: 450px; 
    z-index: 300;
    background-color: #f5f5f5d0;
    border-radius: 15px;
    border: 1px ridge #BEBEBE;
    width: max-content;
    height: max-content;
    padding: 15px;
    overflow: visible;
    box-shadow: 1px 1px rgba(0,0,0,0.5);
}
</style>