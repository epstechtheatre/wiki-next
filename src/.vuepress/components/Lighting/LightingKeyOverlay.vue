<template>
    <object class="lighting_key_svg_graphic" type="image/svg+xml" name="Keyboard Graphic" :data="getUserGraphicPreference()"/>
</template>

<script lang="ts">
import keyAliases from "../../json/lighting_key_name_alias.json";

export default {
    props: {
        keyName: String,
        revertToSoftkey: {
            type: String,
            validator: (val: string) => {
                return val == "true" || val == "false" || val === undefined
            },
            default: 'true'
        }
    },

    methods: {
        getUserGraphicPreference: () => {
            //TODO, return cookie result instead
            return "/images/svg/keyboard-overlay-source-element-ii.svg";
        }
    },
    mounted() {
        let vm = this;

        //even using next tick, the position reads before whatever render function happens and moves it
        //so we need to deal with the case where the overlay displays off screen in an annoying way
        const elements = document.querySelectorAll(".lighting_key_svg_graphic") as NodeListOf<HTMLElement>;
        elements.forEach(element => {
            element.addEventListener("load", () => {
                const EDGE_BUFFER = 5

                let sidebarWidth = 0
                const sidebarElement = document.querySelector("aside.sidebar");
                if (sidebarElement) {
                    sidebarWidth = window.getComputedStyle(sidebarElement)?.transform !== "none" ? 0 : sidebarElement.scrollWidth
                }

                const smallScreenCorrection = element.scrollWidth >= window.screen.width - 1 - sidebarWidth

                if (smallScreenCorrection) {
                    element.style.maxWidth = "100vw";
                    element.addEventListener("transitionend", () => {
                        element.style.left = `${element.offsetLeft - (element.getBoundingClientRect().right - window.screen.width)}px`;
                    })
                } else {
                    if (element.getBoundingClientRect().right > window.screen.width ) {
                        element.style.left = `${element.offsetLeft - (element.getBoundingClientRect().right - window.screen.width) - EDGE_BUFFER}px`
                    } 

                    if (element.getBoundingClientRect().left < sidebarWidth) {
                        element.style.left = `${element.offsetLeft - (element.getBoundingClientRect().left) + EDGE_BUFFER + sidebarWidth}px`
                    } 
                }

                drawOnSvg(
                    (element as any).contentWindow.document.documentElement,
                    //@ts-ignore
                    vm.$props.keyName,
                    //@ts-ignore
                    vm.$props.revertToSoftkey == 'true',
                    getSimultaneousRoot(element)
                );
            })
        })
    }
}
function getSimultaneousRoot(keyElement: Element): Element|undefined {
    let output = keyElement.parentElement;
    while (!(output?.classList.contains("lighting_command_simultaneous_group"))) {
        if (output?.classList.contains("lighting_command_block") || !output) return undefined;
        output = output.parentElement;
    }

    return output;
}

