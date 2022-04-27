import {createApp} from 'vue'
import {createVuetify} from 'vuetify'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import {loadFonts} from './plugins/webfontloader'
import router from './router'

import {de, en} from 'vuetify/locale'
import translationDe from './i18n/de'
import translationEn from './i18n/en'

loadFonts()

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
    }
})

createApp(App).use(router)
    .use(vuetify)
    .use(i18n)
    .mount('#app')
