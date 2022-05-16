<template>
  <CourseMainPage :course=sampleCourse :exercises=exercises />
</template>

<script setup>
import CourseMainPage from "@/components/CourseMainPage";
import TaskService from "@/services/TaskService";


const sampleCourse = {
  resultID: 1,
  courseName: "Brückenkurs Programmieren",
  courseDescription: "Objektorientiertes Programmieren lernen.",
  courseThumbnail: require("../assets/product-2.jpg")
}

let exercises = [];
exercises.push(TaskService.getTask(1));
exercises.push(TaskService.getTask(2));
exercises.push(TaskService.getTask(3));
/*const sampleExercises = [
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
]*/
</script>

<style scoped>

</style>