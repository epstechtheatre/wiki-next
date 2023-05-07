<template>
    <KeepAlive>
        <VFadeTransition>
            <ConsoleOverlay 
                v-if="currentHover.isHovering || true"
                :activatorBounds="currentHover"
            />
        </VFadeTransition>
    </KeepAlive>
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
                        @hovering="hoverHandler"
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
            <p class="text-green-darken-3" v-if="normalizeBoolean(showTip)" style="font-size: 90%;">
                <VIcon style="vertical-align: text-top;">mdi-checkbox-marked-outline</VIcon>
                Tip: Hover over a button to see where it is on the keyboard
            </p>

            <p class="text-blue-darken-2" v-if="normalizeBoolean(showLegend)" style="font-size: 90%;">
                <VIcon style="vertical-align: text-top;">mdi-information-box-outline</VIcon> Legend:
                <ul>
                    <li><span class="text-cyan-darken-3">■</span>: Hardkeys</li>
                    <li><span class="text-blue-grey-darken-3">■</span>: Softkeys</li>
                    <li><span class="inheritSurfaceColor">{{ displayedSequentialSeparator }}</span>: Press keys sequentially</li>
                    <li><span class="inheritSurfaceColor">{{ displayedSimultaneousSeparator }}</span>: Press keys simultaneously</li>
                </ul>
            </p>
        </span>
    </VCard>
</template>

<script lang="ts">
const INPUT_SEQUENTIAL_SEPARATORS = "\," //regex
const INPUT_SIMULTANEOUS_SEPARATORS = "\+\&"


import SimultaneousGroup from "./components/SimultaneousGroup.vue";
import SegmentSeparator from "./components/SegmentSeparator.vue";
import LightingKey, { KeyHoveringEventSchema } from "./LightingKey.vue";
import ConsoleOverlay, { TargetComponentInfoSchema } from "./components/ConsoleOverlay.vue"
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
        },
        hoverHandler(newHoverState: KeyHoveringEventSchema) {

            //Type it out so pass-by-reference is preserved
            this.currentHover.isHovering = newHoverState.isHovering;
            this.currentHover.clientBounds.x = newHoverState.clientBounds.x;
            this.currentHover.clientBounds.y = newHoverState.clientBounds.y;
            this.currentHover.clientBounds.width = newHoverState.clientBounds.width;
            this.currentHover.clientBounds.height = newHoverState.clientBounds.height;
        }
    },
    data() {
        return {
            currentHover: {
                isHovering: false,
                clientBounds: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                },
                keyName: ""
            } as KeyHoveringEventSchema
        }
    },

    components: { LightingKey, SegmentSeparator, SimultaneousGroup, ConsoleOverlay },
}
</script>

<style module>
.inline {
    display: inline-flex;
}
</style>

<style scoped>
.inheritSurfaceColor {
    color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity)) !important
}
</style>