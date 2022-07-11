import {Ref, ref} from "vue";
import {ThemeDefinition} from "vuetify/dist/vuetify";
import UserService from "@/services/UserService";
import SettingsService from "@/services/SettingsService";
import {i18n} from "@/main";

const DEFAULT_THEME: string = 'light';

function fetchTheme(): string {
    return window.localStorage.getItem('theme') || DEFAULT_THEME;
}

export const theme: Ref<string> = ref(fetchTheme());

export async function setTheme(newTheme: string): Promise<any> {
    await UserService.getMe().then(async res => {
        await SettingsService.editUserSettings({
            user_id: res.data.user_id,
            language: i18n.global.locale,
            theme: newTheme
        }).then(r => {
            window.localStorage.setItem('theme', r.data.theme);
            window.localStorage.setItem('locale', r.data.language);
            theme.value = r.data.theme;
        })
    })


}

export async function toggleTheme(): Promise<any> {
    await setTheme(theme.value === 'light' ? 'dark' : 'light');
}

// https://www.thm.de/thmweb/web-styleguide.html

export const lightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: '#f2f5f6',
        surface: '#FFFFFF',
        primary: '#80ba24',
        'primary-darken-1': '#6c9a22',
        secondary: '#4a5c66',
        'secondary-darken-1': '#364046',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        highlight: '#dfeec8',
        text: '#394a59',
        link: '#9c132e',
        skipLink: '#4a5c66',
        hyperlink: '#272ef5',
    }
};

export const darkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        background: '#212121',
        surface: '#282828',
        primary: '#80ba24',
        'primary-darken-1': '#6c9a22',
        secondary: '#282828',
        'secondary-darken-1': '#364046',
        error: '#FF5733',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        highlight: '#3d3d3d',
        skipLink: '#FFFFFF',
        hyperlink: '#34ebe5',
    }
};