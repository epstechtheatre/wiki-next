<template>
    <Segment
        :card-elevation="2"
        :card-color="colour"
        :text="stylize(keyName)"
        :inline="normalizeBoolean(inline)"
        :card-loading="hover"
        style="min-width: 52px;"
        @mouseover="hover=true"
        @mouseleave="hover=false"
    />
</template>

<script lang="ts">
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
        partOfCommand: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Segment
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
            hover: false
        };
    },
    methods: {
        stylize: (keyName: string): string => {
            return keyName.replace("{","").replace("}","");
        },
        normalizeBoolean(val: string|boolean) { return boolean.normalizeBooleanIsh(val);}
    }
}
</script>