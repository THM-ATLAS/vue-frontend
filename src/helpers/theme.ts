import {Ref, ref} from "vue";

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

export default {
    theme,
    toggleTheme
}