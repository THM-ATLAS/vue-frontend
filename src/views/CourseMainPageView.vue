<template>
  <SkipToContent/>
  <Navbar/>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <CourseMainPageContainer/>
      </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>


<script setup>
import SkipToContent from "@/components/helpers/SkipToContent";
import Footer from "@/components/navigation/FooterCard";
import Navbar from "@/components/navigation/navbar/NavbarBase";
import CourseMainPageContainer from "@/components/CourseMainPageContainer";
</script>

<style scoped>
</style>