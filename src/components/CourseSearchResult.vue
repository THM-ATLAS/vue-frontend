<template>
<v-container> <!-- todo: alignment and styling -->
  <v-row>
    <v-col><v-img v-bind:src=courseThumbnail></v-img></v-col>
    <v-col>
      <v-container>
        <v-col>
          <v-row>{{courseName}}</v-row>
          <v-row>{{courseDescription}}</v-row>
        </v-col>
      </v-container>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: "CourseSearchResult",
  props: {
    courseName: String,
    courseDescription: String,
    courseThumbnail: Image,
  }
}
</script>

<style scoped>

</style>