export function setCookie(cName: string, cValue: unknown, cNDaysTillExpire: number) {
    const d = new Date();
    d.setTime(d.getTime() + (cNDaysTillExpire*24*60*60*1000));
    let expires = d.toUTCString();
    document.cookie = `${cName}=${cValue}; expires=${expires};path=/;SameSite=Strict`;

    return undefined;
}

export function getCookie(cName: string) {
    const cookies = document.cookie;

    if (cookies.length > 0) {
        for (const valuePair of cookies.split(";")) {
            if (valuePair.split("=")[0].trim() == cName) {
                return valuePair.split("=")[1].trim();
            }
        }
    }

    return undefined;
}

export function checkIfCookieExists(cName: string) {
    const cookies = document.cookie;

    if (cookies.length > 0) {
        for (const valuePair of cookies.split(";")) {
            if (valuePair.split("=")[0].trim() == cName) {
                return true;
            }
        }
    }

    return false;
}

export function deleteCookie(cName: string) {
    document.cookie = `${cName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}