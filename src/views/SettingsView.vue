<template>
  <SkipToContent/>
  <Navbar/>
  <v-container>
    <v-row justify="center">
      <v-col sm="10" md="10" lg="8" xl="6">
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

<script lang='ts' setup>
import Navbar from "@/components/navigation/navbar/NavbarBase.vue";
import Settings from "@/components/SettingsCard.vue";
import Footer from "@/components/navigation/FooterCard.vue";
import SkipToContent from "@/components/helpers/SkipToContent.vue";
</script>