<template>
  <Navbar/>
  <v-main>
    <v-row justify="center" align-content="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <Notifications id="content"/>
      </v-col>
    </v-row>
  </v-main>
  <Footer/>
</template>

<style scoped>
.v-row {
  padding-block: 10em;
}
</style>

<script lang='ts' setup>
import Navbar from "@/components/navigation/navbar/NavbarBase.vue";
import Notifications from "@/components/NotificationList.vue";
import Footer from "@/components/navigation/FooterCard.vue"
</script>