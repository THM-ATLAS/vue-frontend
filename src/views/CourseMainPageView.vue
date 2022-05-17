<template>
  <Navbar/>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <CourseMainPageContainer id="content"/>
      </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>


<script setup>
import Footer from "@/components/navigation/FooterCard";
import Navbar from "@/components/navigation/navbar/NavbarBase";
import CourseMainPageContainer from "@/components/CourseMainPageContainer";
</script>

<style scoped>
</style>