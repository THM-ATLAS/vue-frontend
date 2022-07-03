<template>
  <div>
    <div id="background-card">
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
      <v-row v-for="module in currentPage" :key="module.module_id">
        <ModuleSearchResult
            v-bind="module"
        />
      </v-row>
    </div>
    <v-row>
      <v-col>
        <v-select
            :items="numbers"
            :label="itemsPerPageLabel"
            v-model="itemsPerPage">
        </v-select>
      </v-col>
      <v-col>
        <v-pagination
            v-model="currentPageNumber"
            :length="length"
            total-visible="5"
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import ModuleSearchResult from "@/components/module/ModuleSearchResult.vue";
import ModuleService from "@/services/ModuleService";
import {onBeforeMount, ref, Ref, watch} from "vue";
import {Module} from "@/helpers/types"
import {useI18n} from "vue-i18n";

const modules: Ref<Module[]> = ref([]);
const currentPage: Ref<Module[]> = ref([]);
const currentPageNumber = ref(1);
const itemsPerPage = ref(3);
const numbers = [1,3,5,10,20,50];
const length = ref(3);
const i18n = useI18n();
const itemsPerPageLabel = i18n.t('module_search.items_per_page')

onBeforeMount(async () => {
  let apiModules = (await ModuleService.getModules()).data;
  apiModules.forEach((result : Module) => {
    modules.value.push(result);
  });
  currentPage.value = modules.value.slice((currentPageNumber.value - 1) * itemsPerPage.value, currentPageNumber.value * itemsPerPage.value)
});

watch(currentPageNumber, (newNumber) => {
  currentPage.value = modules.value.slice((newNumber - 1) * itemsPerPage.value, newNumber * itemsPerPage.value)
})

watch(itemsPerPage, (newNumber) => {
  currentPageNumber.value = 1
  currentPage.value = modules.value.slice((currentPageNumber.value - 1) * newNumber, currentPageNumber.value * newNumber)
  length.value = Math.ceil(modules.value.length/newNumber)
})

/*//@ts-ignore
currentPage.value = computed(()=>{
  const returnValue = modules.value.slice((currentPageNumber.value - 1) * itemsPerPage, currentPageNumber.value * itemsPerPage)
  console.log("Computed " + returnValue)
  return returnValue
})*/
</script>

<style scoped>
#background-card {
  width: 100%;
  background: rgb(var(--v-theme-surface));
}
</style>
