<template>
  <SkipToContent />
  <Navbar/>
  <v-container>
    <v-row justify="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <CourseSearch id="content"/>
      </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>

<script setup>
import Navbar from "../components/NavbarBase.vue";
import CourseSearch from "../components/CourseSearch.vue";
import Footer from "../components/FooterCard.vue"
import SkipToContent from "@/components/SkipToContent";
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