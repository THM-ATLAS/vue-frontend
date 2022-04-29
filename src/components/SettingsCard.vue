<template>
  <v-card elevation="0" rounded="0" role="main">
    <v-container class="pt-0 pl-0 flex">
      <v-card-title>
        <span class="headline">Einstellungen</span>
      </v-card-title>
      <!-- Benachrichtigungen -->
      <div>
        <span class="text-h6">Benachrichtigungen</span>
        <div>
          <v-switch
              v-model="settings.general.show_notifications"
              label="Benachrichtigungen per Mail versenden"
          />
          <v-switch
              v-model="settings.general.show_notifications_in_browser"
              label="Benachrichtigungen im Browser anzeigen"
          />
        </div>
      </div>
      <br/>
      <!-- Theme -->
      <div>
        <span class="text-h6">{{ $t('settings.theme') }}</span>
        <div>
          <v-btn
            @click="toggleTheme">
            <v-icon>mdi-format-color-fill</v-icon>

          </v-btn>
        </div>
      </div>
      <br/>
      <!-- Sprache -->
      <div>
        <span class="text-h6">{{ $t('settings.language') }}</span>
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
      <span class="headline">Danger Zone</span>
    </v-card-title>
    <v-card-text>
      <v-btn
          @click="deleteAccount"
          color="error"
          class="ma-2"
          text
      >
        Account löschen
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { toggleTheme, theme} from "@/helpers/theme";

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
          show_notifications: false,
          show_notifications_in_browser: false,
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