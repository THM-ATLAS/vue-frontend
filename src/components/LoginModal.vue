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
        <div class="ma-3">
          <v-text-field
              v-model="loginCredentials.username"
              :label="$t('login_page.user_id')"
              :rules="[rules.username_required]"
              :hide-details="true"
              @change="alert = false; $refs.loginForm.validate()"
          />
        </div>
        <div class="ma-3">
          <v-text-field
              v-model="loginCredentials.password"
              :label="$t('login_page.password')"
              :rules="[rules.password_required]"
              :hide-details="true"
              type="password"
              @change="alert = false; $refs.loginForm.validate()"
          />
          <v-spacer height="100"/>
        </div>
      </div>
    </v-form>
    <v-alert
        v-if="alert"
        type="error"
    >
      {{ $t('login_page.invalid_credentials') }}
    </v-alert>
    <v-card-actions class="align-self-end justify-center">
      <v-btn
          :flat="true"
          size="large"
          rounded="0"
          variant="outlined"
          :disabled="!loginFormValid"
          @click="login">
        {{ $t('buttons.login_with_ldap') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>

</style>

<script setup lang='ts'>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import LoginService from "@/services/LoginService";

const router = useRouter();
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

function login() {
  LoginService.login(loginCredentials.value.username, loginCredentials.value.password)
      .then((res) => {
        goToProfile(res.data.user_id);
      }).catch(() => {
        alert.value = true;
        loginFormValid.value = false;
      }
  );
}

function goToProfile(userId: string) {
  router.push(`/u/${userId}`);
}


</script>
