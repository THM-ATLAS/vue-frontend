<template>
  <SkipToContent/>
  <Navbar/>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col sm="10" md="10" lg="9" xl="6">
        <Profile id="content"/>
      </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>

<script setup>
import Profile from "@/components/ProfileCard"
import Navbar from "@/components/navigation/navbar/NavbarBase.vue";
import Footer from "@/components/navigation/FooterCard.vue"
import SkipToContent from "@/components/helpers/SkipToContent";
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