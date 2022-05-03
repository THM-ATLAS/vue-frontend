<template>
  <v-btn @click="toggleTheme">Switch theme</v-btn>
  <nav>
    <router-link to="/helloworld">Home</router-link>
    |
    <router-link to="/about">About</router-link>
  </nav>
  <div class="home">
    <v-img alt="Vue logo" width="100px" style="display: block;
  margin-left: auto;
  margin-right: auto" src="../assets/logo.png"></v-img>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {toggleTheme} from "@/helpers/theme";

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  methods: {
    toggleTheme,
  },
}
</script>
