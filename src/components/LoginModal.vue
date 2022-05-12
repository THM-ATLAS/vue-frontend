<template>
  <v-card id="card" elevation="0" rounded="0" bottom color="green" role="contentinfo">
    <v-card-header>
      <v-card-header-text>
        <v-card-avatar>
          <v-avatar icon="mdi-globe-model" height="68" width="68"/>
        </v-card-avatar>
        <v-card-title class="justify-center">{{ $t('login_page.login') }}</v-card-title>

        <v-card-subtitle class="text-center">
          {{ $t('login_page.instructions') }}
        </v-card-subtitle>
      </v-card-header-text>
    </v-card-header>
    <div class="textfields">
      <div class="ma-3">
        <v-text-field
            :label="$t('login_page.user_id')"
            :rules="rules"
            :hide-details="true"
        />
      </div>
      <div class="ma-3">
        <v-text-field
            :label="$t('login_page.password')"
            :rules="rules"
            :hide-details="true"
            type="password"
        />
        <v-spacer height="100"/>
      </div>
    </div>
    <v-card-actions class="align-self-end justify-center">
      <v-btn
          :flat="true"
          size="large"
          rounded="0"
          variant="outlined"
          @click="goToMainpage">
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

const router = useRouter();

function goToMainpage(): void {
  router.push("/");
}


</script>
