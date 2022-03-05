<template>
    <v-card 
        class="lighting_command_simultaneous_group lighting_command_component"
        :class="{inline: inline=='true'}"
        elevation="2"
        outlined
    >
        <span v-for="item in keys" :key="item[0]">
            <Lighting-Key :name="item[1]" :inline="inline"/>
            <Lighting-Key-Separator v-if="item[0] < keys.length - 1" :isSimultaneous="true" :asWordMode='asWordMode'/>
        </span>
    </v-card>
</template>

<script lang="ts">
import LightingKeySeparator from "./LightingKeySeparator.vue";
import LightingKey from "../LightingKey.vue";

export default {
    props: {
        keys: {
            type: Array,
            default: []
        },
        asWordMode: {
            type: String,
            default: undefined,
            validator: (val: string) => {
                return val == "both" || val == "simultaneousKeys" || val == "normalKeys" || val === undefined
            }
        },
        inline: {
            type: String,
            default: 'false',
            validator: (val: string) => {
                return val == "true" || val == "false"
            }
        }
    },
    components: {
        LightingKeySeparator: LightingKeySeparator,
        LightingKey: LightingKey
    }
}
</script>

<style scoped>
    .lighting_command_simultaneous_group {
        /* background-color: grey; */
        border-radius: 5px;
        border-style: solid;
        border-width: 1px;
        padding: 4px;

        display: flex;
        justify-items: center;
    }

    .lighting_command_simultaneous_group > span {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .lighting_command_simultaneous_group.inline {
        /* background-color: grey; */
        padding: 1.5px;
    }
</style>