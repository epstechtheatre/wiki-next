import { checkIfCookieExists, deleteCookie, getCookie, setCookie } from "../cookies";
import AvailableLightingBoards from "../../json/available_lighting_svgs.json"

const COOKIE_NAME = "lightingBoardOverlayPreference"
const SVG_PATH = "/images/svg/lighting_boards"
export function checkIfPreference() {
    return checkIfCookieExists(COOKIE_NAME)
}

export function getSvgPathForPreference() {
    if (!checkIfPreference()) return `${SVG_PATH}/${AvailableLightingBoards[getDefaultOption()]}`

    return `${SVG_PATH}/${AvailableLightingBoards[getPreference()]}`
}

export function getPreference() {
    return getCookie(COOKIE_NAME)
}

export function getAvailableOptions() {
    return Object.keys(AvailableLightingBoards);
}

export function getDefaultOption() {
    return Object.keys(AvailableLightingBoards)[0];
}

export function setPreference(value: string, customExpiryDate = 30) {    
    return setCookie(COOKIE_NAME, value, customExpiryDate)
}

export function deletePreference() {
    return deleteCookie(COOKIE_NAME)
}