<template>
  <v-card elevation="3" rounded="0">
    <v-list>
      <v-list-item v-for="item in data.items" v-bind:key="item">
        <v-list-item-title>{{item}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
    name: "NavigationDropdown",
    props: {
        data: Object,
    },
    setup(): { goToLogin: () => void } {
      const router = useRouter();

      function goToLogin(): void {
        router.push("/");
      }

      return { goToLogin };
    }
})
  
</script>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>
</style>