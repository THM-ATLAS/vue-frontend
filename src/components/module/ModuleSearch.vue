<template>
  <div>
    <v-text-field
        class="mb-4 mt-1"
        :label="$t('module_search.search')"
        v-model="search"
        prepend-icon="mdi-magnify"
        single-line
        hide-details
        @input="applySearch"/>
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
      <v-row v-if="currentPage.length === 0">
        <v-alert
            :value="true"
            icon="mdi-magnify-close"
            dark
            class="ma-3"
            style="text-align: center;">
          {{ $t('module_search.no_results') }}
        </v-alert>
      </v-row>
    </div>
    <v-row>
      <v-col>
        <v-select
            :items="numbers"
            :label="$t('module_search.items_per_page')"
            v-model="itemsPerPage">
        </v-select>
      </v-col>
      <v-col>
        <v-pagination
            v-model="currentPageNumber"
            :length="length"
            total-visible="5"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import ModuleSearchResult from "@/components/module/ModuleSearchResult.vue";
import ModuleService from "@/services/ModuleService";
import {onBeforeMount, ref, Ref, watch} from "vue";
import {Module} from "@/helpers/types"

const modules: Ref<Module[]> = ref([]);
const filteredModules: Ref<Module[]> = ref([]);
const currentPage: Ref<Module[]> = ref([]);
const currentPageNumber = ref(1);
const itemsPerPage = ref(3);
const numbers = [1,3,5,10,20,50];
const length = ref(3);
const search = ref('');

onBeforeMount(async () => {
  filteredModules.value = modules.value = (await ModuleService.getModules()).data;
  currentPage.value = modules.value.slice((currentPageNumber.value - 1) * itemsPerPage.value, currentPageNumber.value * itemsPerPage.value)
  length.value = Math.ceil(filteredModules.value.length/itemsPerPage.value)
});

watch(currentPageNumber, (newNumber) => {
  currentPage.value = filteredModules.value.slice((newNumber - 1) * itemsPerPage.value, newNumber * itemsPerPage.value)
})

function applySearch(): void {
  filteredModules.value = modules.value.filter((module) => {
    return module.name.toLowerCase().includes(search.value.toLowerCase())
  })
  currentPage.value = filteredModules.value.slice((currentPageNumber.value - 1) * itemsPerPage.value, currentPageNumber.value * itemsPerPage.value)
  length.value = Math.ceil(filteredModules.value.length/itemsPerPage.value)
}

watch(itemsPerPage, (newNumber) => {
  currentPageNumber.value = 1
  currentPage.value = modules.value.slice((currentPageNumber.value - 1) * newNumber, currentPageNumber.value * newNumber)
  length.value = Math.ceil(filteredModules.value.length/newNumber)
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
