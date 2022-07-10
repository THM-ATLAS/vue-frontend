<template>
  <v-card elevation="0" rounded="0">
    <v-card-header>
      <v-icon class="ma-1">mdi-bell</v-icon>
      <v-card-header-text class="text-left fontszTi">
        {{ i18n.t('notifications_page.notifications') }}
      </v-card-header-text>
      <v-tooltip bottom>
        <template v-slot:activator="{ props: tooltip3 }">
          <v-btn
              v-bind="tooltip3"
              :icon="markAll ? 'mdi-checkbox-multiple-outline' : 'mdi-checkbox-multiple-blank-outline'"
              class="ma-2"
              variant="outlined"
              @click='checkAll'></v-btn>
        </template>
        <span v-html="$t('notifications_page.mark_all')"/>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ props: tooltip3 }">
          <v-btn
              v-bind="tooltip3"
              icon="mdi-email-open"
              class="ma-2"
              variant="outlined"
              @click='markAsRead'/>
        </template>
        <span v-html="$t('notifications_page.mark_as_read')"/>
      </v-tooltip>
      <!-- Not supported by Backend
      <v-tooltip bottom>
        <template v-slot:activator="{ props: tooltip3 }">
          <v-btn
              v-bind="tooltip3"
              icon="mdi-email"
              class="ma-2"
              variant="outlined"
              @click='markAsUnRead'/>
        </template>
        <span v-html="$t('notifications_page.mark_as_unread')"/>
      </v-tooltip>
      -->
      <v-tooltip bottom>
        <template v-slot:activator="{ props: tooltip3 }">
          <v-btn
              v-bind="tooltip3"
              icon="mdi-trash-can-outline"
              class="ma-2"
              variant="outlined"
              @click='deleteNotifications'/>
        </template>
        <span v-html="$t('notifications_page.delete')"/>
      </v-tooltip>
    </v-card-header>
    <v-card-subtitle>
      {{ i18n.t('notifications_page.description') }}
    </v-card-subtitle>
    <v-table>
      <thead>
      <tr>
        <th>{{ $t('notifications_page.title') }}</th>
        <th>{{ $t('notifications_page.content') }}</th>
        <th/>
      </tr>
      </thead>
      <tbody>
      <tr
          :class="{rowPointerDark: theme === 'dark',
                   rowPointerLight: theme === 'light',
                   readBackground: notification.read}"
          v-for="notification in notifications"
          v-bind:key="notification.notification_id">
        <v-dialog
            hide-overlay
        >
          <template v-slot:activator="{ props }">
          <td @click="handleClick(notification)"
          v-bind="props">
            <v-badge v-if="!notification.read"
                     dot
                     left
                     inline
                     color="primary"
            >
              <v-list-item :prepend-icon="getNotificationIcon(notification)">
                {{ notification.title }}
              </v-list-item>
            </v-badge>
            <v-list-item v-else :prepend-icon="getNotificationIcon(notification)">
              {{ notification.title }}
            </v-list-item>
          </td>
          <td @click="handleClick(notification)"
              v-bind="props">
            {{ notification.content }}</td>
            <td>
              <v-checkbox v-model="checkedItems" :value="notification" hide-details></v-checkbox>
            </td>
          </template>
          <NotificationDialog v-bind:notification="notification" v-bind:user="user"/>
        </v-dialog>
      </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup lang='ts'>
import {useI18n} from "vue-i18n";
import {Notification, User} from "@/helpers/types"
import {onBeforeMount, ref} from "vue";
import {Ref} from "vue";
import NotificationService from "@/services/NotificationService";
import UserService from "@/services/UserService";
import router from "@/router";
import {theme} from "@/helpers/theme";
import NotificationDialog from "@/components/user/NotificationDialog"

const i18n = useI18n();
const notifications: Ref<Notification[]> = ref([]);
const checkedItems: Ref<Notification[]> = ref([]);
const markAll = ref(false)
const user: Ref<User | undefined | void> = ref()

function checkAll() {
  markAll.value = !markAll.value
  markAll.value ? checkedItems.value = notifications.value : checkedItems.value = []
}

onBeforeMount(async () => {
  await UserService.getMe().then(async r => {
    if (r.data.user_id) {
      user.value = r.data
      await loadNotifications()
    }
  })
})

async function loadNotifications() {
  if (!user.value) return;

  await NotificationService.getNotificationsForUser(user.value).then(res => {
    notifications.value = res.data
    notifications.value.sort(function(a,b){
      return (b.notification_id - a.notification_id);
    });
  })
}

async function deleteNotifications() {
  if (checkedItems.value.length === 0 || !user.value) return;

  for (const notification of checkedItems.value) {
    await NotificationService.deleteSingleNotificationForUser(notification, user.value)
  }

  await loadNotifications()
}

async function markAsRead() {
  if (checkedItems.value.length === 0 || !user.value) return;

  for (const notification of checkedItems.value) {
    notification.read = true
    await NotificationService.markNotificationAsRead(notification, user.value)
  }

  await loadNotifications()
}

//Not supported by Backend
/*async function markAsUnRead () {
  if (checkedItems.value.length === 0)
    return;
  for (const notification of checkedItems.value) {
    notification.read = false
    await NotificationService.markNotificationAsRead(notification, user.value)
  }
  await router.go('')
}*/

function getNotificationIcon(notification: Notification): string {
  switch (notification.type_id) {
    case 1:
      return 'mdi-file-upload'
    case 2:
      return 'mdi-pencil-box'
    case 3:
      return 'mdi-file-star'
    case 4:
      return 'mdi-view-module'
    case 5:
      return 'mdi-newspaper-variant'
    default:
      return 'mdi-email'
  }
}

async function handleClick (notification : Notification) {
  notification.read = true
  await NotificationService.markNotificationAsRead(notification, user.value)
}

</script>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>
.v-btn {
  margin: 5px !important;
}

.rowPointerDark {
  background: rgba(0, 0, 0, 0.2) !important;
}

.rowPointerDark.readBackground {
  background: rgb(var(--v-theme-surface)) !important;
}
.rowPointerLight {
  background: rgba(0, 0, 0, 0.1) !important;
}
.rowPointerLight.readBackground {
  background: rgba(255, 255, 255, 0.1) !important;
}

.rowPointerDark:hover {
  cursor: pointer;
  background: rgba(255, 255, 255, .2) !important;
}

.rowPointerLight:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, .2) !important;
}

</style>