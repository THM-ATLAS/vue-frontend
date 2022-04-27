import {createApp} from 'vue'
import {createVuetify, ThemeDefinition} from 'vuetify'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import {loadFonts} from './plugins/webfontloader'
import router from './router'

import {de, en} from 'vuetify/locale'
import translationDe from './i18n/de'
import translationEn from './i18n/en'

loadFonts()

const lightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    }
}

const darkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        background: '#212121',
        surface: '#212121',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    }
}

const i18n = createI18n({
  locale: 'de',
  fallbackLocale: 'en',
  messages: {
    de: translationDe,
    en: translationEn
  }
})

const vuetify = createVuetify({
    locale: {
        fallbackLocale: 'en',
        defaultLocale: 'de',
        messages: {de, en}
    },
    theme: {
        defaultTheme: 'dark',
        themes: {
            light: lightTheme,
            dark: darkTheme
        }
    }
})

createApp(App).use(router)
    .use(vuetify)
    .use(i18n)
    .mount('#app')
