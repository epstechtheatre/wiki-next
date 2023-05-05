<template>
    <VBtn 
        v-on:click="modeChange" 
        aria-label="Toggle Colour Mode" 
        :prepend-icon="iconOnly ? undefined : iconCode" 
        :text="iconOnly ? undefined : themeMode"
        :icon="iconOnly ? iconCode : undefined"
        location="right center"
    />
</template>

<script lang="ts">
//Some parts adapted from https://github.com/discordjs/guide/blob/main/guide/.vuepress/theme/composables/useDarkMode.ts

import { useTheme } from "vuetify";

const DARK_ICON_CODE = "mdi-weather-night";
const LIGHT_ICON_CODE = 'mdi-white-balance-sunny';
const AUTO_ICON_CODE = "mdi-monitor";

export default {
    setup() {
        const theme = useTheme();

        return {
            theme
        }
    },
    computed: {
        iconOnly() { return this.$vuetify.display.smAndDown; },
        iconCode() {
            switch(this.themeMode) {
                case "light":
                    return LIGHT_ICON_CODE;
                case "dark":
                    return DARK_ICON_CODE;
                default:
                    return AUTO_ICON_CODE;
            }
        }
    },
    data() {
        return {
            themeMode: "auto",
            availableModes: ["light", "dark", "auto"]
        }
    },
    methods: {
        modeChange(){
            let currentThemeIndex = this.availableModes.indexOf(this.themeMode);
            currentThemeIndex += 1;
            if (currentThemeIndex == this.availableModes.length) currentThemeIndex = 0;
            this.themeMode = this.availableModes[currentThemeIndex];

            this.changeHandler(this.themeMode);
        },

        changeHandler(mode){
            const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            switch (mode) {
                case "dark":
                    //@ts-ignore
                    this.$root.$vuetify.theme.dark = true;
                    this.updateDarkModeClass(true);
                    break;
                case "light":
                    //@ts-ignore
                    this.$vuetify.theme.dark = false;
                    this.updateDarkModeClass(false);
                    break;

                case "auto":
                    //@ts-ignore
                    if (systemDark) return this.changeHandler("dark");
                    
                    return this.changeHandler("light");

            }
        },

        updateDarkModeClass (value: boolean): void {
            // set `class="dark"` on `<html>` element

            const htmlEl = window?.document.querySelector(':root');
            if (value) {
                htmlEl?.classList.add('dark');
                this.theme.global.name.value = "dark";

            } else {
                htmlEl?.classList.remove('dark');
                this.theme.global.name.value = "light";
            }

            localStorage.setItem('vuepress-color-scheme', this.themeMode);
        }
    },

    mounted(){
        const MediaQuery = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')

        //Check if saved value is for dark mode
		const savedTheme = localStorage.getItem('vuepress-color-scheme');
        switch(savedTheme) {
            case "light":
            case "dark":
            case "auto":
                this.themeMode = savedTheme;
                break;
            default:
                this.themeMode = "auto";
                break;
        }
        
        if (this.themeMode === "auto") {
            if (MediaQuery.matches) {
                this.changeHandler("dark")
            } else {
                this.changeHandler("light")
            }
        } else {
            this.changeHandler(this.themeMode);
        }

        MediaQuery.addEventListener("change", (event: MediaQueryListEvent): void => {
            if (this.themeMode === "auto") this.changeHandler(event.matches ? "dark": "light")
        });
    }
}

</script>