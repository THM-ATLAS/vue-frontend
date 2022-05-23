<template>
  <v-card class="help-card" elevation="0" rounded="0">
    <!--v-row align-content="center">
      <v-col id="content">
        <v-text-field
            label="Suche nach Modulen"
            prepend-inner-icon="mdi-magnify"
            variant="plain"
            role="search"
        />
      </v-col>
    </v-row-->
    <v-row v-for="module in modules" :key="module.id">
      <ModuleSearchResult
        :id="module.id"
        :moduleName="module.moduleName"
        class="searchResult"
      />
    </v-row>
  </v-card>
  <v-pagination
  length="3"
  disabled></v-pagination>
</template>

<script setup>
import ModuleSearchResult from "@/components/ModuleSearchResult";
import ModuleService from "@/services/ModuleService";
import { reactive, onBeforeMount } from "vue";

const modules = reactive ([])

let apiModules;

onBeforeMount(async () => {
  apiModules = (await ModuleService.getModules()).data;
  apiModules.forEach((result) => {
    console.log(result);
    let newEntry = {
      id: result.module_id,
      moduleName: result.name,
    };
    modules.push(newEntry);
  });
});
</script>

<style scoped></style>
