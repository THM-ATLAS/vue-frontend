<template>
  <v-card elevation="0" rounded="0" role="main">
    <v-container class="pt-0 pl-0 flex">
      <v-card-title v-html="$t('settings.title')"/>
      <!-- Benachrichtigungen -->
      <div>
        <span class="text-lg-subtitle-1" v-html="$t('settings.notifications.title')"/>
        <div>
          <v-switch
              v-model="settings.general.important_notifications"
              :label="$t('settings.notifications.important_notifications')"
          />
          <v-switch
              v-model="settings.general.show_notifications"
              :label="$t('settings.notifications.show_notifications')"
          />
          <v-switch
              v-model="settings.general.send_notification_mails"
              :disabled="!(settings.general.show_notifications || settings.general.important_notifications)"
              :label="$t('settings.notifications.by_mail')"
          />
          <v-switch
              v-model="settings.general.show_notifications_in_browser"
              :disabled="!(settings.general.show_notifications || settings.general.important_notifications)"
              :label="$t('settings.notifications.by_browser_notification')"
          />
        </div>
      </div>
      <br/>
      <!-- Theme -->
      <div>
        <span class="text-lg-subtitle-1">{{ $t('settings.theme.title') }}</span>
        <div>
          <v-btn
              class="mr-3"
              @click="toggleTheme"
              :disabled="theme === 'dark'"
              v-html="$t('settings.theme.dark')"/>
          <v-btn
              class="mr-3"
              @click="toggleTheme"
              :disabled="theme === 'light'"
              v-html="$t('settings.theme.light')"/>
        </div>
      </div>
      <br/>
      <!-- Sprache -->
      <div>
        <span class="text-lg-subtitle-1">{{ $t('settings.language') }}</span>
        <div>
          <!--v-select
              v-model="languages.filter(l => l.code === settings.general.language)[0].name"
              :items="languages"
              label="Sprache"
              item-text="name"
              item-value="code"
              ( old code, also broken, but can be used as inspiration for the new one )
          /-->
          <v-select
              v-model="$i18n.locale"
              :items="$i18n.availableLocales"
              :hint="$t('languages.' + $i18n.locale)"
              persistent-hint
              :label="$t('settings.language')"
              :text="$t('languages.' + item)"
          />
          <!-- this is officially still broken, see https://next.vuetifyjs.com/en/components/selects/.
          Once they got it fixed, we can then replace this with a select that actually displays the
          full language in the box and options. -->
        </div>
      </div>
      <br/>
      <!-- Einstellungen speichern -->
      <v-card-actions>
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
    </v-container>
  </v-card>
  <br/>
  <!-- Danger zone-->
  <v-card elevation="0" rounded="0">
    <v-card-title>
      <span class="headline" v-html="$t('settings.danger_zone.title')"/>
    </v-card-title>
    <v-card-text>
      <v-btn
          @click="deleteAccount"
          color="error"
          class="ma-2"
          text>
        <v-icon class="mr-3" icon="mdi-delete-forever"/>
        <span v-html="$t('settings.danger_zone.delete_account')"/></v-btn>
      <div v-html="$t('settings.danger_zone.delete_account_description')"/>
    </v-card-text>
  </v-card>
</template>

<script>
import {toggleTheme, theme} from "@/helpers/theme";

export default {
  name: "SettingsCard",
  computed: {
    languages() {
      return this.$i18n.availableLocales.map(locale => {
        return {
          code: locale,
          name: this.$t('languages.' + locale)
        }
      })
    }
  },
  data() {
    return {
      theme,
      settings: {
        general: {
          important_notifications: true,
          show_notifications: false,
          show_notifications_in_browser: false,
          send_notification_mails: false,
          theme: "light",
          language: "de"
        }
      },
      themes: [
        {
          name: "Light",
          code: "light"
        },
        {
          name: "Dark",
          code: "dark"
        }
      ]
    }
  },
  methods: {
    deleteAccount() {
      // this.$store.dispatch("deleteAccount")
    },
    saveSettings() {
      console.log(this.settings)
      // this.$store.dispatch("saveSettings", this.settings)
    },
    resetSettings() {
      // this.$store.dispatch("resetSettings")
    },
    closeSettings() {
      this.$router.back();
    },
    toggleTheme
  }
}
</script>

<style scoped>

</style>