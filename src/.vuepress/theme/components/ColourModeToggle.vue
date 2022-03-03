<template>
    <ClientOnly>
        <DarkMode @change-mode="changeHandler">
            <template v-slot="{ mode }">
            Color mode: {{ mode }}
            </template>
        </DarkMode>
    </ClientOnly>
</template>

<script lang="ts">
export default {
    methods: {
        changeHandler(mode){
            const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            switch (mode) {
                case "dark":
                    //@ts-ignore
                    this.$root.$vuetify.theme.dark = true;
                    break;
                case "light":
                    //@ts-ignore
                    this.$vuetify.theme.dark = false;
                    break;

                case "system":
                    //@ts-ignore
                    if (systemDark) return this.changeHandler("dark");
                    
                    return this.changeHandler("light");

            }
        }
    }
}
</script>

<style>

</style>
