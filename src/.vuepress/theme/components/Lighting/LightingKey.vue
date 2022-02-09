<template>
    <div 
        class="lighting_command_key lighting_command_component"
        :class="{softkey: isSoftkey(name), hardkey: !isSoftkey(name), inline: inline == 'true'}"
        v-on:mouseover="hover=true"
        v-on:mouseleave="hover=false"
        :keyName="name"
    >
        <span :keyName="name">{{stylize(name)}}</span>
        <Transition 
            name="fade"
            mode="out-in"
            v-if="hover==true"
        >
            <keep-alive>
                <Lighting-Key-Overlay :keyName="name"/>
            </keep-alive>
        </Transition>
    </div>
</template>

<script lang="ts">
import LightingKeyOverlay from "./LightingKeyOverlay.vue";
export default {
    props: {
        name: String,
        inline: {
            type: String||Boolean,
            default: 'true',
            validator: (val: string|boolean) => {
                return val == "true" || val == "false" || val==true || val==false
            }
        }
    },
    components: {
        LightingKeyOverlay: LightingKeyOverlay
    },
    data() {
        return {
            hover: false
        };
    },
    methods: {
        isSoftkey: (keyName: string): boolean => {
            return keyName.startsWith("{") && keyName.endsWith("}");
        },
        stylize: (keyName: string): string => {
            return keyName.replace("{","").replace("}","");
        }
    }
}
</script>

<style scoped>
    .lighting_command_key {   
        display: flex;
        justify-content: center;
        align-items: center;

        border: .1em solid #aaa;
        border-radius: 5px;
        padding: .1em .5em;
        background: linear-gradient(180deg, #fff, #fff, #fff, #ddd);
        /* user-select: none; */
        cursor: pointer;
        color: #000;
        /* font-weight: bold; */
        transition: 0.2s ease;
        
        min-width: 60px;
        max-width: 120px;
        min-height: 60px;
        text-align: center;
        vertical-align: middle;

        /* line-height: 52px; */
    }

    /* .lighting_command_key span {
    } */

    .lighting_command_key.inline {
        min-width: 30px;
        max-width: unset;
        height: 30px !important;
        min-height: 0px;
        text-align: center;
    }

    .lighting_command_key:hover {
        transform: translateY(2px);
    }
</style>