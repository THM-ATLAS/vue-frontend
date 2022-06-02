<template>
  <v-app :theme="theme" id="app-wrapper">
    <title>ATLAS</title>
    <RouterView/>
    <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="10_000"
        @click="snackbar.show = false">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn text @click="snackbar.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup>
import {theme} from "@/helpers/theme";
import {RouterView} from 'vue-router';
import API from "@/services/API";
import {useI18n} from "vue-i18n";
import {ref} from "vue";

const i18n = useI18n();

const snackbar = ref({
      show: false,
      text: "",
      color: "",
    }
);

function setSnackbar(text, color = "info") {
  snackbar.value.text = text;
  snackbar.value.color = color;
  snackbar.value.show = true;
}

API.interceptors.response.use(
    response => response,
    error => {
      switch (error.response.status) {
        case 401:
          setSnackbar(i18n.t("error.unauthorized"), "error");
          break;
        case 403:
          setSnackbar(i18n.t("error.forbidden"), "error");
          break;
        case 404:
          setSnackbar(i18n.t("error.not_found"), "error");
          break;
        case 500:
          setSnackbar(i18n.t("error.internal_server_error"), "error");
          break;
        // default:
        //   setSnackbar(i18n.t("error.unknown"), "error");
        //   break;
        // we assume that all other errors are handled locally!
      }
      return Promise.reject(error);
    });
</script>

<style src="ress"/>

<style lang="scss">
#app-wrapper {
  min-height: 100vh;
}
.v-row {
  margin: 0 !important;
}
</style>
