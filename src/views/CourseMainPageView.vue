<template>
  <SkipToContent/>
  <Navbar/>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <CourseMainPage :course=sampleCourse :exercises=sampleExercises />
      </v-col>
    </v-row>
  </v-container>
  <Footer/>
</template>


<script setup>
import SkipToContent from "@/components/SkipToContent";
import Footer from "@/components/FooterCard";
import Navbar from "@/components/navbar/NavbarBase";
import CourseMainPage from "@/components/CourseMainPage";

const sampleCourse = {
      resultID: 1,
      courseName: "Brückenkurs Programmieren",
      courseDescription: "Objektorientiertes Programmieren lernen.",
      courseThumbnail: require("../assets/product-2.jpg")
}

const sampleExercises = [
  {
    exerciseID: 1,
    title: 'Zielscheibe',
    image: require("../assets/product-1.jpg"),
    description: 'Kreise klicken!',
  },
  {
    exerciseID: 2,
    title: 'Minesweeper',
    image: require("../assets/product-2.jpg"),
    description: 'Wie damals zu Zeiten von Windows XP.',
  },
  {
    exerciseID: 3,
    title: "Conway's Game of Life",
    image: require("../assets/product-4.jpg"),
    description: 'Einfache Regeln können zu komplexen Systemen führen.',
  }
]
/*
export default {
  name: "CourseMainPageView",
  components: {SkipToContent, Footer, Navbar, CourseMainPage}
}*/
</script>

<style scoped>
</style>