<template>
  <v-container>
    <v-card v-if="!embedded">
      <v-row :no-gutters="true">
        <v-col cols="2" justify="start">
          <v-tooltip bottom>
            <template v-slot:activator="{ props: tooltip3 }">
              <v-btn
                  v-bind="tooltip3"
                  @click="goBack()"
                  class="back-button"
                  icon
              >
                <v-icon icon="mdi-arrow-left"/>
              </v-btn>
            </template>
            <span v-html="$t('buttons.back')"/>
          </v-tooltip>
        </v-col>
        <v-col>
          <v-card-title>{{ module.name }}</v-card-title>
        </v-col>
        <v-col>
          <v-row justify="end">
            <v-tooltip bottom>
              <template v-slot:activator="{ props: tooltip3 }">
                <v-btn
                    v-bind="tooltip3"
                    class="mr-4 mb-2 ml-0"
                    @click="changeVisibility(module)"
                >
                  <v-icon size="large" :icon="lock.value" :color="lock.color"></v-icon>
                </v-btn>
              </template>
              <span v-if="module.modulePublic" v-html="$t('buttons.visibility_public')" />
              <span v-else v-html="$t('buttons.visibility_private')" />
            </v-tooltip>
            <v-btn @click="manageTagsDialog.show = true">
              {{ $t("module_manager.edit_tag_button") }}
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <br/>
    <v-btn
        @click="manageTagsDialog.show = true"
        v-if="embedded"
        class="embeddedEditTagsButton"
        tabindex="0"
    >
      {{ $t("module_manager.edit_tag_button") }}
    </v-btn>
    <br/>
    <br/>
    <v-card>
      <v-row>
        <v-col cols="auto">
          <v-btn
              class="add-user-btn"
              @click="manageUsersDialog.show = true"
              color="secondary"
              v-html="$t('module_manager.add_user')"
          />
        </v-col>
        <v-col cols="max">
          <v-text-field
              :label="$t('module_manager.search_user')"
              v-model="userFilter"
              prepend-icon="mdi-magnify"
              single-line
              hide-details/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-table>
            <thead>
            <tr>
              <th class="text-left">{{ $t("module_manager.name") }}</th>
              <th class="text-left">{{ $t("module_manager.roles") }}</th>
              <th class="text-right"/>
              <th class="text-right"/>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in moduleUsers.filter(u => displayUserForCurrentFilter(u))" v-bind:key="user.user_id">
              <td class="text-left">{{ user.name }}</td>
              <td class="text-left">{{ user.module_role.name }}</td>
              <td class="placeholder-td"></td>
              <td class="text-right">
                <v-tooltip top>
                  <template v-slot:activator="{ props: tooltip }">
                    <v-btn
                        @click="
                          editPrivilegeDialog.show = true;
                          editPrivilegeDialog.userRole = user.module_role.name;
                          editPrivilegeDialog.user = user;
                        "
                        class="manage-button"
                        color="primary"
                        v-bind="tooltip"
                    >
                      <v-icon icon="mdi-cog"/>
                    </v-btn>
                  </template>
                  <span v-html="$t('module_manager.edit_privilege')"/>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ props: tooltip2 }">
                    <v-btn
                        class="manage-button"
                        @click="deleteModuleUser(user)"
                        color="error"
                        v-bind="tooltip2"
                    >
                      <v-icon icon="mdi-delete"/>
                    </v-btn>
                  </template>
                  <span v-html="$t('buttons.remove')"/>
                </v-tooltip>
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-card>
    <v-card>
      <v-row>
        <v-col cols="9">
          <v-text-field
              :label="$t('module_manager.new_link')"
              v-model="newLink"
              prepend-icon="mdi-link"
              single-line
              hide-details
              @keyup.enter="addLink(newLink)"
              tabindex="0"
              />
        </v-col>
        <v-col cols="3">
          <v-btn
              @click="addLink(newLink)"
          >
            {{ $t("module_manager.add_link") }}
          </v-btn>
        </v-col>
      </v-row>
      <v-table>
        <thead>
        <tr>
          <th class="text-left">{{ $t("module_page.materials") }}</th>
          <th class="text-right"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="link in referralLinks" :key="link.module_link_id" >
          <td class="text-left">
            <v-icon style="padding-right: 1em">mdi-link</v-icon>
            <a :href="link.link" target="_blank" rel="noopener noreferrer">{{link.link}}</a></td>
          <td></td>
          <td class="text-right">
            <v-tooltip top>
              <template v-slot:activator="{ props: tooltip2 }">
                <v-btn
                    class="manage-button"
                    @click="deleteLink(link.module_link_id)"
                    color="error"
                    v-bind="tooltip2"
                >
                  <v-icon icon="mdi-delete"/>
                </v-btn>
              </template>
              <span v-html="$t('buttons.remove')"/>
            </v-tooltip></td>
        </tr>
        <tr v-for="asset in referralAssets" :key="asset.moduleAsset.module_asset_id" >
          <td class="text-left" @click="AssetService.downloadAssetPrompt(asset.genericAsset.asset_id, asset.genericAsset.filename)">
            <v-icon style="padding-right: 1em">mdi-file</v-icon>
            {{ asset.genericAsset.filename }}</td>
          <td class="text-right">
            <span v-if="asset.genericAsset.public"><v-icon style="padding-right: 8px">
            mdi-earth
          </v-icon>{{$t('module_manager.publicStatus')}}</span>
          </td>
          <td class="text-right">
            <v-tooltip top>
              <template v-slot:activator="{ props: tooltip2 }">
                <v-btn
                    class="manage-button"
                    @click="deleteAsset(asset)"
                    color="error"
                    v-bind="tooltip2"
                >
                  <v-icon icon="mdi-delete"/>
                </v-btn>
              </template>
              <span v-html="$t('buttons.remove')"/>
            </v-tooltip></td>
        </tr>
        </tbody>
      </v-table>
      <v-row>
        <v-col cols="9">
          <v-file-input
              v-model="fileUpload"
              :label="$t('module_manager.select_file')">
              tabindex=0
          </v-file-input>
        </v-col>
        <v-col cols="3">
          <v-btn
              @click="uploadAsset()"
              tabindex="0">
            {{$t('buttons.upload_file')}}
          </v-btn>
          <v-checkbox
              v-model="publicUpload"
              :label="$t('module_manager.public_upload')"/>
        </v-col>
      </v-row>
    </v-card>
    <!-- Edit tags dialog start -->
    <!-- [Desktop] -->
    <v-dialog
      v-model="manageTagsDialog.show"
      :retain-focus="false"
      transition="slide-y-transition"
    >
      <v-card top="20%" class="dialogWidth">
        <v-card-title> {{ $t("module_manager.edit_tag") }}</v-card-title>
        <v-card-text>
          <v-table :fixed-header="true" height="400px">
            <thead>
            <tr>
              <th class="hide-btn-behind-header">
                {{ $t("module_manager.tag") }}
              </th>
              <th class="hide-btn-behind-header"></th>
              <th class="hide-btn-behind-header"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="tag in tagsCurrent" v-bind:key="tag.tag_id">
              <td class="text-center">
                <v-icon size="small" :icon="tag.icon.reference"/>
              </td>
              <td>
                <v-container class="test-class">
                  <v-text-field
                      vertical-align="middle"
                      class="centered-input extend"
                      v-model="tag.name"
                  />
                </v-container>
              </td>
              <td class="text-right">
                <v-btn
                    class="manage-button"
                    @click="editTag(tag)"
                    color="primary"
                >
                  <v-icon icon="mdi-content-save"></v-icon>
                </v-btn>
                <v-btn
                    class="manage-button"
                    @click="removeTag(tag)"
                    color="error"
                >
                  <v-icon icon="mdi-delete"></v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-card-text>
        <v-card-actions>
          <v-btn
              @click="manageTagsDialog.show = false"
              color="error"
              v-html="$t('buttons.close')"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- [Desktop] -->
    <!-- Edit tags dialog end -->

    <!-- Edit users dialog start -->
    <!-- [Desktop] -->
    <v-dialog
        class="d-none d-md-flex"
        v-model="editPrivilegeDialog.show"
        :retain-focus="false"
        transition="slide-y-transition"
    >
      <v-card top="15%" width="50vw">
        <v-card-title> {{ $t("module_manager.edit_privilege") }}</v-card-title>
        <v-card-text>
          <v-radio-group v-model="editPrivilegeDialog.userRole">
            <v-radio
                :label="$t('module_manager.student')"
                :key="1"
                value="student"
            />
            <v-radio
                :label="$t('module_manager.tutor')"
                value="tutor"
                :key="2"
            />
            <v-radio
                :label="$t('module_manager.teacher')"
                value="teacher"
                :key="3"
            />
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-btn
              @click="
              editPrivilegeDialog.show = false;
              editPrivilegeDialog.userRole = null;
              editPrivilegeDialog.user = null;
            "
              color="error"
              v-html="$t('buttons.close')"
          />
          <v-btn
              @click="
              editPrivilegeDialog.show = false;
              setUserRole(
                editPrivilegeDialog.user,
                editPrivilegeDialog.userRole
              );
            "
              color="primary"
              v-html="$t('buttons.save')"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- [Desktop] -->
    <!-- Edit users dialog end -->

    <!-- Enrol users dialog start -->
    <!-- [Desktop] -->
    <v-dialog
        v-model="manageUsersDialog.show"
        :retain-focus="false"
        transition="slide-y-transition"
    >
      <v-card top="20%" min-width="50vw">
        <v-card-title> {{ $t("module_manager.add_user") }}</v-card-title>
        <v-text-field
            class="mb-4 mt-1"
            :label="$t('module_manager.search_user')"
            v-model="userFilter"
            prepend-icon="mdi-magnify"
            single-line
            hide-details/>
        <v-table :fixed-header="true" height="400px">
          <thead>
          <tr>
            <th>{{ $t("module_manager.name") }}</th>
            <th class="hide-btn-behind-header"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in filteredUsers.filter(u => displayUserForCurrentFilter(u))" v-bind:key="user.user_id">
            <td>{{ user.name }}</td>
            <td class="text-right">
              <v-btn @click="addModuleUser(user.user_id)" color="primary">
                <v-icon icon="mdi-account-plus"></v-icon>
              </v-btn>
            </td>
          </tr>
          </tbody>
        </v-table>
        <v-card-actions>
          <v-btn
              @click="manageUsersDialog.show = false"
              color="error"
              v-html="$t('buttons.close')"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- [Desktop] -->
    <!-- Edit users dialog end -->
  </v-container>
