<template>
  <Navbar/>
  <v-main>
    <v-row justify="center" align-content="center">
      <v-col>
        <MainPage tabindex="-1" id="content"/>
      </v-col>
    </v-row>
  </v-main>
  <Footer/>
</template>

<style scoped>
</style>

<script lang='ts' setup>
import Navbar from "@/components/navigation/navbar/NavbarBase.vue";
import MainPage from "@/components/unused/MainPage.vue";
import Footer from "@/components/navigation/FooterCard.vue";
</script>