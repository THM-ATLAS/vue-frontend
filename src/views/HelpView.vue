<template>
  <SkipToContent/>
  <Navbar/>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col sm="10" md="10" lg="8" xl="6">
        <Help id="content"/>
      </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>

<style scoped>
.v-row {
  padding-block: 10em;
}
</style>

<script lang="ts">
import {defineComponent} from "vue";
import Navbar from "@/components/navigation/navbar/NavbarBase.vue";
import Help from "@/components/HelpCard.vue";
import Footer from "@/components/navigation/FooterCard.vue";
import SkipToContent from "@/components/helpers/SkipToContent.vue";

export default defineComponent({
  components: {SkipToContent, Navbar, Help, Footer},
  name: "HelpView",
});
</script>
