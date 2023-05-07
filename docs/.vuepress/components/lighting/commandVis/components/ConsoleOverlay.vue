<template>
    <object 
        ref="svgElement" 
        class="lighting_key_svg_graphic" 
        type="image/svg+xml" 
        name="Keyboard Graphic" 
        :data="getUserGraphicPreference()" 
        @load="loaded"
        :style="'left:' + getXPos + '!important;right:' + getYPos + '!important;'"
    />
</template>

<script lang="ts">
export interface TargetComponentInfoSchema {
    clientBounds: {
        x: number, //left
        y: number, //top
        width: number,
        height: number
    }
}

import { VueElement } from "vue";
import keyAliases from "../../../../json/lighting_key_name_alias.json";
import {getSvgPathForPreference} from "../../../../util/lighting/lightingBoardCookieWrapper"
export default {
    computed: {
        getXPos() {
            debugger;
            return this.activatorBounds?.clientBounds.x ?? 0;
        },
        getYPos() {
            return this.activatorBounds?.clientBounds.y ?? 0;
        }
    },
    props: {
        keyName: [String, Array<String>], //Name of the key(s) to show
        revertToSoftkey: { //If a hardkey isn't found, show the positions of the softkeys instead
            type: Boolean,
            default: true
        },
        activatorBounds: {
            type: Object as ()=>TargetComponentInfoSchema
        }
    },

    methods: {
        getUserGraphicPreference: () => {
            return getSvgPathForPreference();
        },
        loaded() {
            this.setBackgroundColour();
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

            //FIXME svgs need to be redone to use transparent backgrounds and classes for a bunch of stuff
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
    position: fixed;
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