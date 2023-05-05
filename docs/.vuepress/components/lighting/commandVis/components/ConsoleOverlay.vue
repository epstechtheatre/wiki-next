<template>
    <object class="lighting_key_svg_graphic" type="image/svg+xml" name="Keyboard Graphic" :data="getUserGraphicPreference()"/>
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
        }
    },

    methods: {
        getUserGraphicPreference: () => {
            return getSvgPathForPreference();
        }
    }
}
</script>

<style scoped>

.lighting_key_svg_graphic {
    position: absolute;
    display: flex;
    top: 120%;

    z-index: 9999;

    pointer-events: none;
    max-width: 450px;
    background-color: var(--backgroundColour);
    border-radius: 15px;
    border: 1px ridge var(--shade-1);
    width: max-content;
    height: max-content;
    padding: 15px;
    overflow: visible;
    box-shadow: 1px 1px rgba(0,0,0,0.5);
}

@media (max-width: 450px) {
    .lighting_key_svg_graphic {
        max-width: 100vw
    }
}
</style>