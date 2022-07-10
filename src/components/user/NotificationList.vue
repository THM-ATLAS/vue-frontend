<template>
  <!--  <v-card elevation="0" rounded="0">
      <v-card-header>
        <v-icon class="ma-1">mdi-bell</v-icon>
        <v-card-header-text class="text-left fontszTi">
          {{ i18n.t('notifications_page.notifications') }}
        </v-card-header-text>
      </v-card-header>
      <v-card-subtitle>
        {{ i18n.t('notifications_page.description') }}
      </v-card-subtitle>

      <v-container>
        <v-list three-line>
          <template v-for="(item, index) in notifications">

            <v-container
                v-if="item.title"
                :key="item.title"
            >
              <p class="text-h6 mt-5">
                &lt;!&ndash; v-icon class="ma-1" :icon="item.icon"/ &ndash;&gt;
                {{ item.title }}
              </p>
            </v-container>

            <v-divider
                v-else-if="item.divider"
                :key="index"
                :inset="item.inset"
            />

            <v-list-item
                v-else
                :key="item.title"
                class="justify-space-between flex-wrap flex-row flex-md-nowrap"
            >
              <v-list-item-avatar class="d-none d-md-block">
                <v-icon class="mr-5" :alt="item.type" :title="item.type" :icon="item.icon"/>
              </v-list-item-avatar>
              <v-container>
                <v-list-item-subtitle class="d-md-none">
                  <v-icon :icon="item.icon"/>
                  {{ item.type }}
                </v-list-item-subtitle>
                <v-list-item-title v-html="item.title"/>
                <v-list-item-subtitle v-html="item.subtitle"/>
              </v-container>

              <v-container
                  v-if="item.interaction"
                  class="align-end">
                <template v-for="b_item in item.interaction" :key="b_item.btn_title">

                  <v-dialog
                      v-if="b_item.type === 'popup'"
                      v-model="dialog"
                  >
                    <template v-slot:activator="{ props }">
                      <v-btn v-bind="props"
                             :color="b_item.btn_color"
                             :title="b_item.btn_title"
                             rounded="0"
                             elevation="0">
                        <v-icon :icon="b_item.btn_icon"/>
                        <span class="caption d-none d-lg-block" v-html="b_item.btn_title"/>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-text>
                        {{ b_item.content }}
                      </v-card-text>
                    </v-card>
                  </v-dialog>

                  <v-btn v-bind="props"
                         v-else-if="b_item.type === 'link'"
                         :color="b_item.btn_color"
                         :title="b_item.btn_title"
                         rounded="0"
                         elevation="0"
                         @click="visitIntLink(b_item.content)">
                    <v-icon :icon="b_item.btn_icon"/>
                    <span class="caption d-none d-lg-block" v-html="b_item.btn_title"/>
                  </v-btn>

                  <v-btn v-bind="props"
                         v-else-if="b_item.type === 'ext-link'"
                         :color="b_item.btn_color"
                         :title="b_item.btn_title"
                         rounded="0"
                         elevation="0"
                         @click="visitExtLink(b_item.content)">
                    <v-icon :icon="b_item.btn_icon"/>
                    <span class="caption d-none d-lg-block" v-html="b_item.btn_title"/>
                  </v-btn>

                </template>
              </v-container>
              &lt;!&ndash;
              <v-btn class="align-self-end" color="error" @click="del(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              &ndash;&gt;
            </v-list-item>
          </template>
        </v-list>
      </v-container>
    </v-card>-->
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
        <th/>
        <th>{{ $t('notifications_page.title') }}</th>
        <th>{{ $t('notifications_page.content') }}</th>
        <th/>
      </tr>
      </thead>
      <tbody>
      <tr v-for="notification in notifications" v-bind:key="notification.notification_id"
          v-bind:style="{ 'background-color': !notification.read ? 'surface' : 'background' }">
        <td>
          <v-badge v-if="!notification.read" :dot="true" color="primary" offset-y="-8"/>
          <v-icon :icon="getNotificationIcon(notification)" class="ml-1 mr-2"/></td>
        <td>{{ notification.title }}</td>
        <td>{{ notification.content }}</td>
        <td>
          <v-checkbox v-model="checkedItems" :value="notification" hide-details/>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup lang='ts'>
import {useI18n} from "vue-i18n";
import {Notification, User} from "@/helpers/types"
import {computed, onBeforeMount, ref, watch} from "vue";
import {Ref} from "vue";
import NotificationService from "@/services/NotificationService";
import UserService from "@/services/UserService";
import router from "@/router";

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

