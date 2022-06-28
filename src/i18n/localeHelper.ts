import SettingsService from "@/services/SettingsService";
import UserService from "@/services/UserService";
import {i18n} from "@/main";
import {theme} from "@/helpers/theme";

const DEFAULT_LOCALE: string = 'de';

export function fetchLocale(): string{
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
    await UserService.getMe().then( async res => {
        await SettingsService.editUserSettings({
            user_id: res.data.user_id,
            language: newLocale,
            theme: theme.value
        }).then(r => {
            i18n.global.locale = r.data.language
            window.localStorage.setItem('theme', r.data.theme);
            window.localStorage.setItem('locale', r.data.language);
        })
    })
}

export async function getLocaleFromAPI(): Promise<any> {
    let locale;
    await UserService.getMe().then( async res => {
         await SettingsService.getUserSettings(res.data.user_id).then(r => {
             locale = r.data.language
        }).catch(error => {
            locale = 'de'
        })
    }).catch(error => {
        locale = 'de'
    })
    return locale
}