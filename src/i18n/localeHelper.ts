import SettingsService from "@/services/SettingsService";
import UserService from "@/services/UserService";

const DEFAULT_LOCALE: string = 'de';

export function fetchLocale(): any {
    if (window.localStorage.getItem('locale') === null) {
        return DEFAULT_LOCALE
    } else if (window.localStorage.getItem('locale') === '[object Object]') {
        return DEFAULT_LOCALE
    } else {
        // @ts-ignore
        return window.localStorage.getItem('locale')
    }
}

export async function setLocale(newLocale: string): Promise<any> {
    const loggedIn = (await UserService.getMe()).data
    if (loggedIn.user_id) {
        await SettingsService.editUserSettings({
            user_id: loggedIn.user_id,
            language: newLocale,
            theme: localStorage.getItem('theme') || 'light'
        })
    }
    window.localStorage.setItem('locale', newLocale);
}
