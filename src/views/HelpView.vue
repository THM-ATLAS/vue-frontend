<template>
  <SkipToContent />
  <Navbar/>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <Help id="content"/>
      </v-col>
    </v-row>
  </v-container>
  <div class="footer">
  <Footer/>
  </div>
</template>

<style scoped>
.v-row {
  padding-block: 10em;
}
.footer {
  width: 100%;
}
</style>

<script lang='ts'>
import { defineComponent } from "vue";
import Navbar from "../components/NavbarBase.vue";
import Help from "@/components/HelpCard.vue";
import Footer from "../components/FooterCard.vue";
import SkipToContent from "@/components/SkipToContent.vue";

export default defineComponent({
  components: {SkipToContent, Navbar, Help, Footer },
  name: "HelpView",
});
</script>