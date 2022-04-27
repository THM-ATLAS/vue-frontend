<template>
  <SkipToContent/>
  <Navbar/>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <Submission id="content"/>
      </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>

<style scoped>

.v-row {
  padding-block: 10em;
  padding-left: 4%;
  padding-right: 4%;
}
</style>

<script lang='ts'>
import {defineComponent} from "vue";
import Navbar from "../components/NavbarBase.vue";
import Submission from "../components/SubmissionCard.vue";
import Footer from "../components/FooterCard.vue"
import SkipToContent from "@/components/SkipToContent.vue";

export default defineComponent({
  components: {SkipToContent, Navbar, Submission, Footer},
  name: "SubmissionView",
});
</script>
