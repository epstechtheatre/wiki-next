<template>
    <VCard 
        class="console_overlay_wrapper"
        :style="'left:' + getXPos + 'px;top:' + getYPos + 'px;'"
        density="compact"
        :class="!isLoaded ? 'console_overlay_hide' : ''"
        hover
    >
        <object 
            class="console_overlay_svg"
            ref="svgElement" 
            type="image/svg+xml" 
            name="Keyboard Graphic" 
            style="background-color: inherit;"
            :data="getUserGraphicPreference()" 
            @load="loaded"
        />
    </VCard>
</template>

<script lang="ts">
const KEY_HOVER_TRANSFORM_DISTANCE = 5; //When keys are hovered over, they move a little bit (this many pixels)
const KEY_HOVER_BUFFER_DISTANCE = 5; //Buffer between end of key component and start of this overlay


import keyAliases from "../../../../json/lighting_key_name_alias.json";
import {getSvgPathForPreference} from "../../../../util/lighting/lightingBoardCookieWrapper"
export default {
    computed: {
        getXPos() {
            //Try to center below the activator, but if not possible just do your best

            if (this.activator == undefined) return 0;
            //@ts-expect-error For some reason Vue not recognizing this.svgWidth as a property
            const trial = (this.activatorX + this.activatorWidth/2) - this.svgWidth/2;
            //If centering pushes one edge of the svg off the edge of the screen, don't do that and just center

            //https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
            const browserWidth = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

            if (trial < 0 || trial + this.svgWidth > browserWidth) {
                //Center in screen

                //@ts-expect-error For some reason Vue not recognizing this.svgWidth as a property
                return browserWidth/2 - this.svgWidth/2;
            } else {
                return trial;
            }
        },
        getYPos() {
            if (this.activator != undefined) {
                return this.activatorY+this.activatorHeight + KEY_HOVER_TRANSFORM_DISTANCE + KEY_HOVER_BUFFER_DISTANCE;
            }

            return 0;
        },
        activatorX() {
            return this.activator?.getBoundingClientRect().x ?? 0;
        },
        activatorY() {
            return this.activator?.getBoundingClientRect().y ?? 0;
        },
        activatorWidth() {
            return this.activator?.getBoundingClientRect().width ?? 0;
        },
        activatorHeight() {
            return this.activator?.getBoundingClientRect().height ?? 0;
        }
    },
    props: {
        keyName: [String, Array<String>], //Name of the key(s) to show
        revertToSoftkey: { //If a hardkey isn't found, show the positions of the softkeys instead
            type: Boolean,
            default: true
        },
        activator: Element
    },
    data() {
        return {
            svgWidth: 0,
            isLoaded: false
        }
    },
    created() {
        window.addEventListener("resize", this.resizeHandler);
    },
    unmounted() {
        window.removeEventListener("resize", this.resizeHandler);
        this.isLoaded = false;
    },

    methods: {
        getUserGraphicPreference: () => {
            return getSvgPathForPreference();
        },
        loaded() {
            this.setBackgroundColour();

            this.svgWidth = (this.$refs.svgElement as Element)?.clientWidth ?? 0

            this.isLoaded = true;

            this.highlightKey();
        },
        /**
         * Set the background colour (to support dark-mode)
         */
        setBackgroundColour() {
            if (this.$refs.svgElement) {
                const style = getComputedStyle(this.$refs.svgElement as Element);
                (this.$refs.svgElement as HTMLIFrameElement).contentDocument!.documentElement.style.backgroundColor = `rgb(${style.getPropertyValue("--v-theme-surface")})`;
                // (this.$refs.svgElement as HTMLIFrameElement).contentDocument!.documentElement.style.backgroundColor = `${style.getPropertyValue("--c-bg")}`;
            }

            //FIXME svgs need to be redone to use transparent backgrounds and classes for a bunch of stuff
        },
        resizeHandler() {
            this.svgWidth = (this.$refs.svgElement as Element).clientWidth;
        },
        highlightKey() {
            
        }
    },
    watch: {
        '$vuetify.theme.name'() {
            this.setBackgroundColour();
        }
    }
}
</script>

<style scoped>
.console_overlay_hide {
    opacity: 0;
}
.console_overlay_wrapper {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;

    overflow: visible;
    width: max-content;
    pointer-events: none;
    max-width: 450px;

    border-radius: 15px;

    padding: 15px !important;
    transition: opacity 0.1s linear, top 0.1s ease-out; 
    /* Top because sometimes if the user moves their cursor just off the activator the coordinates can be recalculated and cause the overlay to jump, transition makes it smoother */
}

.console_overlay_svg {
    max-width: 100%;
    overflow: visible;
    padding: 2px
}

@media (max-width: 959px) {
    .console_overlay_wrapper {
        max-width: 85vw !important;
    }
}


</style>