<template>
  <NavbarBase></NavbarBase>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col>
        <StartContent/>
      </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>


<script setup>
  import StartContent from "@/components/HomeContent.vue";
  import Footer from "@/components/FooterCard.vue";
  import NavbarBase from "@/components/navbar/NavbarBase";

</script>

<style scoped>

</style>