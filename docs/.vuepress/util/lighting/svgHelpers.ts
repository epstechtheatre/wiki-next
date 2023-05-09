/**
 * Convert a list of human-readable key-names into a list of svg-ids and colour associations
**/
import keyAliasMap from "../../json/lighting_svg_button_map.json";

/**
 * A hashmap of colours and svgIDs mapped to colours which can be used to highlight svg elements
 */
type ColourizedKeyMap = {[hex: string]: Array<string>};

export function svgHighlightingTranslator(key: string|Array<string>, revertToSoftkey: boolean): Array<ColourizedKeyMap> {
    //There are a couple ways to look up a key
    //For a lot of keys, the name of the key is the id of the key on the svg
    //For key names with spaces or whatever, the keyAliasMap can be used
    //So long as we include both variants in the output, the system should just be able to figure it out
    const output = [];
    
    if (typeof(key) === "string") {
        key = key.toLowerCase();

        
    }
}




export function getSvgShape(element: any) {
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