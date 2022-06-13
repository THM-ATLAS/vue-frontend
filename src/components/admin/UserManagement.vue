<template>
  <div>
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
        <tr v-for="user in users" v-bind:key="user.user_id">
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <v-chip v-for="role in user.roles" :closable="true"
                    @click:close="removeRole(user, role)" class="mr-1"
                    v-bind:key="role.role_id">
              {{ role.name }}
            </v-chip>

            <v-chip prepend-icon="mdi-plus" @click="editRolesDialog.show = true; editRolesDialog.target = user"
                    class="mr-1">
              {{ $t('buttons.new') }}
            </v-chip>
          </td>
          <td>
            <v-btn
                @click="editUserDialog.show = true; editUserDialog.target = user"
                icon="mdi-account-edit"
                small
                elevation="0"
                color="primary"
                class="ma-1"
                rounded="0"
                variant="outlined"
            />
            <v-btn
                @click="deleteUserDialog.show = true; deleteUserDialog.target = user"
                icon="mdi-account-remove"
                small
                elevation="0"
                color="error"
                class="ma-1"
                rounded="0"
                variant="outlined"
            />
            <v-btn
                @click="visitUser(user)"
                icon="mdi-open-in-new"
                small
                elevation="0"
                color="success"
                class="ma-1"
                rounded="0"
                variant="outlined"
            />
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
    <!-- role dialog -->
    <v-dialog
        v-model="editRolesDialog.show"
        :scrollable="true"
        :retain-focus="false"
    >
      <v-card top="20%" min-width="25vw">
        <v-card-title>
          <span class="headline">{{ $t('admin.users.roles') }}</span>
        </v-card-title>
        <v-card-text>
          <v-checkbox v-for="role in roles" v-bind:key="role.role_id" v-model="editRolesDialog.target.roles"
                      :value="role" :label="role.name" @change="editUser(editRolesDialog.target)"/>
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
      <v-card top="20%" width="50vw">
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
                :rules="[rules.required, rules.username]"
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
            <!--v-text-field
                @change="$refs.newUserForm.validate()"
                v-model="newUserDialog.target.password"
                :label="$t('admin.users.password')"
                :rules="[rules.required, rules.password]"
                required
                type="password"
            /-->
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
      <v-card top="20%" width="50vw">
        <v-card-title>
          <span class="headline">{{ $t('admin.users.edit') }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
              v-model="editUserDialog.target.name"
              :label="$t('admin.users.name')"
              :rules="[rules.required]"
          />
          <v-text-field
              v-model="editUserDialog.target.username"
              :label="$t('admin.users.username')"
              :rules="[rules.required, rules.username]"
          />
          <v-text-field
              v-model="editUserDialog.target.email"
              :label="$t('admin.users.email')"
              :rules="[rules.required, rules.email]"
          />
          <!--v-btn
              v-if="!editUserDialog.changePassword"
              v-model="editUserDialog.changePassword"
              @click="editUserDialog.changePassword = true"
              v-html="$t('admin.users.change_password')"
          />
          <v-text-field
              v-else
              v-model="editUserDialog.target.password"
              :label="$t('admin.users.password')"
              :rules="[rules.required, rules.password]"
          /-->
        </v-card-text>
        <v-card-actions>
          <v-btn @click="editUserDialog.show = false;"
                 v-html="$t('buttons.cancel')"/>
          <v-btn
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
import {onBeforeMount, Ref, ref} from "vue";
import {useI18n} from "vue-i18n";
import UserService from "@/services/UserService";
import {User, Role} from "@/helpers/types";
import {useRouter} from "vue-router";

const router = useRouter();
const roles: Ref<Role[]> = ref([]);

const users: Ref<User[]> = ref([]);

async function loadUsers(): Promise<void> {
  users.value = ((await UserService.getUsers()).data).sort((a: User, b: User) => a.user_id - b.user_id);
}

onBeforeMount(async () => {
  await loadUsers();
  roles.value = (await UserService.getRoles()).data;
})

console.log(users.value);

const i18n = useI18n();

const rules = {
  required: (value: any) => !!value || i18n.t("admin.users.errors.required"),
  username: (value: string) => /^[a-zA-Z\d]{3,32}$/.test(value) || i18n.t("admin.users.errors.username_invalid"),
  email: (value: string) => /^[a-zA-Z\d.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z\d-]+(?:\.[a-zA-Z\d-]+)*$/.test(value) || i18n.t("admin.users.errors.email_invalid"),
  password: (value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])[a-zA-Z\d]{8,}$/.test(value) || i18n.t("admin.users.errors.password_invalid"), // 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number'
};

function visitUser(user: User) {
  router.push('/u/' + user.user_id)
}

function getUserTemplate(): User {
  return {
    user_id: 0,
    name: '',
    username: '',
    email: '',
    roles: [{
      role_id: 2,
      name: 'User',
    }],
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
  await UserService.addUser(newUserDialog.value.target);
  await loadUsers();
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
  UserService.delUser(user).then(async () =>
      loadUsers()
  );
}

</script>

<style scoped>

</style>