<template>
  <v-card id="card" elevation="0" rounded="0" bottom color="highlight" role="contentinfo">
    <v-card-header>
      <v-card-header-text>
        <v-icon icon="mdi-globe-model"/>
        <v-card-title class="justify-center">{{ $t('login_page.login') }}</v-card-title>
        <v-card-subtitle class="justify-center">
          {{ $t('login_page.instructions') }}
        </v-card-subtitle>
      </v-card-header-text>
    </v-card-header>
    <v-form ref="loginForm"
            v-model="loginFormValid"
    >
      <div class="textfields">
        <v-alert
            class="ma-3"
            v-if="alert"
            type="error"
            rounded="0"
        >
          {{ $t('login_page.invalid_credentials') }}
        </v-alert>
        <v-text-field
            class="ma-3"
            v-model="loginCredentials.username"
            :label="$t('login_page.user_id')"
            :rules="[rules.username_required]"
            :hide-details="true"
            @change="alert = false; $refs.loginForm.validate()"
            @keyup.enter="login"
        />
        <v-text-field
            class="ma-3"
            v-model="loginCredentials.password"
            :label="$t('login_page.password')"
            :rules="[rules.password_required]"
            :hide-details="true"
            type="password"
            @change="alert = false; $refs.loginForm.validate()"
            @keyup.enter="login"
        />
        <v-spacer height="100"/>
      </div>
    </v-form>
    <v-card-actions class="align-self-end justify-center">
      <v-btn
          :flat="true"
          size="large"
          rounded="0"
          variant="outlined"
          :disabled="!loginFormValid"
          @click="login"
          @keyup.enter="login">

        {{ $t('buttons.login_with_ldap') }}
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script setup lang='ts'>
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import LoginService from "@/services/LoginService";
import SettingsService from "@/services/SettingsService";
import {theme} from "@/helpers/theme";

const i18n = useI18n();

const alert = ref(false);
const loginFormValid = ref(false);
const loginCredentials = ref({
  username: "",
  password: ""
});

const rules = {
  username_required: (value: any) => !!value || i18n.t("login_page.username_required"),
  password_required: (value: any) => !!value || i18n.t("login_page.password_required"),
};

async function login() {
  await LoginService.login(loginCredentials.value.username, loginCredentials.value.password).then( async r  => {
  if (r.request.responseURL != "http://localhost:8080/login") {
    window.localStorage.setItem('loggedIn', 'true')
    await SettingsService.getUserSettings(r.data.user_id).then( res => {
      theme.value = res.data.theme
      i18n.locale.value = res.data.language
    })
  } else {
    window.localStorage.removeItem('loggedIn')
    theme.value = 'light'
    i18n.locale.value = 'de'
  }
})}


</script>
