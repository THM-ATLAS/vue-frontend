<template>
  <v-card id="card" elevation="0" rounded="0" bottom color="green" role="contentinfo">
    <v-card-header>
      <v-card-header-text>
        <v-card-avatar>
          <v-avatar icon="mdi-globe-model" height="68" width="68"/>
        </v-card-avatar>
        <v-card-title class="justify-center">Anmelden</v-card-title>

        <v-card-subtitle class="text-sm-center">
          Verwende die Nutzerdaten, die du auch für andere Online-Dienste der
          THM verwendest.
        </v-card-subtitle>
      </v-card-header-text>
    </v-card-header>
    <div class="textfields">
      <div class="ma-3">
        <v-text-field
            label="Nutzerkennung"
            :rules="rules"
            hide-details="true"
        />
      </div>
      <div class="ma-3">
        <v-text-field
            label="Passwort"
            :rules="rules"
            hide-details="true"
            type="password"
        />
        <v-spacer height="100"/>
      </div>
    </div>
    <v-card-actions class="align-self-end justify-center">
      <v-btn
          flat
          size="large"
          rounded="0"
          variant="outlined"
          @click="goToMainpage">
        Login mit LDAP
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>

</style>

<script lang='ts'>
import {defineComponent} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "LoginModal",
  setup() {
    const router = useRouter();

    function goToMainpage(): void {
      router.push("/bkp");
    }

    return {goToMainpage}
  }
});
</script>
