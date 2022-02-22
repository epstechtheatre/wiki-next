<template>
    <div 
        class="lighting_command_key lighting_command_component"
        :class="{softkey: isSoftkey(keyName), hardkey: !isSoftkey(keyName), inline: inline == 'true'}"
        v-on:mouseover="hover=true"
        v-on:mouseleave="hover=false"
        :keyName="keyName"
    >
        <span :keyName="keyName">{{stylize(keyName)}}</span>
        <Transition 
            name="fade"
            mode="out-in"
            v-if="hover==true"
        >
            <keep-alive>
                <Lighting-Key-Overlay :keyName="keyName" :revertToSoftkey="(isSoftkey(keyName) == true).toString()"/>
            </keep-alive>
        </Transition>

        <pre class="hide"><slot></slot></pre>
    </div>
</template>

<script lang="ts">
import LightingKeyOverlay from "./Lighting/LightingKeyOverlay.vue";
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
    computed: {
        keyName: function (): string {
            //@ts-ignore
            if (this.$props.name?.length > 0) return this.$props.name;
            //@ts-ignore
            if (this.$slots?.default[0]?.text && this.$slots.default[0]?.text?.length > 0) return this.$slots.default[0]?.text;

            return "Invalid Key";
        }
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
        z-index: 2;
        display: inline-flex;
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

    pre.hide {
        display: none;
    }
</style>