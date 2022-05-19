<template>
  <v-card elevation="0" rounded="0" role="main">
    <v-table>
      <thead>
      <tr>
        <th>Modul</th>
        <th>Beschreibung</th>
        <th>Aktionen</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="module in modules" v-bind:key="module.id">
        <td>{{ module.name }}</td>
        <td v-if="module.description">{{ module.description }}</td>
        <td v-else style="opacity: 70%">Keine Beschreibung</td>
        <td>
          <v-btn
              @click="editModuleDialog.show = true; editModuleDialog.target = module"
              icon="mdi-file-document-edit"
              small
              elevation="0"
              color="primary"
              class="mr-2"
              rounded="0"
              variant="outlined"
          />
          <v-btn
              @click="deleteModuleDialog.show = true; deleteModuleDialog.target = module"
              icon="mdi-file-remove"
              small
              elevation="0"
              color="error"
              class="mr-2"
              rounded="0"
              variant="outlined"
          />
        </td>
      </tr>
      </tbody>
    </v-table> 

    <!-- new module -->
    <div>
      <v-btn
          @click="newModuleDialog.show = true"
          icon="mdi-file-plus"
          small
          elevation="0"
          color="primary"
          class="mr-2"
          rounded="0"
          variant="outlined"
      />
    </div>
  </v-card>
  <!-- new module dialog -->
  <v-dialog
      v-model="newModuleDialog.show"
      :scrollable="true"
      :retain-focus="false"
  >
    <v-card top="20%" width="50vw">
      <v-card-title>
        <span class="headline">Neues Modul</span>
      </v-card-title>
      <v-card-text>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="newModuleDialog.show = false" v-html="$t('buttons.cancel')"/>
        <v-btn :disabled="PLACEHOLDERTRUE" color="primary" @click="PLACEHOLDER" v-html="$t('buttons.save')"/>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-btn
  @click="test()">
      test
  </v-btn>


  <v-dialog></v-dialog> <!-- no squiggle -->
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
//import {useI18n} from "vue-i18n";
//import MarkdownModal from "@/components/helpers/MarkdownModal";

// NEW EXPERIMENTAL
import {Ref} from "vue";
import ModuleService from "@/services/ModuleService";
import {Module} from "@/helpers/types";

const modules: Ref<Module[]> = ref([]);

async function loadModules(): Promise<void> {
  modules.value = ((await ModuleService.loadModules()).data).sort((a: Module, b: Module) => a.module_id - b.module_id);
}

onBeforeMount(async () => {
  await loadModules();
})

function test(): any {
    console.log(modules);
}
// NEW EXPERIMENTAL

/* const tests = ref([
  {
    id: 1,
    title: "OOP",
    description: "OOP ist ein Banger",
  },
  {
    id: 2,
    title: "BKP",
    description: "BKP hilft allen super gut toll",
  },
]); */

//const i18n = useI18n();

function getModuleTemplate() {
  return {
    id: nextModuleId(),
    course: '',
    title: '',
    description: '',
    content: '',
  };
}

const editModuleDialog = ref({
  show: false,
  target: null,
});

const deleteModuleDialog = ref({
  show: false,
  target: null,
});

const newModuleDialog = ref({
  show: false,
  target: getModuleTemplate(),
});

const PLACEHOLDERTRUE = ref(true);

function nextModuleId() {
  return modules.value.map(u => u.id).sort().pop() + 1;
}


</script>