import {Ref, ref} from "vue";
import {ThemeDefinition} from "vuetify/dist/vuetify";

const DEFAULT_THEME: string = 'light';

function fetchTheme(): string {
    return window.localStorage.getItem('theme') || DEFAULT_THEME;
}

export const theme: Ref<string> = ref(fetchTheme());

export function setTheme(newTheme: string): void {
    window.localStorage.setItem('theme', newTheme);
    theme.value = newTheme;
}

export function toggleTheme(): void {
    setTheme(theme.value === 'light' ? 'dark' : 'light');
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
    }
};