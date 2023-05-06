<template>
    <object ref="svgElement" class="lighting_key_svg_graphic" type="image/svg+xml" name="Keyboard Graphic" :data="getUserGraphicPreference()" @load="loaded"/>
</template>

<script lang="ts">
import keyAliases from "../../../../json/lighting_key_name_alias.json";
import {getSvgPathForPreference} from "../../../../util/lighting/lightingBoardCookieWrapper"
export default {
    props: {
        keyName: [String, Array<String>], //Name of the key(s) to show
        revertToSoftkey: { //If a hardkey isn't found, show the positions of the softkeys instead
            type: Boolean,
            default: true
        },
        activatorX: Number,
        activatorY: Number
    },

    methods: {
        getUserGraphicPreference: () => {
            return getSvgPathForPreference();
        },
        loaded() {
            this.setBackgroundColour()
        },
        /**
         * Set the background colour (to support dark-mode)
         */
        setBackgroundColour() {
            //Get the CSS variables
            const style = getComputedStyle(document.body);

            //Set the overall background
            if (this.$refs.svgElement) {
                (this.$refs.svgElement as HTMLIFrameElement).contentDocument!.documentElement.style.backgroundColor = `${style.getPropertyValue("--c-bg")}`;
            }

            //Set the background for each individual button

            //Set the colour of the fill lines
        }
    },
    watch: {
        '$vuetify.theme.name'(newVal) {
            const style = getComputedStyle(document.body);
            if (this.$refs.svgElement) {
                (this.$refs.svgElement as HTMLIFrameElement).contentDocument!.documentElement.style.backgroundColor = `${style.getPropertyValue("--c-bg")}`;
            }
        }
    }
}
</script>

<style scoped>

.lighting_key_svg_graphic {
    position: absolute;
    display: flex;
    z-index: 10;

    pointer-events: none;
    max-width: 450px;
    background-color: rgb(var(--v-theme-background)) !important;
    border-radius: 15px;
    padding: 15px;
    overflow: visible;
    box-shadow: 1px 1px rgba(0,0,0,0.5);
}

@media (max-width: 959px) {
    .lighting_key_svg_graphic {
        max-width: 85vw
    }
}
</style>