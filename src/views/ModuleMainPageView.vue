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
import ModuleMainPage from "@/components/ModuleMainPage";
</script>

<style scoped>
.v-card {
  margin-top: 15px !important;
  margin-bottom: 30px !important;
}

.v-row {
  padding-block: 10em;
}
</style>