const items = [
  {
    icon: 'mdi-note-check',
    type: 'Rückmeldung erhalten',
    title: 'Zielscheibe ',
    subtitle: `Deine Abgabe vom 21.12.2021 wurde akzeptiert.`,
    read: "true",
    interaction: [{
      type: 'popup',
      btn_title: 'Feedback lesen',
      btn_icon: 'mdi-email',
      btn_color: 'primary',
      content: 'Super gemacht! Geht übrigens auch mit einer Klasse.',
    }, {
      type: 'link',
      btn_title: 'Zur Abgabe',
      btn_icon: 'mdi-link',
      btn_color: 'primary',
      content: '/oop/s/1234',
    }]
  },

  {
    icon: 'mdi-trophy-award',
    type: 'Level-Up',
    title: 'Level 10 erreicht',
    subtitle: 'Du hast Level 10 erreicht. Weiter so!',
    read: "true",
    interaction: [{
      type: 'link',
      btn_title: 'Zum Profil',
      btn_icon: 'mdi-account',
      btn_color: 'primary',
      content: '/u/',
    }]
  },

  {
    icon: 'mdi-note-remove',
    type: 'Rückmeldung erhalten',
    title: 'Würfeln',
    subtitle: `Deine Abgabe vom 17.12.2021 wurde abgelehnt.`,
    interaction: [{
      type: 'popup',
      btn_title: 'Feedback lesen',
      btn_icon: 'mdi-email',
      btn_color: 'primary',
      content: 'Der Code lässt sich nicht ausführen.',
    }, {
      type: 'link',
      btn_title: 'Zur Abgabe',
      btn_icon: 'mdi-link',
      btn_color: 'primary',
      content: 'bkp/s/1234',
    }]
  },

  {
    icon: 'mdi-note-search',
    type: 'Neue Abgabe erhalten',
    title: 'Würfeln',
    read: "true",
    subtitle: 'Nutzer:in pkrs44 hat eine Abgabe eingereicht.',
    interaction: [{
      type: 'link',
      btn_title: 'Zur Abgabe',
      btn_icon: 'mdi-link',
      btn_color: 'primary',
      content: 'mpt/s/1234',
    }]
  },
  {
    header: 'Ältere Nachrichten',
    icon: 'mdi-email-open'
  },
  {
    icon: 'mdi-check',
    type: 'Abgabe bewertet',
    title: 'Zielscheibe',
    subtitle: 'Abgabe von pkrs44 wurde bewertet.',
    interaction: [{
      type: 'link',
      btn_title: 'Zur Abgabe',
      btn_icon: 'mdi-link',
      btn_color: 'primary',
      content: 'mpt/s/1234',
    }]
  },

  {
    icon: 'mdi-message-badge',
    type: 'Feedback erhalten',
    title: 'Würfeln',
    subtitle: `Die Aufgabe Würfeln hat ein neues Feedback erhalten.`,
    interaction: [{
      type: 'link',
      btn_title: 'Feedback lesen',
      btn_icon: 'mdi-link',
      btn_color: 'primary',
      content: '/Brueckenkurs Programmieren/e/5/feedback',
    }]
  },

  {
    icon: 'mdi-email',
    type: 'Private Nachricht',
    title: 'Neue Nachricht vom ATLAS-Team',
    subtitle: 'Update 0.12 - Notifications & Mehr.',
    read: "true",
    interaction: [{
      type: 'popup',
      btn_title: 'Lesen',
      btn_icon: 'mdi-email',
      btn_color: 'primary',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
          'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in' +
          'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla' +
          'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in' +
          'culpa qui officia deserunt mollit anim id est laborum.',
    }]
  },

  {
    icon: 'mdi-newspaper-plus',
    type: 'Neue Aufgaben',
    title: '2 neue Aufgaben in Brückenkurs Programmieren',
    read: "true",
    subtitle: 'Es wurden neue Aufgaben in einem Modul eingefügt, dem Du folgst.',
    interaction: [{
      type: 'link',
      btn_title: 'Besuchen',
      btn_icon: 'mdi-link',
      btn_color: 'primary',
      content: '/Brueckenkurs Programmieren',
    }]
  },

  {
    icon: 'mdi-file-cog',
    type: 'Korrektur erhalten',
    title: 'Würfeln',
    read: "true",
    subtitle: 'Die Aufgabe Würfeln hat einen Korrekturvorschlag erhalten.',
    interaction: [{
      type: 'popup',
      btn_title: 'Lesen',
      btn_icon: 'mdi-email',
      btn_color: 'primary',
      content: 'Hier ist ein Typo: Wüfeln.',
    }, {
      type: 'link',
      btn_title: 'Aufgabe Bearbeiten',
      btn_icon: 'mdi-arrow-top-right-bold-box',
      btn_color: 'primary',
      content: '/Brueckenkurs Programmieren/e/5/edit',
    }]
  },

  {
    icon: 'mdi-check',
    type: 'Korrektur bearbeitet',
    title: 'Zielscheibe',
    subtitle: 'Die Korrektur für Würfeln wurde bearbeitet.',
    interaction: [{
      type: 'popup',
      btn_title: 'Lesen',
      btn_icon: 'mdi-email',
      btn_color: 'primary',
      content: 'Keine Ahnung lol',
    }]
  },

  {
    icon: 'mdi-trophy-award',
    type: 'Neues Abzeichen',
    title: '100 erledigte Aufgaben!',
    subtitle: 'Du hast für das Erledigen von 100 Aufgaben ein Abzeichen erhalten.',
    interaction: [{
      type: 'link',
      btn_title: 'Zum Profil',
      btn_icon: 'mdi-account',
      btn_color: 'primary',
      content: '/u/',
    }]
  },

  {
    icon: 'mdi-email',
    type: 'Private Nachricht',
    title: 'Willkommen zu ATLAS!',
    subtitle: 'Lerne die ersten Schritte.',
    interaction: [{
      type: 'link',
      btn_title: 'Zur Hilfeseite',
      btn_icon: 'mdi-link',
      btn_color: 'primary',
      content: '/help',
    }]
  }
]

</script>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>
.v-btn {
  margin: 5px !important;
}

</style>