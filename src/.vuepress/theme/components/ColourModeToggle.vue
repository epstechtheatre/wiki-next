<template>
    <v-btn v-on:click="modeChange" aria-label="Toggle Colour Mode">
        <v-icon v-if="themeMode=='light'" center aria->mdi-weather-sunny</v-icon>
        <v-icon v-else-if="themeMode=='dark'" center>mdi-weather-night</v-icon>
        <v-icon v-else center>mdi-laptop</v-icon>
        <span class="colour-theme-name">{{themeMode}}</span>
    </v-btn>
</template>

<script lang="ts">
//@ts-nocheck
//Some parts adapted from https://github.com/discordjs/guide/blob/main/guide/.vuepress/theme/composables/useDarkMode.ts

const MediaQuery = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')

export default {
    data() {
        return {
            themeMode: "system",
            availableModes: ["light", "dark", "system"]
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

                case "system":
                    //@ts-ignore
                    if (systemDark) return this.changeHandler("dark");
                    
                    return this.changeHandler("light");

            }
        },

        updateDarkModeClass (value: boolean): void {
            // set `class="dark"` on `<html>` element
            const htmlEl = window?.document.querySelector(':root');
            if (value) {
                htmlEl?.classList.add('dark', value);
            } else {
                htmlEl?.classList.remove('dark', value);
            }

            localStorage.setItem('site-color-theme', this.themeMode);
        }
    },

    mounted(){
        //Check if saved value is for dark mode
		const savedTheme = localStorage.getItem('site-color-theme');
        switch(savedTheme) {
            case "light":
            case "dark":
            case "system":
                this.themeMode = savedTheme;
                break;
            default:
                this.themeMode = "system";
                break;
        }
        
        if (this.themeMode === "system") {
            if (MediaQuery.matches) {
                this.changeHandler("dark")
            } else {
                this.changeHandler("light")
            }
        } else {
            this.changeHandler(this.themeMode);
        }

        MediaQuery.addEventListener("change", (event: MediaQueryListEvent): void => {
            if (this.themeMode === "system") this.changeHandler(event.matches ? "dark": "light")
        });
    }
}

</script>

<style lang="stylus" scoped>
@media (max-width: $MQNarrow)
    .colour-theme-name
        display: none
</style>
