<template>
    <div 
        class="lighting_command_key_separator lighting_command_component"
        :class="{simultaneous: (isSimultaneous == 'true' || isSimultaneous == true)}"
    >
    <span>&nbsp;{{getSeparator(isSimultaneous, asWordMode)}}&nbsp;</span>
    </div>
</template>

<script lang="ts">
const separatorString = "▶"
const separatorAsWordString = "then"
const simultaneousSeparatorString = "&"
const simultaneousWordSeparatorString = "and"

export default {
    props: {
        isSimultaneous: {
            type: Boolean,
            default: false
        },
        asWordMode: {
            type: String,
            default: undefined,
            validator: (val: string) => {
                return val == "both" || val == "simultaneousKeys" || val == "normalKeys" || val === undefined
            }
        }
    },

    methods: {
        getSeparator: (isSimultaneous: boolean, asWordMode?:'simultaneousKeys'|'normalKeys'|'both') => {
            if (!isSimultaneous) {
                if (asWordMode == "both" || asWordMode == "normalKeys") {
                    return separatorAsWordString
                } else {
                    return separatorString
                }
            } else {
                if (asWordMode == "both" || asWordMode == "simultaneousKeys") {
                    return simultaneousWordSeparatorString;
                } else {
                    return simultaneousSeparatorString
                }
            }
        }
    }
}
</script>

<style scoped>
    .lighting_command_key_separator {
        cursor: default;
    }
</style>