import {createVuetify, ThemeDefinition} from "vuetify/dist/vuetify";
import {de, en} from 'vuetify/locale'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const lightTheme: ThemeDefinition = {
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
        green: '#dfeec8',
    }
}

const darkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        background: '#212121',
        surface: '#212121',
        primary: '#80ba24',
        'primary-darken-1': '#6c9a22',
        secondary: '#4a5c66',
        'secondary-darken-1': '#364046',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        green: '#537317',
    }
}

export default createVuetify({
    locale: {
        fallbackLocale: 'en',
        defaultLocale: 'de',
        messages: {de, en}
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: lightTheme,
            dark: darkTheme
        },
    }
})