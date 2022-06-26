<template>
  <div>
    <v-card elevation="0" rounded="0" role="main">
      <!-- main table -->
      <v-table
          :fixed-header="true"
          density="compact">
        <thead>
        <tr>
          <th>{{ $t("admin.modules.title") }}</th>
          <th>{{ $t("admin.modules.description") }}</th>
          <th>{{ $t("admin.modules.actions") }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="module in currentPage" v-bind:key="module.id">
          <td>{{ module.name }}</td>
          <td class="td-desc" v-if="module.description && display.width.value < 500"><p class="desc">
            {{ module.description.substring(0, 48) }}...</p></td>
          <td class="td-desc" v-else-if="module.description"><p class="desc">{{ module.description }}</p></td>
          <td class="td-desc" v-else style="opacity: 70%">
            <p class="desc">{{ $t("admin.modules.no_description") }}</p>
          </td>
          <td>
            <v-tooltip right>
              <template v-slot:activator="{ props: tooltip1 }">
                <v-btn
                    @click="
                  editModuleDialog.show = true;
                  editModuleDialog.target = module;
                "
                    icon="mdi-file-document-edit"
                    small
                    elevation="0"
                    color="primary"
                    class="ma-1"
                    rounded="0"
                    variant="outlined"
                    v-bind="tooltip1"
                />
              </template>
              <span v-html="$t('buttons.edit')"/>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ props: tooltip2 }">
                <v-btn
                    @click="
                  deleteModuleDialog.show = true;
                  deleteModuleDialog.target = module;
                "
                    icon="mdi-file-remove"
                    small
                    elevation="0"
                    color="error"
                    class="ma-1"
                    rounded="0"
                    variant="outlined"
                    v-bind="tooltip2"
                />
              </template>
              <span v-html="$t('buttons.delete')"/>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ props: tooltip }">
                <v-btn
                    @click="visitModule(module)"
                    icon="mdi-open-in-new"
                    small
                    elevation="0"
                    color="success"
                    class="ma-1"
                    rounded="0"
                    variant="outlined"
                    v-bind="tooltip"
                />
              </template>
              <span v-html="$t('buttons.visit')"/>
            </v-tooltip>
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
    <v-row>
      <v-col cols="4" sm="3">
        <v-select
            :items="numbers"
            :label="itemsPerPageLabel"
            v-model="itemsPerPage">
        </v-select>
      </v-col>
      <v-col cols="12" sm="9">
        <v-pagination
            v-model="currentPageNumber"
            :length="length"
            total-visible="5"
        ></v-pagination>
      </v-col>
    </v-row>
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
            {{
              $t("admin.modules.delete_confirm", [
                deleteModuleDialog.target.name,
              ])
            }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
              @click="deleteModuleDialog.show = false"
              v-html="$t('buttons.cancel')"
          />
          <v-btn
              color="error"
              @click="
              deleteModuleDialog.show = false;
              deleteModule(deleteModuleDialog.target);
            "
              v-html="$t('buttons.delete')"
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
import {onBeforeMount, Ref, ref, watch} from "vue";
import {Module} from "@/helpers/types";
import ModuleService from "@/services/ModuleService";
import {useDisplay} from "vuetify";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

const display = useDisplay();
const router = useRouter();

const modules: Ref<Module[]> = ref([]);
const currentPage: Ref<Module[]> = ref([]);
const currentPageNumber = ref(1);
const itemsPerPage = ref(3);
const numbers = [1,3,5,10,20,50];
const length = ref(3);
const i18n = useI18n();
const itemsPerPageLabel = i18n.t('module_search.module_per_page')

async function loadModules(): Promise<void> {
  modules.value = (await ModuleService.getModules()).data.sort(
      (a: Module, b: Module) => a.module_id - b.module_id
  );
}

onBeforeMount(async () => {
  await loadModules();
  // let apiModules = (await ModuleService.getModules()).data;
  // apiModules.forEach((result : Module) => {
  //   modules.value.push(result);
  // });
  currentPage.value = modules.value.slice((currentPageNumber.value - 1) * itemsPerPage.value, currentPageNumber.value * itemsPerPage.value)
  length.value = Math.ceil(modules.value.length/itemsPerPage.value);
});

watch(currentPageNumber, (newNumber) => {
  currentPage.value = modules.value.slice((newNumber - 1) * itemsPerPage.value, newNumber * itemsPerPage.value)
})

watch(itemsPerPage, (newNumber) => {
  currentPageNumber.value = 1
  currentPage.value = modules.value.slice((currentPageNumber.value - 1) * newNumber, currentPageNumber.value * newNumber)
  length.value = Math.ceil(modules.value.length/newNumber)
})
 // console.log(modules.value);


function visitModule(module: Module): void {
  router.push('/' + module.module_id);
}

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

function getModuleTemplate(): Module {
  return {
    module_id: 0,
    name: "",
    description: "",
  };
}
</script>

<style scoped>
.desc {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>