<template>
  <v-btn @click="toggleTheme">Switch theme</v-btn>
  <nav>
    <router-link to="/helloworld">Home</router-link>
    |
    <router-link to="/about">About</router-link>
  </nav>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
import {toggleTheme} from "@/helpers/theme";
</script>