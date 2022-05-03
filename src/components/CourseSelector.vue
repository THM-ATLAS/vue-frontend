<template>
  <!--v-select
        v-if="this.$route.params.course"
        v-model="this.$route.params.course"
        :items="courses"
        :rules="[v => !!v || 'Item is required']"
        label="Course"
        required
    /-->
  <v-menu width="10em" origin="top" transition="scale-transition"
          v-if="courses.find(c => c.id === this.$route.params.course)">
    <template v-slot:activator="{ props }">
      <v-btn class="d-none d-md-flex mr-4 ml-4" v-bind="props" variant="outlined">
        <v-icon class="mr-2" icon="mdi-book-open-page-variant"/>
        {{
          courses.find(c => c.id === this.$route.params.course)?.name || 'Error'
        }}
      </v-btn>
    </template>
    <v-list min-width="500px">
      <v-list-item v-for="(course, index) in courses.filter(c => c.id !== this.$route.params.course)" :key="index"
                   variant="outlined">
        <v-btn
            color="secondary"
            v-html="course.name"
            @click="$router.push(`/${course.id}/`)"
        />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "CourseSelector",
  props: {
    courses: {
      type: Array,
      required: true
    }
  },
}
</script>