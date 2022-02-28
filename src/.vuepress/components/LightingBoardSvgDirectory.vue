<template>
    <object id="lighting_key_info_page_svg_directory" class="lighting_board_svg_directory" type="image/svg+xml" name="Keyboard Graphic" :data="boardPref"/>
</template>

<script lang="ts">
import UrlAndButtonNameMap from "../json/lighting_svg_button_map.json"; 
import {getSvgPathForPreference} from "../util/lighting/lightingBoardCookieWrapper"
import {getSvgShape} from "../util/svg_get_shape";
//Hardcoded links for shape ids. The id is that if the svg changes, hopefully the shape ids for buttons will remain consistent so this will inject correctly.
//For similar reason, this is why the links aren't directly in the svg (am i being smart?)
const activeColour = "#990033"
const returnColour = "#BF003F"

export default{
    data: () => {
        return {
            boardPref: getSvgPathForPreference()
        }
    },
    mounted(){
        //@ts-ignore
        this.$root.$on("lighting-board-preference-update", () => {
            //@ts-ignore
            this.boardPref = getSvgPathForPreference();

            document.getElementById("lighting_key_info_page_svg_directory")?.addEventListener("load", () => {
                produceLinks();
            })
        })

        document.getElementById("lighting_key_info_page_svg_directory")?.addEventListener("load", () => {
            produceLinks();
        })
    }
}

function produceLinks() {
    const display = (document.getElementById("lighting_key_info_page_svg_directory") as any).contentDocument.documentElement;

    for (const dict of UrlAndButtonNameMap) {
        for (const name of dict.names) {
            const element = display.getElementById(name)
            if (element !== null) {
                element.dataset.url = dict.url
                element.onclick = function(element) {window.location = element.target.dataset.url || element.target.parentElement.dataset.url;}

                getSvgShape(element).style = `fill:${returnColour};stroke:#000000;`;
                element.style.cursor = "pointer";
                element.onmouseenter = function (element) {
                    getSvgShape(element).style = `fill:${activeColour};transition:0.2s;stroke:#000000;`};
                element.onmouseleave = function (element) {
                    getSvgShape(element).style = `fill:${returnColour};transition:0.2s;stroke:#000000;`};
            }
        }
    }
}
</script>

<style scoped>
.lighting_board_svg_directory {
    width: 100%;
    padding-top: 10px;
}
</style>