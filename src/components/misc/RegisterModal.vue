<template>
  <v-card id="card" elevation="0" rounded="0" bottom color="highlight" role="contentinfo">
    <v-card-header>
      <v-card-header-text>
        <v-icon icon="mdi-globe-model"/>
        <v-card-title class="justify-center">{{ $t('register_page.register') }}</v-card-title>
        <v-card-subtitle class="justify-center">
          {{ $t('register_page.instructions') }}
        </v-card-subtitle>
      </v-card-header-text>
    </v-card-header>
    <v-form ref="registerForm"
            v-model="registerFormValid"
    >
      <div class="textfields">
        <v-text-field
            @change="$refs.registerForm.validate()"
            v-model="registerCredentials.name"
            :label="$t('register_page.name')"
            :rules="[rules.required]"
            required
        />
        <v-text-field
            @change="$refs.registerForm.validate()"
            v-model="registerCredentials.username"
            :label="$t('register_page.username')"
            :rules="[rules.required, rules.username, rules.username_ldap]"
            required
        />
        <v-text-field
            @change="$refs.registerForm.validate()"
            v-model="registerCredentials.email"
            :label="$t('register_page.email')"
            :rules="[rules.required, rules.email]"
            required
        />
        <v-text-field
            @change="$refs.registerForm.validate()"
            v-model="registerCredentials.password"
            :label="$t('register_page.password')"
            :rules="[rules.required, rules.password]"
            type="password"
            required
        />
        <v-text-field
            @change="$refs.newUserForm.validate()"
            v-model="passwordConfirmation"
            :label="$t('register_page.password_confirm')"
            :rules="[rules.required, rules.password_equal]"
            type="password"
            required
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
        @click="goBack"
        v-html="$t('buttons.back')"
        />
      <v-btn
          :flat="true"
          size="large"
          rounded="0"
          variant="outlined"
          :disabled="!registerFormValid"
          @click="register">

        {{ $t('buttons.register') }}
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script setup lang='ts'>
import {Ref, ref} from "vue";
import {useI18n} from "vue-i18n";
import LoginService from "@/services/LoginService";

import {AxiosResponse} from "axios";
//import {useRouter} from "vue-router";
import {theme} from "@/helpers/theme";
import SettingsService from "@/services/SettingsService";
import UserService from "@/services/UserService";
import router from "@/router";
import {User} from "@/helpers/types";

const i18n = useI18n();
//const router = useRouter();

const alert = ref(false);
const registerFormValid = ref(false);
const registerCredentials: Ref<User> = ref({
  user_id: 0,
  name: "",
  username: "",
  password: "",
  email: "",
  roles: [],
});
const passwordConfirmation = ref("");

const rules = {
  required: (value: any) => !!value || i18n.t("register_page.errors.required"),
  username: (value: string) => /^[a-zA-Z\d]{3,32}$/.test(value) || i18n.t("register_page.errors.username_invalid"),
  username_ldap: (value: string) => !/^([a-zA-Z]{4}\d{2}|hg\d+)$/.test(value) || i18n.t("register_page.errors.username_ldap_invalid"),
  email: (value: string) => /^[a-zA-Z\d.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z\d-]+(?:\.[a-zA-Z\d-]+)*$/.test(value) || i18n.t("register_page.errors.email_invalid"),
  password: (value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])[^ ]{8,}$/.test(value) || i18n.t("register_page.errors.password_invalid"), // 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter one number and a special character'
  password_equal: (value: string) => value === registerCredentials.value.password || i18n.t("register_page.errors.password_equal"),
};

async function register() {} // TODO

async function goBack() {
  router.back();
}

async function login() {
  await LoginService.login(registerCredentials.value.username, registerCredentials.value.password).then(async (r: AxiosResponse) => {
    //const lastRoute = router.currentRoute;

    //await router.push(r.request.responseURL).then(async () => {
    if (r.request.responseURL.endsWith('login')) {
      alert.value = true;
      window.localStorage.removeItem('loggedIn')
    } else {
      window.localStorage.setItem('loggedIn', 'true')
      console.log("loggedIn set")
      await UserService.getMe().then(async response => {
        console.log("UserService awaited")
        await SettingsService.getUserSettings(response.data.user_id).then(res => {
          console.log("SettingsService awaited")
          console.log(res)
          theme.value = res.data.theme
          i18n.locale.value = res.data.language
          localStorage.setItem('theme', res.data.theme)
          localStorage.setItem('locale', res.data.language)
          router.push('/');
        })
      })

    }
})
}


</script>
