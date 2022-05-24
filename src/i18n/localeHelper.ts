const DEFAULT_LOCALE: string = 'de';

export function fetchLocale(): any {
    if (window.localStorage.getItem('locale') === null) {
        return DEFAULT_LOCALE
    } else if (window.localStorage.getItem('locale') === '[object Object]') {
        return DEFAULT_LOCALE
    } else {
        // @ts-ignore
        return JSON.parse(window.localStorage.getItem('locale'))
    }
}

export function setLocale(i18nInstance : any,newLocale: string): void {
    window.localStorage.setItem('locale', JSON.stringify(newLocale));
    i18nInstance.locale = newLocale;
}
