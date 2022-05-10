<template>
  <NavbarBase></NavbarBase>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col>
        <HomeContent/>
      </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>


<script setup>
  import HomeContent from "@/components/HomeContent.vue";
  import Footer from "@/components/FooterCard.vue";
  import NavbarBase from "@/components/navbar/NavbarBase";

</script>

<style scoped>
.v-row {
  padding-block: 10em;
}
</style>