<template>
  <div>
    <v-text-field
        class="mb-4 mt-1"
        :label="$t('admin.users.search_user')"
        v-model="userFilter"
        prepend-icon="mdi-magnify"
        single-line
        hide-details
        @input="applySearch"/>
    <v-card elevation="0" rounded="0" role="main">
      <v-table>
        <thead>
        <tr>
          <th>{{ $t('admin.users.name') }}</th>
          <th>{{ $t('admin.users.username') }}</th>
          <th>{{ $t('admin.users.email') }}</th>
          <th>{{ $t('admin.users.roles') }}</th>
          <th>{{ $t('admin.users.actions') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in currentPage" v-bind:key="user.user_id">
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <v-chip v-for="role in user.roles" :closable="true"
                    @click:close="removeRole(user, role)" class="mr-1"
                    v-bind:key="role.role_id">
              {{ getRole(role.name) }}
            </v-chip>

            <v-chip prepend-icon="mdi-plus" @click="editRolesDialog.show = true; editRolesDialog.target = user"
                    class="mr-1">
              {{ $t('buttons.new') }}
            </v-chip>
          </td>
          <td>
            <v-tooltip right>
              <template v-slot:activator="{ props: tooltip }">
                <v-btn
                    :disabled="isLDAPuser(user)"
                    @click="editUserDialog.show = true; editUserDialog.target = user"
                    icon="mdi-account-edit"
                    small
                    elevation="0"
                    :color="isLDAPuser(user) ? 'grey' : 'primary'"
                    class="ma-1"
                    rounded="0"
                    variant="outlined"
                    v-bind="tooltip"
                />
              </template>
              <span v-html="$t('buttons.edit')"/>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ props: tooltip }">
                <v-btn
                    @click="deleteUserDialog.show = true; deleteUserDialog.target = user"
                    icon="mdi-account-remove"
                    small
                    elevation="0"
                    color="error"
                    class="ma-1"
                    rounded="0"
                    variant="outlined"
                    v-bind="tooltip"
                />
              </template>
              <span v-html="$t('buttons.delete')"/>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ props: tooltip }">
                <v-btn
                    @click="visitUser(user)"
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
              <span v-html="$t('buttons.visit_profile')"/>
            </v-tooltip>
          </td>
        </tr>
        </tbody>

      </v-table>

      <!-- new user -->
      <div>
        <v-btn
            @click="newUserDialog.show = true"
            icon="mdi-account-plus"
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
            :label="$t('admin.users.users_per_page')"
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
    <!-- role dialog -->
    <v-dialog
        v-model="editRolesDialog.show"
        :scrollable="true"
        :retain-focus="false"
    >
      <v-card top="20%" class="roleDialogWidth">
        <v-card-title>
          <span class="headline">{{ $t('admin.users.roles') }}</span>
        </v-card-title>
        <v-card-text>
          <template v-for="role in roles" v-bind:key="role.role_id">
            <v-checkbox v-if="role.name !== 'tutor'" v-model="editRolesDialog.target.roles"
                        :value="role" :label="getRole(role.name)" @change="editUser(editRolesDialog.target)"/>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="editRolesDialog.show = false">{{ $t('buttons.close') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- new user dialog -->
    <v-dialog
        v-model="newUserDialog.show"
        :scrollable="true"
        :retain-focus="false"
    >
      <v-card top="20%" class="dialogWidth">
        <v-card-title>
          <span class="headline">{{ $t('admin.users.new') }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="newUserForm"
                  v-model="newUserFormValid"
          >
            <v-text-field
                @change="$refs.newUserForm.validate()"
                v-model="newUserDialog.target.name"
                :label="$t('admin.users.name')"
                :rules="[rules.required]"
                required
            />
            <v-text-field
                @change="$refs.newUserForm.validate()"
                v-model="newUserDialog.target.username"
                :label="$t('admin.users.username')"
                :rules="[rules.required, rules.username, rules.username_ldap]"
                :counter="32"
                required
            />
            <v-text-field
                @change="$refs.newUserForm.validate()"
                v-model="newUserDialog.target.email"
                :label="$t('admin.users.email')"
                :rules="[rules.required, rules.email]"
                required
            />
            <v-text-field
                @change="$refs.newUserForm.validate()"
                v-model="newUserDialog.target.password"
                :label="$t('admin.users.password')"
                :rules="[rules.required, rules.password]"
                required
                type="password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="newUserDialog.show = false" v-html="$t('buttons.cancel')"/>
          <v-btn :disabled="!newUserFormValid" color="primary" @click="createUser" v-html="$t('buttons.save')"/>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- edit user dialog -->
    <v-dialog
        v-model="editUserDialog.show"
        :scrollable="true"
        :retain-focus="false"
    >
      <v-card top="20%" class="dialogWidth">
        <v-card-title>
          <span class="headline">{{ $t('admin.users.edit') }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="editUserForm"
                  v-model="editUserFormValid"
          >
            <v-text-field
                v-model="editUserDialog.target.name"
                :label="$t('admin.users.name')"
                :rules="[rules.required]"
            />
            <v-text-field
                v-model="editUserDialog.target.username"
                :label="$t('admin.users.username')"
                :rules="[rules.required, rules.username, rules.username_ldap]"
            />
            <v-text-field
                v-model="editUserDialog.target.email"
                :label="$t('admin.users.email')"
                :rules="[rules.required, rules.email]"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="editUserDialog.show = false;"
                 v-html="$t('buttons.cancel')"/>
          <v-btn
              :disabled="!editUserFormValid"
              color="primary"
              @click="editUser(editUserDialog.target);
               editUserDialog.show = false;"
              v-html="$t('buttons.save')"/>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete user dialog -->
    <v-dialog
        v-model="deleteUserDialog.show"
        :scrollable="true"
        :retain-focus="false"
    >
      <v-card top="20%" min-width="20vw">
        <v-card-title>
          <span class="headline">{{ $t('admin.users.delete') }}</span>
        </v-card-title>
        <v-card-text>
          <p>{{ $t('admin.users.delete_confirm', [deleteUserDialog.target.username]) }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="deleteUserDialog.show = false" v-html="$t('buttons.cancel')"/>
          <v-btn color="primary" @click="deleteUserDialog.show = false; deleteUser(deleteUserDialog.target)"
                 v-html="$t('buttons.delete')"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, Ref, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import UserService from "@/services/UserService";
import {User, Role} from "@/helpers/types";
import {useRouter} from "vue-router";
import { AxiosError } from "axios";

const router = useRouter();
const roles: Ref<Role[]> = ref([]);
const users: Ref<User[]> = ref([]);
const filteredUsers: Ref<User[]> = ref([]);

const currentPage: Ref<User[]> = ref([]);
const currentPageNumber = ref(1);
const itemsPerPage = ref(5);
const numbers = [1, 3, 5, 10, 20, 50];
const length = ref(3);
const i18n = useI18n();
const userFilter = ref('');

async function loadUsers(): Promise<void> {
  (await UserService.getUsers().then(res => {
    filteredUsers.value = users.value = res.data.sort((a: User, b: User) => a.user_id - b.user_id)
  })) //.data).sort((a: User, b: User) => a.user_id - b.user_id);
}

onBeforeMount(async () => {
  await loadUsers();
  roles.value = (await UserService.getRoles()).data;
  // let apiUsers = (await UserService.getUsers()).data;
  // apiUsers.forEach((result : User) => {
  //   users.value.push(result);
  // });
  applySearch()
});

watch(currentPageNumber, () => applySearch())

watch(itemsPerPage, () => applySearch())

function applySearch(): void {
  filteredUsers.value = users.value.filter((user) => {
    return (user.name + ' ' + user.username + ' ' + user.email).toLowerCase().includes(userFilter.value.toLowerCase());
  })
  currentPage.value = filteredUsers.value.slice((currentPageNumber.value - 1) * itemsPerPage.value, currentPageNumber.value * itemsPerPage.value)
  length.value = Math.ceil(filteredUsers.value.length / itemsPerPage.value)
}

// const i18n = useI18n();

const rules = {
  required: (value: any) => !!value || i18n.t("admin.users.errors.required"),
  username: (value: string) => /^[a-zA-Z\d]{3,32}$/.test(value) || i18n.t("admin.users.errors.username_invalid"),
  username_ldap: (value: string) => !/^([a-zA-Z]{4}\d{2}|hg\d+)$/.test(value) || i18n.t("admin.users.errors.username_ldap_invalid"),
  email: (value: string) => /^[a-zA-Z\d.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z\d-]+(?:\.[a-zA-Z\d-]+)*$/.test(value) || i18n.t("admin.users.errors.email_invalid"),
  password: (value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])[^ ]{8,}$/.test(value) || i18n.t("admin.users.errors.password_invalid"), // 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter one number and a special character'
};

function isLDAPuser(user: User): boolean {
  return /^([a-zA-Z]{4}\d{2}|hg\d+)$/.test(user.username);
}

function visitUser(user: User) {
  router.push('/u/' + user.user_id)
}

function getRole(role: string) {
  return i18n.t("roles." + role);
}

function getUserTemplate(): User {
  return {
    user_id: 0,
    name: '',
    username: '',
    email: '',
    password: '',
    roles: [],
  };
}

function removeRole(user: User, role: Role) {
  user.roles = user.roles.filter(r => r.role_id !== role.role_id);
  editUser(user);
}

const editRolesDialog: Ref<{ show: boolean, target: User | null }> = ref({
  show: false,
  target: null,
});

const newUserDialog: Ref<{ show: boolean, target: User | null }> = ref({
  show: false,
  target: getUserTemplate(),
});

const newUserFormValid = ref(false);
const editUserFormValid = ref(false);

const editUserDialog: Ref<{ show: boolean, target: User | null }> = ref({
  show: false,
  target: null,
});

const deleteUserDialog: Ref<{ show: boolean, target: User | null }> = ref({
  show: false,
  target: null,
});

async function createUser() {
  // newUser.value.roles = this.roles.filter(r => this.newUser.roles.includes(r.id));
  await UserService.addUser(newUserDialog.value.target as User);
  //await loadUsers();
  router.go(0)
  newUserDialog.value.target = getUserTemplate();
  newUserDialog.value.show = false;
}

function editUser(user: User) {
  UserService.editUser(user).then(() => loadUsers());
  // UserService.editPassword(user);
  /*
  users.value.forEach(u => {
    if (u.user_id === user.user_id) {
      u.name = user.name;
      u.username = user.username;
      u.email = user.email;
      if (overwritePassword)
        u.password = user.password;
    }
  });
  */
}

function deleteUser(user: User) {
  UserService.delUser(user).then(() =>
      //Pagination somehow breaks loadUsers(), switching between pages give the correct result but list reload does not happen
      //loadUsers()
      router.go(0)
  );
}

</script>

<style scoped>
.dialogWidth {
  width: 50vw;
}

@media (max-width: 1280px) {
  .dialogWidth {
    width: 80vw;
  }
}

.roleDialogWidth {
  width: 25vw;
}

@media (max-width: 1280px) {
  .roleDialogWidth {
    width: 40vw;
  }
}
</style>