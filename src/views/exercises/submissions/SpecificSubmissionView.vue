<template>
  <Navbar/>
  <v-main>
    <v-row justify="center" align-content="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <SpecificSubmission id="content"></SpecificSubmission>
      </v-col>
    </v-row>
  </v-main>
  <Footer/>

</template>

<script setup lang="ts">
  import SpecificSubmission from "@/components/exercises/submissions/SpecificSubmission.vue";
  import Navbar from "@/components/navigation/navbar/NavbarBase.vue";
  import Footer from "@/components/navigation/FooterCard.vue"
</script>

<style scoped>

.v-row {
  padding-block: 10em;
  padding-left: 4%;
  padding-right: 4%;
}
</style>