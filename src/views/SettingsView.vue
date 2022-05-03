<template>
  <SkipToContent/>
  <Navbar/>
  <v-container>
    <v-row justify="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <Settings id="content"/>
      </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>

<style scoped>
.v-card {
  margin-top: 15px !important;
  margin-bottom: 30px !important;
}

.v-row {
  padding-block: 10em;
}
</style>

<script lang='ts'>
import {defineComponent} from "vue";
import Navbar from "../components/NavbarBase.vue";
import Settings from "../components/SettingsCard.vue";
import Footer from "@/components/FooterCard.vue";
import SkipToContent from "@/components/SkipToContent.vue";

export default defineComponent({
  components: {SkipToContent, Navbar, Footer, Settings},
  name: "SettingsView",
});
</script>