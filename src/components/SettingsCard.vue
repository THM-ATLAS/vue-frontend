<template>
  <v-card class="help-card" elevation="0" rounded="0">
    <v-card-header>
      <v-icon icon="mdi-globe-model" left="true" />
      <v-card-header-text class="text-left fontszTi">
        Einstellungen
      </v-card-header-text>
      <v-card-subtitle> Personalisierung & Einstellung </v-card-subtitle>
    </v-card-header>
    <v-container>
      <v-card-text class="text-left fontszEx grow">
        <div class="text-justify">
          <!-- über Atlas - die Lernplattform für die THM -->
          <h2>Design</h2>
          <div>
            <p class="text-body-1">Hier Design einstellen</p>
          </div>
          <br />
          <!-- Funktionsweise -->
          <h2>Benachrichtigungen</h2>
          <p class="text-body-1">Hier Benachrichtigungen einstellen</p>
        </div>
        <br />
        <h2>Sprache</h2>
        <p class="text-body-1">Hier Sprache einstellen</p>
      </v-card-text>
    </v-container>
  </v-card>

  <!-- <v-card elevation="0" rounded="0" role="main">
    <v-card-header>
      <v-icon icon="mdi-globe-model" left="true" />
      <v-card-header-text class="text-left fontszTi">
        Einstellungen
      </v-card-header-text>
      <v-card-subtitle> Personalisierung & Einstellung </v-card-subtitle>
    </v-card-header>

    <v-container class="pt-0 pl-0 flex">
      <v-card-title v-html="$t('settings.title')" />
      Theme
      <div>
        <span class="text-lg-subtitle-1">{{ $t("settings.theme.title") }}</span>
        <div>
          <v-btn
            class="mr-3"
            @click="toggleTheme"
            :disabled="theme === 'dark'"
            v-html="$t('settings.theme.dark')"
          />
          <v-btn
            class="mr-3"
            @click="toggleTheme"
            :disabled="theme === 'light'"
            v-html="$t('settings.theme.light')"
          />
        </div>
      </div>
      <br />
      <br />
      Benachrichtigungen
      <div>
        <span
          class="text-lg-subtitle-1"
          v-html="$t('settings.notifications.title')"
        />
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
            :disabled="
              !(
                settings.general.show_notifications ||
                settings.general.important_notifications
              )
            "
            :label="$t('settings.notifications.by_mail')"
          />
          <v-switch
            v-model="settings.general.show_notifications_in_browser"
            :disabled="
              !(
                settings.general.show_notifications ||
                settings.general.important_notifications
              )
            "
            :label="$t('settings.notifications.by_browser_notification')"
          />
        </div>
      </div>
      <br />
      Sprache
      <div>
        <span class="text-lg-subtitle-1">{{ $t("settings.language") }}</span>
        <div>
          v-select
              v-model="languages.filter(l => l.code === settings.general.language)[0].name"
              :items="languages"
              label="Sprache"
              item-text="name"
              item-value="code"
              ( old code, also broken, but can be used as inspiration for the new one )
          /
          <v-select
            v-model="$i18n.locale"
            :items="$i18n.availableLocales"
            :hint="$t('languages.' + $i18n.locale)"
            persistent-hint
            :label="$t('settings.language')"
            :text="$t('languages.' + item)"
          />
          this is officially still broken, see https://next.vuetifyjs.com/en/components/selects/.
          Once they got it fixed, we can then replace this with a select that actually displays the
          full language in the box and options.
        </div>
      </div>
      <br />
      Einstellungen speichern
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
          @click="closeSettings()"
          v-html="$t('buttons.cancel')"
        />
      </v-card-actions>
    </v-container>
  </v-card>
  <br />

  Danger zone
  <v-card elevation="0" rounded="0">
    <v-card-title>
      <span class="headline" v-html="$t('settings.danger_zone.title')" />
    </v-card-title>
    <v-card-text>
      <v-btn @click="deleteAccount" color="error" class="ma-2" text>
        <v-icon class="mr-3" icon="mdi-delete-forever" />
        <span v-html="$t('settings.danger_zone.delete_account')"
      /></v-btn>
      <div v-html="$t('settings.danger_zone.delete_account_description')" />
    </v-card-text>
  </v-card> -->
</template>

<script setup>
// import { toggleTheme, theme } from "@/helpers/theme";
// import { ref } from "vue";

// let settings = ref({
//   general: {
//     important_notifications: true,
//     show_notifications: false,
//     show_notifications_in_browser: false,
//     send_notification_mails: false,
//     theme: "light",
//     language: "de",
//   },
// });

// function deleteAccount() {
//   // this.$store.dispatch("deleteAccount");
// }
// function saveSettings() {
//   console.log(this.settings);
//   // this.$store.dispatch("saveSettings", this.settings);
// }
// function resetSettings() {
//   // this.$store.dispatch("resetSettings");
// }
// function closeSettings() {
//   // this.$router.back();
// }
</script>

<style scoped>
h2 {
  margin-bottom: 3%;
}

.help-card {
  margin-top: 3em;
  margin-bottom: 3em;
}

.text-body-1 {
  margin-bottom: 3%;
}

.text-subheader {
  margin-bottom: 1%;
}

.accordion-panel {
  margin-top: 0;
  margin-bottom: 3%;
}
</style>
