<template>
  <v-container>
    <v-row class="text-center align-self-center justify-center pa-2">
      <v-col sm="6" md="6" lg="4" xl="3">
        <LoginModal/>
      </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>

<script lang='ts' setup>
import LoginModal from "@/components/LoginModal.vue";
import Footer from "@/components/navigation/FooterCard.vue";
</script>