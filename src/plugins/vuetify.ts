import {createVuetify, ThemeDefinition} from "vuetify/dist/vuetify";
import {de, en} from 'vuetify/locale'
import {lightTheme, darkTheme} from "@/helpers/theme";

// Styles - do not remove
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default createVuetify({
    locale: {
        defaultLocale: 'de', // needs to be stored in localStorage
        fallbackLocale: 'en',
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