<template>
  <v-container>
    <v-card class="help-card" elevation="0" rounded="0">
      <v-card-header>
        <v-icon icon="mdi-globe-model" left="true"/>
        <v-card-header-text class="text-left fontszTi">
          {{ $t("settings.title") }}
        </v-card-header-text>
        <v-card-subtitle> {{ $t('settings.subtitle') }}</v-card-subtitle>
      </v-card-header>
      <v-container>
        <v-card-text class="text-left fontszEx grow">
          <v-row>
            <v-col cols="12" md="6">
              <h2>{{ $t("settings.theme.title") }}</h2>
              <v-btn
                  class="mr-3"
                  @click="toggleTheme"
                  :disabled="theme === 'light'"
                  v-html="$t('settings.theme.light')"
                  :color="theme === 'light' ? 'info': 'undefined'"
              />
              <v-btn
                  class="mr-3"
                  @click="toggleTheme"
                  :disabled="theme === 'dark'"
                  v-html="$t('settings.theme.dark')"
                  :color="theme === 'dark' ? 'info': 'undefined'"
              />
            </v-col>
            <v-col cols="12" md="6">
              <h2>{{ $t("settings.language") }}</h2>
              <v-select
                  v-model="chosenLocale"
                  :items="availableLocales"
                  item-title="name"
                  return-object
                  :label="$t('settings.language')"
              />
            </v-col>
            <!--v-col cols="12" md="12">
              <h2>{{ $t("settings.notifications.title") }}</h2>
            </v-col>
            <v-col cols="12" md="6">
              <v-switch
                class="notif-switch"
                v-model="settings.general.important_notifications"
                :label="$t('settings.notifications.important_notifications')"
              ></v-switch>
              <v-switch
                class="notif-switch"
                v-model="settings.general.show_notifications"
                :label="$t('settings.notifications.show_notifications')"
              ></v-switch>
            </v-col>
            <v-col cols="12" md="6">
              <v-switch
                class="notif-switch"
                v-model="settings.general.show_notifications_in_browser"
                :label="$t('settings.notifications.by_browser_notification')"
                :disabled="
                  !(
                    settings.general.show_notifications ||
                    settings.general.important_notifications
                  )"
              ></v-switch>
              <v-switch
                class="notif-switch"
                v-model="settings.general.show_notification_mails"
                :label="$t('settings.notifications.by_mail')"
                :disabled="
                  !(
                    settings.general.show_notifications ||
                    settings.general.important_notifications
                  )"
              ></v-switch>
            </v-col-->
            <!--v-col class="save-settings" cols="12" md="12">
              <h2>{{ $t("settings.save_settings") }}</h2>
              <v-card-actions class="card-actions">
                <v-btn
                  color="primary"
                  @click="saveSettings"
                  v-html="$t('buttons.save')"
                />
                <v-btn
                  color="error"
                  @click="resetSettings"
                  v-html="$t('buttons.reset')"
                />
                <v-btn
                  color="cancel"
                  @click="closeSettings"
                  v-html="$t('buttons.cancel')"
                />
              </v-card-actions>
            </v-col-->
          </v-row>
        </v-card-text>
      </v-container>
    </v-card>
    <br/>
    <!--v-card elevation="0" rounded="0">
      <v-container>
        <v-card-text class="text-left fontszEx grow">
          <v-row>
            <v-col cols="12">
              <h2>{{ $t("settings.danger_zone.title") }}</h2>
              <v-btn class="mr-3" color="error" @click="deleteAccount" text
                ><v-icon class="mr-3" icon="mdi-delete-forever" /><span
                  v-html="$t('settings.danger_zone.delete_account')"
              /></v-btn>
            </v-col>
            <v-col>
              {{ $t("settings.danger_zone.delete_account_description") }}
            </v-col>
          </v-row>
        </v-card-text>
      </v-container>
    </v-card-->
  </v-container>
</template>

<script setup>
import {toggleTheme, theme} from "@/helpers/theme";
import {ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import {setLocale} from "@/i18n/localeHelper";
import router from "@/router";

const i18n = useI18n();
const availableLocales = i18n.availableLocales.map(locale => {
      return {
        name: i18n.t("languages." + locale),
        code: locale
      }
    }
);
const chosenLocale = ref(availableLocales.find(locale => locale.code === i18n.locale.value));



watch(chosenLocale, async (newValue) => {
  //console.log(newValue.code)
  await setLocale(newValue.code);
  router.go()
  //window.location.reload();
})


</script>

<style scoped>
h2 {
  margin-bottom: 3%;
}

.notif-switch {
  margin-bottom: -2em;
}

.save-settings {
  margin-top: 4em;
}

.card-actions {
  margin-top: -1em;
  margin-left: -1em;
}
</style>
