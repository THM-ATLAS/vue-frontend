<template>
  <NavbarBase/>
  <v-main>
    <v-row justify="center" align-content="center">
      <v-col>
        <HomeContent id="content"/>
      </v-col>
    </v-row>
  </v-main>
  <Footer/>
</template>


<script setup lang="ts">
import HomeContent from "@/components/HomeContent.vue";
import Footer from "@/components/navigation/FooterCard.vue";
import NavbarBase from "@/components/navigation/navbar/NavbarBase.vue";

</script>

<style scoped>
.v-row {
  padding: 10em 0 5em 0;
}
</style>