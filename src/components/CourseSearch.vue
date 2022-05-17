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
    <v-row v-for="course in courses" :key="course.id">
      <CourseSearchResult :id="course.id" :moduleName="course.moduleName" class="searchResult"/>
    </v-row>
    
    <v-pagination class="page-navigator"></v-pagination>
  </v-card>
  
</template>

<script setup>
import CourseSearchResult from "@/components/CourseSearchResult";
import ModuleService from "@/services/ModuleService";
import {reactive, onBeforeMount} from "vue";

const courses = reactive ([])

let apiCourses;

onBeforeMount(async () => {
  apiCourses = (await ModuleService.loadModules()).data
     apiCourses.forEach(result => {
       console.log(result)
       let newEntry = {
         id: result.module_id,
         moduleName : result.name
       }
       courses.push(newEntry)
     })
})

</script>

<style scoped>
.page-navigator {
  margin-top: 2em;
}
</style>