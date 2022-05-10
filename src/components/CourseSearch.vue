<template>
  <v-card class="help-card" elevation="0" rounded="0">
    <!--v-row align-content="center">
      <v-col id="content">
        <v-text-field
            label="Suche nach Kursen"
            prepend-inner-icon="mdi-magnify"
            variant="plain"
            role="search"
        />
      </v-col>
    </v-row-->
    <v-row v-for="course in fillerCourses" :key="course.resultId">
      <CourseSearchResult :course="course" class="searchResult"/>
    </v-row>
  </v-card>
</template>

<script setup>
import CourseSearchResult from "@/components/CourseSearchResult";

const fillerCourses = [
  {
    resultId: 1,
    courseName: "Brückenkurs Programmieren",
    courseDescription: "Objektorientiertes Programmieren lernen.",
    courseThumbnail: require("../assets/product-2.jpg"),
    id: 'bkp',
  },
  {
    resultId: 2,
    courseName: "Brückenkurs Mathematik",
    courseDescription: "Mathematische Grundlagen, die in allen technischen Studiengängen wichtig sind. Themen, welche behandelt werden: Gleichungen, Brüche, Wurzeln, Potenzen, Logarithmen, Trigonometrie und Vektoren.",
    courseThumbnail: require("../assets/product-4.jpg"),
    id: 'bkm',
  },
  {
    resultId: 3,
    courseName: "Mikroprozessortechnik",
    courseDescription: "Lerne in diesem Kurs mit Mikroprozessoren zu arbeiten.",
    courseThumbnail: require("../assets/product-1.jpg"),
    id: 'mpt',
  },
]

</script>

<style scoped>

</style>