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


<script setup lang="ts">
import HomeContent from "@/components/HomeContent.vue";
import Footer from "@/components/navigation/FooterCard.vue";
import NavbarBase from "@/components/navigation/navbar/NavbarBase.vue";

</script>

<style scoped>
.v-row {
  padding-block: 10em;
}
</style>