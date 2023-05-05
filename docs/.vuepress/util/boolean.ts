export function isBooleanIsh(val: string|boolean) {
    return val == true || val == false || val == "true" || val == "false";
}

export function normalizeBooleanIsh(val: string|boolean) {
    return val==true || val=="true" //FIXME this will also return false for any value that isn't boolean, but I think that's fine
}