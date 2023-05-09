<template>
    <Segment
        :card-elevation="2"
        :card-color="colour"
        :text="keyName"
        :inline="normalizeBoolean(inline)"
        @mouseover="hover($event, true)"
        @mouseleave="hover($event, false)"

        :class="$style.lightingKey + ' ' + (hovering ? $style.hovering : undefined)"  
    />
    <template v-if="!partOfCommand">
        <!-- Add in the console overlay if and only if this key isn't part of a command (cause the LightingCommand.vue component handles the overlay displaying) -->
        <ConsoleOverlay
            :activator="activator"
            :key-name="keyName"
            :revert-to-softkey="isSoftkey"
    
            v-if="hovering"
        />
    </template>
</template>

<script lang="ts">
export interface KeyHoveringEventSchema {
    hoverTarget: Element|undefined //undefined if not hovering
    keyName: string|string[]
    isSoftkey: boolean
}

import Segment from "./components/Segment.vue";
import * as boolean from "../../../util/boolean"
import ConsoleOverlay from "./components/ConsoleOverlay.vue";
import { stylizeKeyName } from "../../..//util/lighting/formatters";

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
        keyName: function (): string {
            if (this.keyName?.length > 0) return stylizeKeyName(this.keyName);

            if (
                this.$slots?.default &&
                this.$slots?.default[0]?.text && 
                this.$slots.default[0]?.text?.length > 0
            ) return stylizeKeyName(this.$slots.default[0]?.text);

            return "Invalid Key Name!";
        },
        isSoftkey() {
            return this.keyName.startsWith("{") && this.keyName.endsWith("}");
        }
    },
    data() {
        return {
            hovering: false,

            activator: undefined as Element|undefined
        };
    },
    methods: {
        normalizeBoolean(val: string|boolean) { return boolean.normalizeBooleanIsh(val);},


        hover(event: Event, newState: boolean) {
            this.hovering = newState;

            if (newState) {
                this.activator = event.target as Element;
            } else {
                this.activator = undefined;
            }

            if (this.partOfCommand) {
                this.$emit("hoverUpdate", {
                    hoverTarget: newState ? event.target : undefined,
                    keyName: this.keyName,
                    isSoftkey: this.isSoftkey
                } as KeyHoveringEventSchema)
            }
        }
    },
    emits: [
        "hoverUpdate"
    ]
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