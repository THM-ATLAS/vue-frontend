<template>
  <Navbar/>
  <v-main>
    <ModuleMainPage id="content"/>
  </v-main>
  <Footer/>
</template>


<script setup>
import Footer from "@/components/navigation/FooterCard";
import Navbar from "@/components/navigation/navbar/NavbarBase";
import ModuleMainPage from "@/components/module/ModuleMainPage";
</script>

<style scoped>
</style>