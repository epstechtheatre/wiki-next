<template>
    <div 
        class="lighting_command_key_separator lighting_command_component"
        :class="{simultaneous: (isSimultaneous == 'true' || isSimultaneous == true)}"
    >
    <span>{{getSeparator(isSimultaneous, asWordMode)}}&nbsp;</span>
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
                return val == "both" || val == "simultaneous" || val == "ordered" || val === undefined
            }
        }
    },

    methods: {
        getSeparator: (isSimultaneous: boolean, asWordMode?:'simultaneous'|'ordered'|'both') => {
            if (!isSimultaneous) {
                if (asWordMode == "both" || asWordMode == "ordered") {
                    return separatorAsWordString
                } else {
                    return separatorString
                }
            } else {
                if (asWordMode == "both" || asWordMode == "simultaneous") {
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