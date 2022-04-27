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
      <!-- Theme -->
      <div>
        <span class="text-h6">Theme</span>
        <div>
          <v-select
              v-model="themes.filter(t => t.code === settings.general.theme)[0].name"
              :items="themes"
              label="Sprache"
              item-text="name"
              item-value="code"
          />
        </div>
      </div>
      <!-- Sprache -->
      <div>
        <span class="text-h6">Sprache</span>
        <div>
          <v-select
              v-model="languages.filter(l => l.code === settings.general.language)[0].name"
              :items="languages"
              label="Sprache"
              item-text="name"
              item-value="code"
          />
        </div>
      </div>
      <!-- Einstellungen speichern -->
      <v-card-actions>
        <v-btn
            color="primary"
            @click="saveSettings"
        >
          Speichern
        </v-btn>
        <v-btn
            color="error"
            @click="resetSettings"
        >
          Zurücksetzen
        </v-btn>
        <v-btn
            color="cancel"
            @click="closeSettings"
        >
          Abbrechen
        </v-btn>
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
export default {
  name: "SettingsCard",
  data() {
    return {
      settings: {
        general: {
          show_notifications: false,
          show_notifications_in_browser: false,
          theme: "light",
          language: "de"
        }
      },
      languages: [
        {
          name: "Deutsch",
          code: "de"
        },
        {
          name: "English",
          code: "en"
        }
      ],
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
    }
  }
}
</script>

<style scoped>

</style>