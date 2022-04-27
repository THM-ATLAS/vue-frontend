<template>
  <v-card elevation="0" rounded="0">
    <v-card-header>
      <v-icon class="ma-1">mdi-bell</v-icon>
      <v-card-header-text class="text-left fontszTi">
        Nachrichten
      </v-card-header-text>
    </v-card-header>
    <v-card-subtitle>
      Hier können Rückmeldungen, Feedback und unbewertete Abgaben eingesehen werden.
    </v-card-subtitle>
    <!--
    <v-btn class="">
      <v-icon class="ma-1">mdi-email-open</v-icon>
      <span class="caption">Alle Nachrichten als gelesen markieren</span>
    </v-btn>
    -->
    <v-container>
      <v-list three-line>
        <template v-for="(item, index) in items">

          <v-container
              v-if="item.header"
              :key="item.header"
          >
            <p class="text-h6 mt-5">
              <v-icon class="ma-1" :icon="item.icon"/>
              {{ item.header }}
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
            <!--
            <v-btn class="align-self-end" color="error" @click="del(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            -->
          </v-list-item>
        </template>
      </v-list>
    </v-container>
  </v-card>
</template>

<script>

import {defineComponent} from "vue";

export default defineComponent({
  name: "NotificationList",
  methods: {
    del(index) {
      this.items.splice(index, 1);
    },
    visitExtLink(url) {
      window.open(url, "_blank");
    },
    visitIntLink(url) {
      this.$router.push(url);
    },
  },
  data: () => ({
    items: [
      {
        header: 'Ungelesen',
        icon: 'mdi-email'
      },
      {
        icon: 'mdi-note-check',
        type: 'Rückmeldung erhalten',
        title: 'Zielscheibe ',
        subtitle: `Deine Abgabe vom 21.12.2021 wurde akzeptiert.`,
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
      {divider: true, inset: true},
      {
        icon: 'mdi-trophy-award',
        type: 'Level-Up',
        title: 'Level 10 erreicht',
        subtitle: 'Du hast Level 10 erreicht. Weiter so!',
        interaction: [{
          type: 'link',
          btn_title: 'Zum Profil',
          btn_icon: 'mdi-account',
          btn_color: 'primary',
          content: '/u/',
        }]
      },
      {divider: true, inset: true},
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
      {divider: true, inset: true},
      {
        icon: 'mdi-note-search',
        type: 'Neue Abgabe erhalten',
        title: 'Würfeln',
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
      {divider: true, inset: true},
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
          content: '/bkp/e/5/feedback',
        }]
      },
      {divider: true, inset: true},
      {
        icon: 'mdi-email',
        type: 'Private Nachricht',
        title: 'Neue Nachricht vom ATLAS-Team',
        subtitle: 'Update 0.12 - Notifications & Mehr.',
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
      {divider: true, inset: true},
      {
        icon: 'mdi-newspaper-plus',
        type: 'Neue Aufgaben',
        title: '2 neue Aufgaben in Brückenkurs Programmieren',
        subtitle: 'Es wurden neue Aufgaben in einem Modul eingefügt, dem Du folgst.',
        interaction: [{
          type: 'link',
          btn_title: 'Besuchen',
          btn_icon: 'mdi-link',
          btn_color: 'primary',
          content: '/bkp',
        }]
      },
      {divider: true, inset: true},
      {
        icon: 'mdi-file-cog',
        type: 'Korrektur erhalten',
        title: 'Würfeln',
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
          content: '/bkp/e/5/edit',
        }]
      },
      {divider: true, inset: true},
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
      {divider: true, inset: true},
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
      {divider: true, inset: true},
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
      },
    ],
  }),
});
</script>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>
.v-btn {
  margin: 5px !important;
}
</style>