</template>

<script setup lang="ts">
import {onBeforeMount, Ref, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import UserService from "@/services/UserService";
import ModuleService from "@/services/ModuleService";
import TagService from "@/services/TagService";
import ExerciseService from "@/services/ExerciseService";
import {Asset, Exercise, Module, ModuleUser, Role, Tag, User} from "@/helpers/types";
import {defineProps} from "vue";
import ReferralService from "@/services/ReferralService";
import {AxiosError, AxiosResponse} from "axios";
import AssetService from "@/services/AssetService";

//Router
const route = useRoute();
const router = useRouter();
const module: Ref<Module> = ref({}) as Ref<Module>;
const moduleUsers: Ref<ModuleUser[]> = ref([]);
const allUsers: Ref<ModuleUser[]> = ref([]);
const filteredUsers: Ref<ModuleUser[]> = ref([]);
const tagsCurrent: Ref<Tag[]> = ref([]);
const userFilter: Ref<string> = ref("");
const lock = ref({
  value: "mdi-lock",
  color: "error"
});
const newLink = ref("");
const fileUpload = ref();

defineProps<{
  embedded?: boolean;
}>();

function displayUserForCurrentFilter(user: ModuleUser | User): boolean {
  return (user.name + ' ' + user.email + ' ' + user.username).toLowerCase().includes(userFilter.value.toLowerCase());
}

async function loadModule(): Promise<void> {
  ModuleService.getModule(
      route.params.module instanceof Array
          ? route.params.module[0]
          : route.params.module
  )
      .then((res) => {
        module.value = res.data;
        module.value.modulePublic ? lock.value.value = 'mdi-lock-open' : lock.value.value = 'mdi-lock';
        module.value.modulePublic ? lock.value.color = 'success' : lock.value.color = 'error';
      })
      .then(() => {
        loadAllUsers().then(() => {
          loadFilteredUsers();
        });
        loadModuleUsers();
        getCurrentTags();
        fetchAssets();
      });
}


class ModuleAsset{

  module_asset_id: number
  module_id: number
  asset_id: number

  constructor(  module_asset_id: number,
                module_id: number,
                asset_id: number,) {
    this.module_asset_id = module_asset_id;
    this.module_id = module_id;
    this.asset_id = asset_id;
  }
}

class AssetWrapper{
  moduleAsset: ModuleAsset
  genericAsset: Asset

  constructor(moduleAsset: ModuleAsset, genericAsset: any) {
    this.moduleAsset = moduleAsset;
    this.genericAsset = genericAsset;
  }
}
const referralLinks = ref();
const referralAssets = ref<any>([]);
const publicUpload = ref<boolean>();

function fetchAssets(){
  ReferralService.getModuleReferralLinks(module.value).then((response: AxiosResponse) => {
    referralLinks.value = response.data
  });
  referralAssets.value = [];
  ReferralService.getModuleReferralAssets(module.value).then((response: AxiosResponse) => {
    //module assets as returned are asset ids, the asset needs to be fetched to be usable
    response.data.forEach((module_asset: ModuleAsset) => {
      AssetService.getAsset(module_asset.asset_id).then((res) => {
        referralAssets.value.push(new AssetWrapper(module_asset, res.data));
      })
    })
  })
}

/*
 there is a difference between deleting an asset from the module and deleting the asset,
 */
function deleteAsset(wrappedAsset: AssetWrapper){
  deleteAssetReference(wrappedAsset).then(() => {
    AssetService.delAsset(wrappedAsset.genericAsset.asset_id).then(() => {
      fetchAssets();
    });
  })
}

function deleteAssetReference(wrappedAsset: AssetWrapper){
  return new Promise(function(resolve, reject) {
    ReferralService.delModuleReferralAsset(module.value, wrappedAsset.moduleAsset.module_asset_id).then((res: AxiosResponse) => {
      resolve(res);
    }).catch((error: AxiosError) => {
      reject(error);
    })
  })
}
function deleteLink(module_link_id: number){
  ReferralService.delModuleReferralLink(module.value, module_link_id).then((res: AxiosResponse) => {
    fetchAssets();
  })
}

function addLink(link: string){
  ReferralService.addModuleReferralLink(module.value, link).then((res: AxiosResponse) => {
    fetchAssets();
  })
}

function uploadAsset(){
  console.log(fileUpload.value)
  //v-checkbox returns type boolean|undefined which the asset type doesn't allow, this workaround is necessary
  const publicBool: boolean = !!publicUpload.value;
  const fileReader: FileReader = new FileReader();
  const file: File = fileUpload.value[0];
  fileReader.readAsBinaryString(file);
  fileReader.onload = function() {
    console.log(fileReader.result);
    //this is necessary, backend expects a base64 encoded string
    if (typeof fileReader.result === "string"){
      AssetService.addAsset({
        asset_id : 0,
        asset: btoa(fileReader.result),
        public: publicBool,
        filename: file.name,
      }).then((response: AxiosResponse) => {
        ReferralService.addModuleReferralAsset(module.value, response.data.asset_id).then((response: AxiosResponse) =>
        {
          console.log(response);
          fetchAssets();
          fileUpload.value = [];
        });
      })
    }

  };
}

async function loadModuleUsers(): Promise<void> {
  moduleUsers.value = (
      await ModuleService.getModuleUsers(module.value)
  ).data.sort((a: ModuleUser, b: ModuleUser) => a.user_id - b.user_id);
}

async function loadAllUsers(): Promise<void> {
  allUsers.value = (await UserService.getUsers()).data.sort(
      (a: ModuleUser, b: ModuleUser) => a.user_id - b.user_id
  );
}

async function loadFilteredUsers(): Promise<void> {
  filteredUsers.value = allUsers.value
      .filter(
          (user) => !moduleUsers.value.find(
              (moduleUser) => moduleUser.user_id === user.user_id
          )
      ) as ModuleUser[];
}

onBeforeMount(async () => {
  await loadModule();
});

function addModuleUser(number: number): void {
  const user = ref({}) as Ref<ModuleUser>;
  const moduleUser = ref({}) as Ref<ModuleUser>;
  user.value = allUsers.value.filter((a) => a.user_id == number)[0];
  moduleUser.value = getUserTemplate();
  moduleUser.value.user_id = user.value.user_id;
  moduleUser.value.name = user.value.name;
  moduleUser.value.username = user.value.username;
  moduleUser.value.email = user.value.email;
  ModuleService.addModuleUser(module.value, moduleUser.value)
      .then(() => loadModuleUsers())
      .then(() => loadFilteredUsers());
}

function deleteModuleUser(user: ModuleUser): void {
  ModuleService.delModuleUser(module.value, user)
      .then(() => loadModuleUsers())
      .then(() => loadFilteredUsers());
}

function getUserTemplate(): ModuleUser {
  return {
    user_id: 0,
    module_role: {
      role_id: 5,
      name: "tutor",
    },
    name: "",
    username: "",
    email: "",
  };
}

function goBack(): void {
  router.back();
}

const manageTagsDialog = ref({
  show: false,
});

const manageUsersDialog = ref({
  show: false,
});

const editPrivilegeDialog = ref({
  show: false,
  userRole: "",
  user: undefined,
}) as Ref<{
  show: boolean;
  userRole: string;
  user: ModuleUser | undefined;
}>;

function getCurrentTags(): void {
  TagService.getModuleTags(module.value).then(res => {
    const filteredTags: Ref<Tag[]> = ref([]);
    res.data.forEach((tag: Tag) => filteredTags.value.map(t => t.tag_id).includes(tag.tag_id) ? 'nothing' : filteredTags.value.push(tag));
    tagsCurrent.value = filteredTags.value;
  })
}

function editTag(toBeEditedTag: Tag): void {
  TagService.getAllTags().then((res) => {
    let tagFound = false;
    res.data.forEach((foundTag: Tag) => {
      //If find tag already exists with the new name
      if (foundTag.name.toLowerCase() == toBeEditedTag.name.toLowerCase()) {
        ExerciseService.getExercisesForModule(module.value.module_id).then(
            (res) => {
              res.data.forEach((exercise: Exercise) => {
                exercise.tags.forEach((exerciseTag: Tag) => {
                  if (exerciseTag.tag_id == toBeEditedTag.tag_id) {
                    tagFound = true;
                    TagService.addTagToExercise(foundTag, exercise);
                    TagService.delTagFromExercise(exerciseTag, exercise);
                    TagService.delTagFromModule(module.value, toBeEditedTag);
                    console.log(
                        TagService.addTagToModule(module.value, foundTag)
                    );
                  }
                });
              });
            }
        );
      }
    });
    //There is no other tag with the same name
    if (!tagFound) {
      const newTag = {
        tag_id: 0,
        name: toBeEditedTag.name,
        icon: {
          icon_id: 5,
          reference: "mdi-laptop",
        },
      };
      TagService.addTag(newTag).then(() => {
        TagService.getAllTags().then((res) => {
          res.data.forEach((allTag: Tag) => {
            if (allTag.name.toLowerCase() == newTag.name.toLowerCase()) {
              console.log(allTag);
              ExerciseService.getExercisesForModule(
                  module.value.module_id
              ).then((res) => {
                res.data.forEach((exercise: Exercise) => {
                  exercise.tags.forEach((exTag: Tag) => {
                    if (exTag.tag_id == toBeEditedTag.tag_id) {
                      TagService.addTagToExercise(allTag, exercise);
                      TagService.delTagFromExercise(exTag, exercise);
                      TagService.addTagToModule(module.value, allTag);
                      TagService.delTagFromModule(module.value, exTag);
                    }
                  });
                });
              });
            }
          });
        });
      });
    }
  });
}

function removeTag(tag: Tag): void {
  TagService.delTagFromModule(module.value, tag).then(() => getCurrentTags());
  ExerciseService.getExercisesForModule(module.value.module_id).then((res) => {
    const resData = res.data;
    resData.forEach((ex: Exercise) => {
      ex.tags.forEach((exTag: Tag) => {
        if (exTag.tag_id == tag.tag_id) {
          TagService.delTagFromExercise(tag, ex);
        }
      });
    });
  });
}

function setUserRole(user: ModuleUser, role: string): void {
  UserService.getRoles().then((res) => {
    user.module_role = res.data.find((a: Role) => a.name == role);
    ModuleService.editModuleUser(module.value, user); // intentionally not awaited, api does not update user role}
  });
}

function changeVisibility(module: Module) {
  const changedModule: Ref<Module> = ref(module);
  changedModule.value.modulePublic = !changedModule.value.modulePublic;
  changedModule.value.modulePublic ? lock.value.value = 'mdi-lock-open' : lock.value.value = 'mdi-lock';
  changedModule.value.modulePublic ? lock.value.color = 'success' : lock.value.color = 'error';
  ModuleService.editModule(changedModule.value);
}
</script>

<style scoped>
.manage-button {
  margin-right: 1em;
}

.add-user-btn {
  margin-top: 1em;
  margin-bottom: -1em;
}

.centered-input >>> input {
  text-align: center;
}

.test-class {
  margin-bottom: -2.5em;
}

.extend {
  width: 15em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hide-btn-behind-header {
  z-index: 1;
}

.embeddedEditTagsButton {
  margin-right: auto;
  margin-left: auto;
  display: block;
}

.dialogWidth {
  width: 50vw;
}
@media (max-width: 1280px) {
  .dialogWidth {
    width: 90vw;
  }
}
</style>
