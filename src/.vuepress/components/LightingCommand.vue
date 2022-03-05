<template>
    <v-card 
        class="lighting_command_block"
        :class="{ 'inline': inline == 'true' }"
        elevation="2"
    >
        <div class="lighting_command">
            <span v-for="item in getIndexedCommandArray(elementCommand)" :key='item[0]'>
                <span v-if="item[1].includes('&')">
                    <Lighting-Key-Simultaneous-Group :keys='splitIndexedSimultaneousCommandsArray(item[1])' :asWordMode='asWordSeparators' :inline="inline"/>
                    <Lighting-Key-Separator v-if="item[0] < getIndexedCommandArray(elementCommand).length - 1" :asWordMode="asWordSeparators"/>
                </span>
                <span v-else>
                    <Lighting-Key :name='item[1]' :inline="inline"/>
                    <Lighting-Key-Separator v-if="item[0] < getIndexedCommandArray(elementCommand).length - 1" :asWordMode="asWordSeparators"/>
                </span>
            </span>
        </div>
        
        <div v-if="inline == 'false' && showTip == 'true'" class="lighting_command_tip">
            <div class="custom-block tip">
                <div class="custom-block-title">Tip</div>
                <p>Hover over a key to see where it is located on the keyboard</p>
            </div>
        </div>
        <div v-if="inline == 'false' && showLegend == 'true'">
            <div class="custom-block warning">
                <div class="custom-block-title">Legend</div>
                <p>Hover over a key to see where it is located on the keyboard</p>
            </div>
        </div>
        <pre class="hide"><slot></slot></pre>
    </v-card>
</template>


<script lang="ts">

import LightingKeySimultaneousGroup from "./Lighting/LightingKeySimultaneousGroup.vue";
import LightingKeySeparator from "./Lighting/LightingKeySeparator.vue";
import LightingKey from "./LightingKey.vue";

export default {
    props: {
        inline: {
            type: String,
            default: 'false',
            validator: (val: string) => {
                return val == "true" || val == "false"
            }
        },
        command: String,
        showLegend: {
            type: String,
            default: 'false',
            validator: (val: string) => {
                return val == "true" || val == "false"
            }
        },
        showTip: {
            type: String,
            default: 'false',
            validator: (val: string) => {
                return val == "true" || val == "false"
            }
        },
        asWordSeparators: {
            type: String,
            default: undefined,
            validator: (val: string) => {
                return val == "both" || val == "simultaneousKeys" || val == "normalKeys" || val === undefined
            }
        }
    },

    components: { LightingKey, LightingKeySeparator, LightingKeySimultaneousGroup },

    computed: {
        elementCommand: function (): string {

            //@ts-ignore
            if (this.$props.command?.length > 0) return this.$props.command;
            //@ts-ignore
            if (this.$slots?.default[0]?.children[0] && this.$slots.default[0]?.children[0]?.text?.length > 0) return this.$slots.default[0]?.children[0]?.text;

            return "Invalid Command"
        }
    },
    
    methods: {
        getIndexedCommandArray: (command: string) => {
            const output = command.trim().split(",").map((item, index) => [index, item.trim()]);
            return output;
        },
        splitIndexedSimultaneousCommandsArray(commandSegment: string) {
            return commandSegment.trim().split("&").map((item, index) => [index, item.trim()]);
        }
    }
}
</script>

<style>
    /* .lighting_command_block {
        z-index: 2;
        display: block;
        border-radius: 5px;
        border-style: solid;
        border-width: 1px;
        padding: 15px;
        background-color: #f3f5f7;
    } */

    .lighting_command {
        user-select: contain;
        display: flex;
        flex-wrap: wrap;
        vertical-align: middle;
    }

    .lighting_command span {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
    }

    .lighting_command_component {
        display: inline-block;
    }

    .lighting_command_block.inline {
        display: inline-block;
        padding: 0px;
    }

    pre.hide {
        display: none;
    }
</style>