function drawOnSvg(svg: Document, keyName: string, revertToSoftkey: boolean, simultaneousRoot?: Element): void {
    keyName = keyName.toString().replace(/({|}|[|]| )/g, "").toLowerCase()

    //Returns a string, or array of strings
    let searchElement = parseKeysToHighlight(keyName)
    let simultaneousHighlight: (string|string[])[] = [];

    //If the pageObj is a simultaneous key, we should highlight a bunch more stuff as well
    if (simultaneousRoot) {
        const simultaneousButtons = simultaneousRoot.querySelectorAll(".lighting_command_key");

        simultaneousButtons.forEach(button => {
            const buttonID = button.attributes.getNamedItem("keyname")!.nodeValue!.toString().replace(/({|}|[|]| )/g, "").toLowerCase();

            const additionSearch = parseKeysToHighlight(buttonID);

            simultaneousHighlight.push(additionSearch);
        })
    }

    //For all items that we found, highlight them in green on the svg
    if (Array.isArray(searchElement)) {
        for (let element of searchElement) {
            let targetKey = svg.getElementById(element)

            if (targetKey) {
                getSvgShape(targetKey).style = "fill:lime;stroke:#000000"
            }
        }
    } else {
        //Only 1 item to highlight
        let targetKey = svg.getElementById(searchElement)

        //If we can't find the key on the keyboard, it's probably a softkey, recursively call the function and highlight softkeys
        if (!targetKey && revertToSoftkey === true) {
            return drawOnSvg(svg, "softkey", revertToSoftkey, simultaneousRoot)
        } else {
            //Otherwise print as normal
            targetKey = svg.getElementById(searchElement)

            if (targetKey) {
                getSvgShape(targetKey).style = "fill:lime;stroke:#000000"
            }
        }
    }

    //If there are multiple keys in a simultaneous block, highlight them all using a stupid function
    if (simultaneousHighlight.length > 0) {
        let currentItemFound = false;
        let currentItemIndex = 0;
        let index = 0;

        for (let element of simultaneousHighlight) {
            //Highlight all previous items in blue, current item in green, and future items in gradient blue

            if (!Array.isArray(element)) element = [element]

            for (const item of element) {
                if (item === keyName) {
                    //The hovered key is coloured elsewhere, instead we will use it for are asymptotic offset
                    currentItemFound = true;
                    break;
                }

                let targetKey = svg.getElementById(item);

                if (targetKey) {
                    if (!currentItemFound) {
                        currentItemIndex += 1;
                    }
                    index += 1;

                    //Create colour - the closer it is to being the next key, the closer the colour is the min bound

                    const succeedingScale = [[0,255,255],[255,255,255]]  
                    //                        r, g , b     r , g , b
                    //                       [minBound  ,    MaxBound]

                    const red = simultaneousButtonColourGradient(succeedingScale[0][0], succeedingScale[1][0], currentItemIndex, index);
                    const green = simultaneousButtonColourGradient(succeedingScale[0][1], succeedingScale[1][1], currentItemIndex, index);
                    const blue = simultaneousButtonColourGradient(succeedingScale[0][2], succeedingScale[1][2], currentItemIndex, index);

                    // getSvgShape(targetKey).style = nullFound ? `fill:rgb(${red},${green},${blue});stroke:#000000` : "fill:#0088AA;stroke:#000000";
                    getSvgShape(targetKey).style = currentItemFound ? `fill:rgb(${red},${green},${blue});stroke:#000000` : "fill:blue;stroke:#000000";
                }
            }
        }
    }
}

function simultaneousButtonColourGradient(minBound: number, maxBound: number, asymptoticOffset: number, index: number) {
    //https://www.desmos.com/calculator/akipfecugm
    const SCALE_FACTOR = 1.3;
    return Math.round(minBound + (maxBound - minBound) * (-(1 / ((SCALE_FACTOR * (index) - 1) - SCALE_FACTOR * asymptoticOffset + 1)) + 1));
}

function parseKeysToHighlight(text: string): string|string[] {
    text = text.toString().toLowerCase()
    text = text.replace(/  /g, " ").replace(/ /g, "_")

    if (!isNaN(parseInt(text)) && !isNaN(parseFloat(text))) {
        //This is a valid number. If the number is over 9, split the text to highlight all numbers present in the string

        let split = text.split("");

        return split;
    } else {
        text = text.replace(/\//g, "")

        //We might have a situation where we need to do an alias replacement, this can be checked super easily
        let working = text;
        try {
            while (keyAliases[working as keyof(typeof keyAliases)]) {
                //Incase theres something like "colour", which would go
                // "colour" --> "color" --> ["color_s3", "color"]
                working = keyAliases[working as keyof(typeof keyAliases)] as string
            }
        } catch(e) {
            //
        }

        return working;
    }
}

function getSvgShape(element: any): any {
    if (element.target) {
        if (element.target.tagName !== "g") {
            return element.target;
        }
        return element.target.children[1];
    }
    if (element.tagName !== "g") {
        return element;
    }
    return element.children[1];
}
</script>

<style scoped>

.lighting_key_svg_graphic {
    position: absolute;
    display: flex;
    top: 120%;

    z-index: 9999;

    pointer-events: none;
    max-width: 450px;
    background-color: #f5f5f5d0;
    border-radius: 15px;
    border: 1px ridge #BEBEBE;
    width: max-content;
    height: max-content;
    padding: 15px;
    overflow: visible;
    box-shadow: 1px 1px rgba(0,0,0,0.5);
}

@media (max-width: 450px) {
    .lighting_key_svg_graphic {
        max-width: 100vw
    }
}
</style>