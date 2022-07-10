<template>
    <v-card>
      <v-card-title>
        {{props.notification.title}}
      </v-card-title>
      <v-card-text>
        {{props.notification.content}}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- Notification was for an exercise upload -->
        <v-btn
            v-if="props.notification.type_id === 1"
            :color="theme === 'light' ? 'secondary' : 'primary'"
            variant="outlined"
            :href="'/'+ props.notification.module_id + '/e/' + props.notification.exercise_id">
          {{ $t('buttons.to_exercise') }}
        </v-btn>
        <!-- Notification was for an exercise edit -->
        <v-btn
            v-if="props.notification.type_id === 2"
            :color="theme === 'light' ? 'secondary' : 'primary'"
            variant="outlined"
            :href="'/'+ props.notification.module_id + '/e/' + props.notification.exercise_id">
          {{ $t('buttons.to_exercise') }}
        </v-btn>
        <!-- Notification was for a rated submission -->
        <v-btn
            v-if="props.notification.type_id === 3"
            :color="theme === 'light' ? 'secondary' : 'primary'"
            variant="outlined"
            :href="'/'+ props.notification.module_id + '/s/' + props.notification.exercise_id">
          {{ $t('buttons.to_submission') }}
        </v-btn>
        <!-- Notification was for a module -->
        <v-btn
            v-if="props.notification.type_id === 4"
            :color="theme === 'light' ? 'secondary' : 'primary'"
            variant="outlined"
            :href="'/'+ props.notification.module_id">
          {{ $t('buttons.to_module') }}
        </v-btn>
        <!-- Notification was a global notification and does not need a button -->
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
</template>


<script setup lang="ts">
import {defineProps} from "vue";
import {Role} from "@/helpers/types";
import {useI18n} from "vue-i18n";
import {theme} from "@/helpers/theme";

const props = defineProps<{
  notification: {
    notification_id: number,
    title: string,
    content: string,
    time: string,
    type_id: number,
    module_id: number | null,
    exercise_id: number | null,
    submission_id: number | null,
    read: boolean
  },
  user: {
    user_id : number,
    roles : Role[],
    name : string,
    username : string,
    email : string,
    password: string | null,
  }
}>()

</script>

<style scoped>

</style>