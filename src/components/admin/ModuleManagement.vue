<template>
  <div>
    <v-card elevation="0" rounded="0" role="main">
      <!-- main table -->
      <v-table>
        <thead>
          <tr>
            <th>{{ $t("admin.modules.title") }}</th>
            <th>{{ $t("admin.modules.description") }}</th>
            <th>{{ $t("admin.modules.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="module in modules" v-bind:key="module.id">
            <td>{{ module.name }}</td>
            <td v-if="module.description">{{ module.description }}</td>
            <td v-else style="opacity: 70%">
              {{ $t("admin.modules.no_description") }}
            </td>
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

      <!-- new module button -->
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
          <span class="headline">{{ $t("admin.modules.edit") }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editModuleDialog.target.name"
            :label="$t('admin.modules.title')"
          />
          <v-textarea
            v-model="editModuleDialog.target.description"
            :label="$t('admin.modules.description')"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="editModuleDialog.show = false"
            v-html="$t('buttons.cancel')"
          />
          <v-btn
            color="primary"
            @click="
              editModuleDialog.show = false;
              editModule(editModuleDialog.target);
            "
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
          <span class="headline">{{ $t("admin.modules.delete") }}</span>
        </v-card-title>
        <v-card-text>
          <p>
            <!-- not working? -->
            {{
              $t("admin.modules.delete_confirm", [
                deleteModuleDialog.target.name,
              ])
            }}
            <!-- not working? -->
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="deleteModuleDialog.show = false"
            v-html="$t('buttons.cancel')"
          />
          <v-btn
            color="primary"
            @click="
              deleteModuleDialog.show = false;
              deleteModule(deleteModuleDialog.target);
            "
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
          <span class="headline">{{ $t("admin.modules.new") }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="newModuleForm">
            <v-text-field
                @change="$refs.newModuleForm.validate()"
              :label="$t('admin.modules.title')"
              v-model="newModuleDialog.target.name"
              required
            />
            <v-textarea
              :label="$t('admin.modules.description')"
              v-model="newModuleDialog.target.description"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="newModuleDialog.show = false"
            v-html="$t('buttons.cancel')"
          />
          <v-btn
            color="primary"
            @click="
              newModuleDialog.show = false;
              createModule();
            "
            v-html="$t('buttons.save')"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, Ref, ref } from "vue";
import { Module } from "@/helpers/types";
import ModuleService from "@/services/ModuleService";

const modules: Ref<Module[]> = ref([]);

async function loadModules(): Promise<void> {
  modules.value = (await ModuleService.loadModules()).data.sort(
    (a: Module, b: Module) => a.module_id - b.module_id
  );
}

onBeforeMount(async () => {
  await loadModules();
});

async function createModule() {
  await ModuleService.addModule(newModuleDialog.value.target);
  await loadModules();
  newModuleDialog.value.target = getModuleTemplate();
  newModuleDialog.value.show = false;
}

function editModule(module: Module) {
  ModuleService.editModule(module).then(() => loadModules());
}

async function deleteModule(module: Module) {
    console.log(module);
  ModuleService.delModule(module).then(async () => loadModules());
}

const newModuleDialog = ref({
  show: false,
  target: getModuleTemplate(),
});

const editModuleDialog = ref({
  show: false,
  target: null,
});

const deleteModuleDialog = ref({
  show: false,
  target: null,
});

function getModuleTemplate() {
  return {
    id: nextModuleId(),
    name: "",
    description: "",
  };
}

function nextModuleId() {
  return modules.value.map((u) => u.module_id).pop() + 1;
}
</script>
