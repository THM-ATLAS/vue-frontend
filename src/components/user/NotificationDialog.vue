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
        <v-btn
            v-if="props.notification.type_id === 1"
            color="primary"
            dark
            outlined
            href="/">
          {{ $t('page_not_found.home_button') }}
        </v-btn>
        <v-btn
            v-if="props.notification.type_id === 2"
            color="primary"
            dark
            href="/">
          {{ $t('page_not_found.home_button') }}
        </v-btn>
        <v-btn
            v-if="props.notification.type_id === 3"
            color="primary"
            dark
            href="/">
          {{ $t('page_not_found.home_button') }}
        </v-btn>
        <v-btn
            v-if="props.notification.type_id === 4"
            color="primary"
            dark
            href="/">
          {{ $t('page_not_found.home_button') }}
        </v-btn>
        <v-btn
            v-if="props.notification.type_id === 5"
            :color="theme === 'light' ? 'secondary' : 'primary'"
            variant="outlined"
            href="/">
          {{ $t('page_not_found.home_button') }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
</template>


<script setup lang="ts">
import {defineProps} from "vue";
import {Role} from "@/helpers/types";
import {useI18n} from "vue-i18n";
import {theme} from "@/helpers/theme";

const i18n = useI18n();


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

/*
{
        "type_id": 1,
        "name": "exercise upload"
    },
    {
        "type_id": 2,
        "name": "exercise edit"
    },
    {
        "type_id": 3,
        "name": "submission rated"
    },
    {
        "type_id": 4,
        "name": "modul"
    },
    {
        "type_id": 5,
        "name": "global"
    }
*/

function verwurstelNotification () {
  switch (props.notification.type_id) {
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
    default:
      break;
  }
}
</script>

<style scoped>

</style>