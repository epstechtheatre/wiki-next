import keyAliasMap from "../../json/lighting_key_name_alias.json";

/**
 * 
 * @param keyNames The array of keys to highlight or single key to highlight
 * @param svg A pointer to the svg contentDocument to modify with colourization
 * @param revertToSoftkey If a key is not found on the svg as a hardkey, highlight softkeys instead
 * @param simultaneousHoverIndex {Optional} in the case of simulataneous key pressing, indicate the current index of the key being pressed in the chord (for colouring purposes)
 */
export function svgHighlightKey(keyNames: string|string[], svg: Document, revertToSoftkey: boolean, simultaneousHoverIndex = 0) {
    //Step 1) Create an object with instructions on what keys to highlight, accounting for alias mappings

    //The object format is as follows:
    //  - Treat all commands like simultaneous keys, with a special case for only 1 key in the group (a "single" key)
    //  - Each Entry in the top array represents a key, however to account for cases like "10" highting 1 and 0 or softkeys highlighting the entire row of softkeys
    //      We put all key ids considered equivalent into a set contained within the top-level array
    //      This way when colourization happens each key in the same set gets the same colour
    //  - Additional information should be provided for actual simultaneous groups like start index and such
    const parsedColourization: Set<string>[] = [];

    if (typeof(keyNames) === "string") return svgHighlightKey([keyNames], svg, revertToSoftkey)

    for (const keyName of keyNames) {

        //a) Prep the string by normalizing its format
        //b) Recursively find leaf-aliases of the key name and add all to the set
        const equivalentIDs = traverseAliasTree(keyNamePrep(keyName));
        //c) If after that there is only 1 alias (the original) and it is a number, split the number into it's individual digits
        if (equivalentIDs.size == 1) {
            const entry = equivalentIDs.values().next().value as string;

            if (!isNaN(parseInt(entry)) && !isNaN(parseFloat(entry))) {
                const splitDigits = entry.split("");
                equivalentIDs.delete(entry);
                splitDigits.forEach(val => equivalentIDs.add(val));
            }
        }

        //d) Add the alias tree to the output array
        parsedColourization.push(equivalentIDs);
    }

    //Step 2) Highlighting the keys
    //  Because of the differences in software used to create svgs, there are slight differences in how the svg is arranged
    //  Some svgs will have the syntax <rect id="..."><title/></rect> which is the easy one. Here the rect is the one with the ID and the element to be highlighted
    //  Some svgs will have the syntax <g id="..."><rect/><title/></g> which is slightly more annoying because the <g> element is the one with the id and the contained <rect> is the one to be highlighted
    //  Also note, it isn't necessarily a <rect>, it could also be an <ellipse>
    //  The general rule-of-thumb is if the found element isn't a <g> tag, its probably the element we want to highlight
    //      Otherwise, just go find a contained <rect> or <ellipse>

    //Just in case, have the softkey set at the ready
    const softkeySet = traverseAliasTree("softkey");

    parsedColourization.forEach((equivalentIDSet, index) => {
        equivalentIDSet.forEach(equivalentID => {
            let targetElement = svg.getElementById(equivalentID);

            if (targetElement?.tagName == "g" && targetElement.children.length > 0) {
                targetElement = targetElement.querySelector("rect,ellipse");
            }
        
            if (targetElement) {
                targetElement.style.fill = getColour(parsedColourization, simultaneousHoverIndex, index);
            } else {
                //Step 3) If no target was found and revertToSoftkey is set, show all softkeys

                //This should just be possible by appending the softkeyAlias tree to the current set
                if (revertToSoftkey) {
                    softkeySet.forEach(val => equivalentIDSet.add(val));
                }  
            }
        })
    })
}

function getColour(parsedColourArray: Set<string>[], hoverIndex: number, currentElIndex: number) {
    if (parsedColourArray.length == 1) return "lime";

    if (currentElIndex < hoverIndex) return "blue";

    const succeedingScale = [[0,255,255],[255,255,255]]  
    //                        r, g , b     r , g , b
    //                       [minBound  ,    MaxBound]

    const red = simultaneousButtonColourGradient(succeedingScale[0][0], succeedingScale[1][0], hoverIndex, currentElIndex);
    const green = simultaneousButtonColourGradient(succeedingScale[0][1], succeedingScale[1][1], hoverIndex, currentElIndex);
    const blue = simultaneousButtonColourGradient(succeedingScale[0][2], succeedingScale[1][2], hoverIndex, currentElIndex);

    return `rgb(${red},${green},${blue})`
}

function simultaneousButtonColourGradient(minBound: number, maxBound: number, asymptoticOffset: number, index: number) {
    //https://www.desmos.com/calculator/akipfecugm
    const SCALE_FACTOR = 1.3;
    return Math.round(minBound + (maxBound - minBound) * (-(1 / (SCALE_FACTOR * (index) - SCALE_FACTOR * asymptoticOffset + 1)) + 1));
}

function keyNamePrep(keyName: string) {
    return keyName.toLowerCase().replace(/ /g, "");
}

function traverseAliasTree(keyName: string, foundAliases: Set<string> = new Set()): Set<string> {
    //We only need bottom-level leaves of the tree, not nodes
    const nextLevelAlias = keyAliasMap[keyName] as string|string[];

    if (nextLevelAlias == undefined) {
        foundAliases.add(keyName);
        return foundAliases;
    }
    
    if (Array.isArray(nextLevelAlias)) {
        nextLevelAlias.forEach(val => {
            if (!foundAliases.has(val)) {
                foundAliases.add(keyName);
                traverseAliasTree(val, foundAliases);
            }
        }) 
    } else {
        if (!foundAliases.has(nextLevelAlias)) {
            foundAliases.add(keyName);
            traverseAliasTree(nextLevelAlias, foundAliases);
        }
    }

    return foundAliases;
}