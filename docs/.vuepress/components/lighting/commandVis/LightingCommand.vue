<template>
    <VCard
        :class="normalizeBoolean(inline) ? $style.inline : undefined"
        elevation="2"
    >
        <VContainer fluid>
            <VRow
                align-content="center"
                justify="start"
            >
                <template v-for="(item, index) in parseCommand()">
                    <LightingKey v-if="typeof(item) === 'string'" 
                        :keyName="item" 
                        :inline="normalizeBoolean(inline)" 
                        :partOfCommand="true"
                    />
                    <SimultaneousGroup v-else 
                        :keyNames="(item as Array<String>)" 
                        :separator="displayedSimultaneousSeparator" 
                        :inline="normalizeBoolean(inline)"
                    />

                    <SegmentSeparator v-if="index < parseCommand().length -1" 
                        :separator="displayedSequentialSeparator"
                        :inline="normalizeBoolean(inline)"
                    />
                </template>
            </VRow>
        </VContainer>
        <span v-if="(normalizeBoolean(showTip) || normalizeBoolean(showLegend)) && !normalizeBoolean(inline)">
            <VChip v-if="normalizeBoolean(showTip)"
                variant="text"
                color="green-darken-3"
                prepend-icon="mdi-checkbox-marked-outline"
                text="Tip: Hover over a button to see where it is on the keyboard"
            />
            <VChip v-if="normalizeBoolean(showLegend)"
                variant="text"
                style="justify-self: end;"
                prepend-icon="mdi-information-box-outline"
                color="blue-darken-2"
            >
                <p>Legend:
                    <span class="text-cyan-darken-3">■</span> Hardkeys
                    <span class="text-blue-grey-darken-3">■</span> Softkeys
                </p>
            </VChip>
        </span>
    </VCard>

    <ConsoleOverlay/>
</template>

<script lang="ts">
const INPUT_SEQUENTIAL_SEPARATORS = "\," //regex
const INPUT_SIMULTANEOUS_SEPARATORS = "\+\&"


import SimultaneousGroup from "./components/SimultaneousGroup.vue";
import SegmentSeparator from "./components/SegmentSeparator.vue";
import LightingKey from "./LightingKey.vue";
import ConsoleOverlay from "./components/ConsoleOverlay.vue"
import * as boolean from "../../../util/boolean";

export default {
    props: {
        command: {
            type: String,
            default: "Use the 'command' prop to configure this component"
        },
        inline: {
            type: [String, Boolean],
            default: false,
            validator: (val: string|boolean) => {
                return boolean.isBooleanIsh(val)
            }
        },
        showLegend: {
            type: [String, Boolean],
            default: false,
            validator: (val: string|boolean) => {
                return boolean.isBooleanIsh(val)
            }
        },
        showTip: {
            type: [String, Boolean],
            default: false,
            validator: (val: string|boolean) => {
                return boolean.isBooleanIsh(val);
            }
        },
        displayedSequentialSeparator: {
            type: String,
            default: "▶",
            validator: (val: string) => {
                return typeof(val) === "string"
            }
        },
        displayedSimultaneousSeparator: {
            type: String,
            default: "+",
            validator: (val: string) => {
                return typeof(val) === "string";
            }
        }
    },
    methods: {
        normalizeBoolean(val: string|boolean) { return boolean.normalizeBooleanIsh(val);},

        parseCommand(): Array<String|Array<String>> {
            const output: Array<String|Array<String>> = [];

            const sequentialMatcher = new RegExp(`[${INPUT_SEQUENTIAL_SEPARATORS}]`);
            const simultaneousMatcher = new RegExp(`[${INPUT_SIMULTANEOUS_SEPARATORS}]`);

            const sequentialMatches = this.command.split(sequentialMatcher);

            sequentialMatches.forEach(match => {
                const simultaneousMatches = match.split(simultaneousMatcher);
                if (simultaneousMatches.length > 1) {
                    output.push(simultaneousMatches.map((item) => item.trim()))
                } else {
                    output.push(match.trim());
                }
            })

            return output;
        }
    },

    components: { LightingKey, SegmentSeparator, SimultaneousGroup },
}
</script>

<style module>
.inline {
    display: inline-flex;
}
</style>