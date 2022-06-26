import {Ref, ref} from "vue";
import {ThemeDefinition} from "vuetify/dist/vuetify";
import UserService from "@/services/UserService";
import SettingsService from "@/services/SettingsService";

const DEFAULT_THEME: string = 'light';

function fetchTheme(): string {
    return window.localStorage.getItem('theme') || DEFAULT_THEME;
}

export const theme: Ref<string> = ref(fetchTheme());

export async function setTheme(newTheme: string): Promise<any> {
    const loggedIn = (await UserService.getMe()).data
    if (loggedIn.user_id) {
        await SettingsService.editUserSettings({
            user_id: loggedIn.user_id,
            language: localStorage.getItem('locale') || 'de',
            theme: newTheme
        })
    }
    window.localStorage.setItem('theme', newTheme);
    theme.value = newTheme;
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
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        highlight: '#3d3d3d',
        skipLink: '#FFFFFF',
        hyperlink: '#34ebe5',
    }
};