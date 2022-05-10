<template>
  <SkipToContent/>
  <Navbar/>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col>
        <MainPage tabindex="-1" id="content"/>
      </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>

<style scoped>
</style>

<script lang='ts' setup>
import Navbar from "@/components/navigation/navbar/NavbarBase.vue";
import MainPage from "@/components/MainPage.vue";
import Footer from "@/components/navigation/FooterCard.vue";
import SkipToContent from "@/components/helpers/SkipToContent.vue";
</script>