<template>
  <Navbar/>
  <v-main>
    <v-row justify="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <Leaderboard id="content"/>
      </v-col>
    </v-row>
  </v-main>
  <Footer/>
</template>

<style scoped>
.v-card {
    margin-top: 15px !important;
    margin-bottom: 30px !important;
}

.v-row {
  padding-block: 9em;
}
</style>

<script setup lang='ts'>
import Navbar from "@/components/navigation/navbar/NavbarBase.vue";
import Leaderboard from "@/components/LeaderboardList.vue";
import Footer from "@/components/navigation/FooterCard.vue";
</script>