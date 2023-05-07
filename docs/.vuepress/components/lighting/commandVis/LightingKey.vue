<template>
    <Segment
        :card-elevation="2"
        :card-color="colour"
        :text="stylize(keyName)"
        :inline="normalizeBoolean(inline)"
        :card-loading="hovering"
        @mouseover="hover($event, true)"
        @mouseleave="hover($event, false)"

        :class="$style.lightingKey + ' ' + (hovering ? $style.hovering : undefined)"  
    />
</template>

<script lang="ts">
export interface KeyHoveringEventSchema extends TargetComponentInfoSchema {
    isHovering: boolean
    keyName: string
}

import ConsoleOverlay, {TargetComponentInfoSchema} from "./components/ConsoleOverlay.vue"
import Segment from "./components/Segment.vue";
import * as boolean from "../../../util/boolean"

const LIGHT_HARDKEY_COLOUR = "cyan-darken-3";
const DARK_HARDKEY_COLOUR = "cyan-darken-4";

const LIGHT_SOFTKEY_COLOUR = "blue-grey-darken-1";
const DARK_SOFTKEY_COLOUR = "blue-grey-darken-4";

export default {
    props: {
        keyName: {
            type: String,
            default: "Use the 'name' prop to configure this component"
        },
        inline: { //In line in sentence
            type: [String, Boolean],
            default: true,
            validator: (val: string|boolean) => {
                return boolean.isBooleanIsh(val);
            }
        },
        partOfCommand: { //If true, disables the command overlay on this component as all keys in a single command share an overlay
            type: Boolean,
            default: false
        }
    },
    components: {
        Segment,
        ConsoleOverlay
    },
    computed: {
        colour(): string {
            if (this.$vuetify.theme.current.dark) {
                if (this.isSoftkey) {
                    return DARK_SOFTKEY_COLOUR
                } else {
                    return DARK_HARDKEY_COLOUR
                }
            } else {
                if (this.isSoftkey) {
                    return LIGHT_SOFTKEY_COLOUR
                } else {
                    return LIGHT_HARDKEY_COLOUR
                }
            }
        },
        key: function (): string {
            //@ts-ignore
            if (this.$props.keyName?.length > 0) return this.$props.keyName;
            //@ts-ignore
            if (this.$slots?.default[0]?.text && this.$slots.default[0]?.text?.length > 0) return this.$slots.default[0]?.text;

            return "Invalid Key";
        },
        isSoftkey() {
            return this.keyName.startsWith("{") && this.keyName.endsWith("}");
        }
    },
    data() {
        return {
            hovering: false
        };
    },
    methods: {
        stylize: (keyName: string): string => {
            return keyName.replace("{","").replace("}","");
        },
        normalizeBoolean(val: string|boolean) { return boolean.normalizeBooleanIsh(val);},


        hover(event: Event, newState: boolean) {
            const bounds = (event.target as Element).getBoundingClientRect();

            this.hovering = newState;
            this.$emit("hovering", {
                isHovering: newState,
                clientBounds: {
                    x: bounds.x,
                    y: bounds.y,
                    height: bounds.height,
                    width: bounds.width
                },
                keyName: this.stylize(this.keyName)
            } as KeyHoveringEventSchema)
        },
    }
}
</script>

<style module>
.lightingKey {
    min-width: 52px;
    transition: transform 0.2s ease-out;
}
.hovering {
    transform: translateY(5px);
}
</style>