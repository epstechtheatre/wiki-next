import { checkIfCookieExists, deleteCookie, getCookie, setCookie } from "../cookies";

const COOKIE_NAME = "lightingBoardOverlayPreference"
export function checkIfPreference() {
    return checkIfCookieExists(COOKIE_NAME)
}

export function getPreference() {
    return getCookie(COOKIE_NAME)
}

export function setPreference(value: string, customExpiryDate = 30) {    
    return setCookie(COOKIE_NAME, value, customExpiryDate)
}

export function deletePreference() {
    return deleteCookie(COOKIE_NAME)
}