//Format the presentation of key names
import { capitalize } from "vue";
/**
 * Remove '{}' from softkey denotation, Capitalize first letter
 */
export function stylizeKeyName(keyName: string) {
    return capitalize(keyName
        .replace("{","")
        .replace("}",""));
}