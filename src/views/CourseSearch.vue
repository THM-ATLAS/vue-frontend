<template>
  <SkipToContent/>
  <!--todo: Navbar/ covers v-container without manual margin unlike other pages-->
  <v-container>
    <v-row align-content="center">
      <v-col id="content">
        <v-text-field
          class="d-none d-md-block"
          label="Suche nach Kursen"
          prepend-inner-icon="mdi-magnify"
          variant="plain"
          bg-color="#eeeeee"
          role="search"
      />
      </v-col>
    </v-row>
    <v-row v-for="course in fillerCourses" :key="index">
      <p>{{course.courseName}}</p> <!-- temporary, pages does not load with v-for, course did not display using "CourseSearchResult" components -->
    </v-row>
  </v-container>
  <FooterCard/>

</template>

<script>
import Navbar from "@/components/NavbarBase";
import FooterCard from "@/components/FooterCard";
import CourseSearchResult from "@/components/CourseSearchResult";
export default {
  name: "CourseSearch",
  components: {CourseSearchResult, FooterCard, Navbar},
  data(){
    return {
      fillerCourses: [ {
        courseName: "Brückenkurs Programmieren",
        courseDescription: "Objektorientiertes Programmieren lernen.",
        courseThumbnail: require("../assets/product-2.jpg")
      },
        {
          courseName: "Brückenkurs Mathematik",
          courseDescription: "Mathematische Grundlagen die in allen technischen Studiengängen wichtig sind.",
          courseThumbnail: require("../assets/product-3.jpg")
        },
        {
          courseName: "Mikroprozessortechnik",
          courseDescription: "Lerne in diesem Kurs mit Mikroprozessoren zu arbeiten.",
          courseThumbnail: require("../assets/product-1.jpg")
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>