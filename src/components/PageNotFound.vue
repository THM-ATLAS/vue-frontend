<template>
  <v-card
      class="mx-auto"
      elevation="0"
      rounded="0"
  >
    <v-card-title>
      <div class="text-h3">404</div>
    </v-card-title>
    <v-card-text>
      <div class="text-h4">Diese Seite konnte nicht gefunden werden.</div>
      <br/>
      <span>Falls du denkst, dass dies ein Fehler ist, kontaktiere bitte die Lehrbeauftragten des Moduls, in dem du den Link gefunden hast.</span>
    </v-card-text>
    <v-card-actions>
      <v-btn
          color="primary"
          dark
          href="/"
      >
        Startseite
      </v-btn>
      <v-btn
          color="secondary"
          dark
          @click="$router.back()"
      >
        Zurück
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "PageNotFound",
}
</script>