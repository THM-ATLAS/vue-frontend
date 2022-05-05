<template>
  <v-card elevation="0" rounded="0" role="main">
    <v-table>
      <thead>
      <tr>
        <th>{{ $t('admin.users.name') }}</th>
        <th>{{ $t('admin.users.username') }}</th>
        <th>{{ $t('admin.users.email') }}</th>
        <th>{{ $t('admin.users.roles') }}</th>
        <th>{{ $t('admin.users.created_at') }}</th>
        <th>{{ $t('admin.users.actions') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" v-bind:key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>
          <v-chip v-for="role in user.roles" :closable="true"
                  @click:close="removeRole(user, role)" class="mr-1"
                  v-bind:key="role.id">
            {{ role.name }}
          </v-chip>

          <v-chip prepend-icon="mdi-plus" @click="dialog.show = true; dialog.target = user" class="mr-1">
            {{ $t('buttons.new') }}
          </v-chip>
        </td>
        <td>{{ moment(user.created_at).format('DD.MM.YYYY') }}</td>
        <td>
          <v-btn
              @click="editUser(user)"
              icon="mdi-account-edit"
              small
              color="primary"
              class="mr-2"
          />
          <v-btn
              @click="deleteUser(user)"
              icon="mdi-account-remove"
              small
              color="error"
              class="mr-2"
          />
        </td>
      </tr>
      </tbody>
    </v-table>
    <!-- role dialog -->
    <v-dialog
        v-model="editRolesDialog.show"
        :scrollable="true"
        :retain-focus="false"
    >
      <v-card top="20%">
        <v-card-title>
          <span class="headline">{{ $t('admin.users.roles') }}</span>
        </v-card-title>
        <v-card-text>
          <v-checkbox v-for="role in roles" v-bind:key="role.id" v-model="editRolesDialog.targetUser.roles"
                      :value="role" :label="role.name"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="blue darken-1" @click="editRolesDialog.show = false">{{ $t('buttons.save') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- new user -->
    <div>
      <v-btn
          @click="newUserDialog = true"
          icon="mdi-account-plus"
          small
          color="primary"
          class="mr-2"
      />
    </div>
    <v-dialog
        v-model="newUserDialog"
        :scrollable="true"
        :retain-focus="false"
        width="auto"
    >
      <v-card top="20%">
        <v-card-title>
          <span class="headline">{{ $t('admin.users.new') }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
              v-model="newUser.name"
              :label="$t('admin.users.name')"
              required
          ></v-text-field>
          <v-text-field
              v-model="newUser.username"
              :label="$t('admin.users.username')"
              required
          ></v-text-field>
          <v-text-field
              v-model="newUser.email"
              :label="$t('admin.users.email')"
              required
          ></v-text-field>
          <v-text-field
              v-model="newUser.password"
              :label="$t('admin.users.password')"
              required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="blue darken-1" @click="createUser">{{ $t('buttons.save') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import moment from "moment";
import {ref} from "vue";

const roles = ref([
  {
    id: 1,
    name: 'Admin',
  },
  {
    id: 2,
    name: 'User',
  },
  {
    id: 3,
    name: 'Teacher',
  },
  {
    id: 4,
    name: 'Tutor',
  },
]);

const users = ref([
  {
    id: 1,
    name: "John Doe",
    username: 'abcd11',
    email: 'abcd11@thm.de',
    roles: [
      {
        id: 1,
        name: 'Admin',
      },
      {
        id: 2,
        name: 'User',
      },
    ],
    created_at: '2020-01-01 00:00:00',
  },
  {
    id: 2,
    name: "Jane Doe",
    username: 'abcd22',
    email: 'abcd22@thm.de',
    roles: [
      {
        id: 2,
        name: 'User',
      },
    ],
    created_at: '2020-03-07 13:30:00',
  },
  {
    id: 3,
    name: "Joe Doe",
    username: 'abcd33',
    email: 'fgfdgd@thm.de',
    roles: [
      {
        id: 2,
        name: 'User',
      },
      {
        id: 3,
        name: 'Teacher',
      },
    ],
    created_at: '2021-04-07 22:30:00',
  },
  {
    id: 4,
    name: "John Doe",
    username: 'jdoe23',
    email: 'sdfdsfsdf@thm.de',
    roles: [
      {
        id: 2,
        name: 'User',
      },
    ],
    created_at: '2022-04-07 22:30:00',
  },
  {
    id: 5,
    name: "John Doe",
    username: 'jdoe23',
    email: 'sdfdsfsdf@thm.de',
    roles: [
      {
        id: 2,
        name: 'User',
      },
    ],
    created_at: '2022-04-07 22:30:00',
  },
  {
    id: 6,
    name: "John Doe",
    username: 'jdoe23',
    email: 'sdfdsfsdf@thm.de',
    roles: [
      {
        id: 2,
        name: 'User',
      },
    ],
    created_at: '2022-04-07 22:30:00',
  },
  {
    id: 7,
    name: "John Doe",
    username: 'jdoe23',
    email: 'sdfdsfsdf@thm.de',
    roles: [
      {
        id: 2,
        name: 'User',
      },
    ],
    created_at: '2022-04-07 22:30:00',
  }
]);

function removeRole(user, role) {
  user.roles = user.roles.filter(r => r.id !== role.id);
}

const newUserDialog = ref(false);
const newUser = ref(getUserTemplate());

function createUser() {
  // newUser.value.roles = this.roles.filter(r => this.newUser.roles.includes(r.id));
  users.value.push(newUser.value);
  newUser.value = getUserTemplate();
  newUserDialog.value = false;
}

function getUserTemplate() {
  return {
    id: nextUserId(),
    name: '',
    username: '',
    email: '',
    password: '',
    roles: [{
      id: 2,
      name: 'User',
    }],
  };
}

function nextUserId() {
  return users.value.map(u => u.id).sort().pop() + 1;
}

const editRolesDialog = ref({
  show: false,
  target: null,
});

function editUser(user) {
  console.log('edit user', user)
}

function deleteUser(user) {
  console.log('delete user', user)
}


</script>

<style scoped>

</style>