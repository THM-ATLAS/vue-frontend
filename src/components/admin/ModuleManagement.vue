<template>
  <div>
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
                @click="
                  editModuleDialog.show = true;
                  editModuleDialog.target = module;
                "
                icon="mdi-file-document-edit"
                small
                elevation="0"
                color="primary"
                class="mr-2"
                rounded="0"
                variant="outlined"
              />
              <v-btn
                @click="
                  deleteModuleDialog.show = true;
                  deleteModuleDialog.target = module;
                "
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

    <!-- edit module dialog -->
    <v-dialog
      v-model="editModuleDialog.show"
      :scrollable="true"
      :retain-focus="false"
    >
      <v-card top="20%" width="50vw">
        <v-card-title>
          <span class="headline">Modul bearbeiten</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editModuleDialog.target.name" label="Name" />
          <v-textarea
            v-model="editModuleDialog.target.description"
            label="Beschreibung"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="editModuleDialog.show = false"
            v-html="$t('buttons.cancel')"
          />
          <v-btn
            color="primary"
            @click="editModule(editModuleDialog.target)"
            v-html="$t('buttons.save')"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete module dialog -->
    <v-dialog
      v-model="deleteModuleDialog.show"
      :scrollable="true"
      :retain-focus="false"
    >
      <v-card top="20%" width="50vw">
        <v-card-title>
          <span class="headline">Modul löschen</span>
        </v-card-title>
        <v-card-text>
          <p>
            Das Modul '<b>{{ editModuleDialog.target.name }}</b
            >' wirklich löschen?
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="deleteModuleDialog.show = false"
            v-html="$t('buttons.cancel')"
          />
          <v-btn
            color="primary"
            @click="deleteModule(deleteModuleDialog.target)"
            v-html="$t('buttons.save')"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- new module dialog -->
    <v-dialog
      v-model="newModuleDialog.show"
      :scrollable="true"
      :retain-focus="false"
    >
      <v-card top="20%" width="50vw">
        <v-card-title>
          <span class="headline">Neues Modul erstellen</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Name" />
          <v-textarea label="Beschreibung" />
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="newModuleDialog.show = false"
            v-html="$t('buttons.cancel')"
          />
          <v-btn
            color="primary"
            @click="createModule()"
            v-html="$t('buttons.save')"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn @click="test()"> test </v-btn>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, Ref, ref} from "vue";
import {Module} from "@/helpers/types";
import ModuleService from "@/services/ModuleService";
//import {useI18n} from "vue-i18n";
//import MarkdownModal from "@/components/helpers/MarkdownModal";



const modules: Ref<Module[]> = ref([]);

async function loadModules(): Promise<void> {
  modules.value = (await ModuleService.loadModules()).data.sort(
    (a: Module, b: Module) => a.module_id - b.module_id
  );
}

onBeforeMount(async () => {
  await loadModules();
});

function editModule(module: Module) {
  ModuleService.editModule(module).then(() => loadModules());
}

async function deleteModule(module: Module) {
  ModuleService.delModule(module).then(async () => loadModules());
}

async function createModule() {
  await ModuleService.addModule(newModuleDialog.value.target);
  await loadModules();
  newModuleDialog.value.target = getModuleTemplate();
  newModuleDialog.value.show = false;
}

function test(): any {
  console.log(modules);
}

//const i18n = useI18n();

function getModuleTemplate() {
  return {
    id: nextModuleId(),
    title: "",
    description: "",
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

function nextModuleId() {
  return (
    modules.value
      .map((u) => u.id)
      .sort()
      .pop() + 1
  );
}
</script>
