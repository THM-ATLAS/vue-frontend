<template>
  <v-app-bar elevation="3" justify="left" height="100px" role="navigation">
    <v-app-bar-title>
      <v-img v-if="theme === 'light'" @click="goToHome()" @keyup.enter.prevent.stop="goToHome"
             src="../assets/ATLAS_Logo.svg" max-height="70px"/>
      <v-img v-else @click="goToHome()" @keyup.enter.prevent.stop="goToHome" src="../assets/ATLAS_Logo_Dark.svg"
             max-height="70px"/>
    </v-app-bar-title>

    <CourseSelector :courses="courses"/>

    <v-spacer/>

    <!--nur sichtbar auf Bildschirmen, die groß genug sind, auf mobile findet man das alles im hamburger menu -->

    <v-col>
      <v-text-field
          class="d-none d-md-block"
          label="Suchen"
          prepend-inner-icon="mdi-magnify"
          variant="plain"
          bg-color="#eeeeee"
          role="search"
      />
    </v-col>


    <!--dropdown menu für desktop -->

    <v-btn @click="goToSubmission()" class="d-none d-md-flex" text>Testabgabe</v-btn>

    <v-menu width="10em" origin="top center" transition="scale-transition">
      <template v-slot:activator="{ props }">
        <v-badge
            :content="messages"
            color="primary"
            offset-x="18"
            offset-y="10"
        >
          <v-btn class=" d-none d-md-flex mr-4 ml-5" icon v-bind="props" variant="outlined">
            <v-icon icon="mdi-account"/>
          </v-btn>
        </v-badge>
      </template>
      <Dropdown :messages='messages'/>
    </v-menu>

    <!---------------------------------->

    <template v-if="!getMobile()" v-slot:extension>
      <v-spacer></v-spacer>
      <v-menu class="dropdown_menu" v-for="button in buttons" v-bind:key="button.id" width="10em">
        <template v-slot:activator="{ props }">
          <v-btn class="d-none d-md-flex" text v-bind="props" v-html="button.title"/>
        </template>
        <NavigationDropdown :data="button"/>
      </v-menu>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
    </template>

    <!--hamburger icon nur sichtbar auf mobile -->
    <v-app-bar-nav-icon
        class="d-md-none"
        @click="drawer = !drawer"
    />
  </v-app-bar>

  <!--Navigation für mobile -->
  <v-navigation-drawer
      v-model="drawer"
      position="right"
      :temporary="true"
      color="white"
      class="d-md-none"
  >
    <v-spacer/>
    <v-row class="drawer-text">
      <v-text-field class="textfieldDrawer"
                    label="Suchen..."
                    :hide-details="true"
                    rounded="xl"
                    clearable
      />
    </v-row>
    <v-list>
      <v-list-item prepend-icon="mdi-message" @click="goToMessages">
        <span> Nachrichten </span>
      </v-list-item>
      <v-list-item prepend-icon="mdi-account" @click="goToUser">
        <span> Profil </span>
      </v-list-item>
      <v-list-item prepend-icon="mdi-cog" @click="goToSettings">
        <span> Einstellungen </span>
      </v-list-item>
      <v-list-item prepend-icon="mdi-help" @click="goToHelp">
        <span> Hilfe </span>
      </v-list-item>
      <div v-for="button in buttons" v-bind:key="button.id">
        <v-list-item prepend-icon="$expand" @click.prevent.stop="expand(button)">
          <span> {{ button.title }} </span>
        </v-list-item>
        <v-list v-show="button.expanded">
          <v-list-item v-for="item in button.items" v-bind:key="button.items.indexOf(item)" v-html="item"/>
        </v-list>
      </div>
    </v-list>
    <v-btn @click="goToLogin()" variant="outlined" rounded="0">
      <v-icon icon="mdi-logout"/>
      <span> Logout </span>
    </v-btn>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Dropdown from "./DropdownCard.vue";
import NavigationDropdown from "./NavigationDropdown.vue"
import CourseSelector from "./CourseSelector.vue"
import {useRoute, useRouter} from 'vue-router';
import {Ref, ref} from 'vue';
import {theme} from "@/helpers/theme";

export default {
  components: {Dropdown, NavigationDropdown, CourseSelector},
  name: "NavbarBase",
  setup() {
    const course = useRoute().params.course;
    const drawer: Ref<boolean> = ref(false);
    const messages: Ref<string> = ref("3");

    const courses: Ref<{ id: string; name: string; }[]> = ref([
      {
        id: 'bkp',
        name: 'Brückenkurs Programmieren',
      },
      {
        id: 'oop',
        name: 'Objektorientierte Programmierung',
      },
      {
        id: 'mpt',
        name: 'Mikroprozessortechnik',
      },
      {
        id: 'test',
        name: 'Testkurs',
      }
    ]);

    const router = useRouter();

    const buttons = ref([
      {
        title: "Developer",
        id: 1,
        expanded: false,
        items: [
          "Item 1", "Item 2", "Item 3"
        ],
      },
      {
        title: "Help",
        id: 2,
        expanded: false,
        items: [
          "Item 4", "Item 5", "Item 6"
        ],
      },
      {
        title: "Andere",
        id: 3,
        expanded: false,
        items: [
          "Item 7", "Item 8", "Item 9"
        ],
      },
      {
        title: "Interessante",
        id: 4,
        expanded: false,
        items: [
          "Item 10", "Item 11", "Item 12"
        ],
      },
      {
        title: "Tabs",
        id: 5,
        expanded: false,
        items: [
          "Item 13", "Item 14", "Item 15"
        ],
      },
      {
        title: "Developer",
        id: 6,
        expanded: false,
        items: [
          "Item 16", "Item 17", "Item 18"
        ],
      },
    ]);

    function goToHome(): void {
      if (typeof course === "string")
        router.push(`/${course}`);
      else
        router.push(`/bkp`);
    }

    function goToLogin(): void {
      router.push("/");
    }

    function getMobile(): boolean {
      return window.innerWidth < 960;
    }

    function goToSubmission(): void {
      router.push("/mpt/s/1235");
    }

    function goToHelp(): void {
      router.push("/help");
    }

    function goToMessages(): void {
      router.push("/notifications");
    }

    function goToSettings(): void {
      router.push("/settings");
    }

    function expand(button: any) {
      console.log(button.expanded);
      button.expanded = !button.expanded;
    }

    function goToUser() {
      router.push("/u/");
    }


    return {
      goToHome,
      goToLogin,
      getMobile,
      drawer,
      buttons,
      expand,
      goToSubmission,
      messages,
      goToHelp,
      goToMessages,
      goToUser,
      courses,
      goToSettings,
      theme,
    }
  }

};
</script>

<style scoped>

.drawer-text {
  margin-top: 2em;
  margin-left: 1em;
  margin-right: 1em;
}

.textfieldDrawer {
  margin-top: 4em;
}

.v-btn {
  margin-top: 3px;
  margin-bottom: 3px;
  margin-left: 5px;
}

</style>