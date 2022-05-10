<template>
  <SkipToContent />
  <Navbar/>
  <v-container>
    <v-row justify="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <Feedback id="content"/>
      </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>

<script>
import {defineComponent} from "vue";
import Navbar from "@/components/navigation/navbar/NavbarBase.vue";
import Feedback from "@/components/exercises/feedback/FeedbackList.vue";
import Footer from "@/components/navigation/FooterCard.vue"
import SkipToContent from "@/components/helpers/SkipToContent";

export default defineComponent({
  components: {SkipToContent, Navbar, Feedback, Footer},
  name: "FeedbackView",
});
</script>

<style scoped>
.v-card {
  margin-top: 15px !important;
  margin-bottom: 30px !important;
}

.v-row {
  padding-block: 9em;
}
</style>