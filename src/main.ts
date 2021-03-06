import {createApp} from 'vue'
import {createI18n} from 'vue-i18n'
import App from './App.vue'
import {loadFonts} from './plugins/webfontloader'
import router from './router'
import './main.scss'
import translationDe from './i18n/de'
import translationEn from './i18n/en'
import vuetify from './plugins/vuetify'
import {fetchLocale} from "@/i18n/localeHelper";

loadFonts()

export const i18n = createI18n({
    locale: fetchLocale(),
    fallbackLocale: 'en',
    messages: {
        de: translationDe,
        en: translationEn
    }
})

createApp(App).use(router)
    .use(vuetify)
    .use(i18n)
    .mount('#app')
