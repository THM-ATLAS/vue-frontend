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

<script lang='ts'>
import {defineComponent} from "vue";
import Navbar from "../components/navbar/NavbarBase.vue";
import MainPage from "../components/MainPage.vue";
import Footer from "@/components/FooterCard.vue";
import SkipToContent from "@/components/SkipToContent.vue";


export default defineComponent({
  components: {SkipToContent, Footer, Navbar, MainPage},
  name: "MainView",
});
</script>