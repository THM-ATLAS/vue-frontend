<template>
  <SkipToContent/>
  <Navbar/>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <Notifications id="content"/>
      </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>

<style scoped>
.v-row {
  padding-block: 10em;
}
</style>

<script lang='ts'>
import {defineComponent} from "vue";
import Navbar from "../components/NavbarBase.vue";
import Notifications from "../components/NotificationList.vue";
import Footer from "../components/FooterCard.vue"
import SkipToContent from "@/components/SkipToContent.vue";

export default defineComponent({
  components: {SkipToContent, Navbar, Notifications, Footer},
  name: "NotificationsView",
});
</script>