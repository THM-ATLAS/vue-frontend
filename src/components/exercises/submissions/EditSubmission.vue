<template>
  <v-card elevation="0" rounded="0">
    <v-btn
        @click="goBack"
        icon="mdi-menu-left"
        class="ma-2"
        variant="outlined"/>
    <v-container>
      <v-card-title class="text-h5">{{$t('submission.submit-a-solution.title')}}</v-card-title>
      <v-form
              ref="form"
              class="pa-4 pt-6"
      >
        <v-textarea v-model="formInput"
                    filled
                    :label="$t('submission.submit-a-solution.form-placeholder')"
        ></v-textarea>
      </v-form>
      <v-card-actions>
        <v-btn @click="adjustSubmission" color="primary">{{$t('buttons.save')}}</v-btn>
        <v-btn @click="deleteSubmission" color="red">{{$t('buttons.delete')}}</v-btn>
        <v-btn @click="goBack">{{$t('buttons.cancel')}}</v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
  import router from "@/router";
  import {Submission} from "@/helpers/types";
  import SubmissionService from "@/services/SubmissionService";
  import {onBeforeMount, ref, Ref} from "vue";

  const exerciseId: number = Number(router.currentRoute.value.params.id);
  const submission: Ref<Submission> = ref({}) as Ref<Submission>;
  const formInput = ref("");
  const userId = ref(0);

  onBeforeMount(async () => {
    submission.value = (await SubmissionService.getCurrentSubmission(exerciseId)).data;
    formInput.value = submission.value.content.content;
    userId.value = submission.value.user_id;
  });

  async function adjustSubmission() {
    const s: Submission = {
      submission_id : submission.value.submission_id,
      exercise_id: exerciseId,
      user_id : userId.value,
      upload_time: new Date().toISOString(),
      grade: null,
      teacher_id: null,
      comment: null,
      type: submission.value.type,
      content: {
        type: submission.value.content.type,
        submission_id: submission.value.submission_id,
        content: formInput.value,
        language: submission.value.content.language
      }
    }
    await SubmissionService.adjustSubmission(s);
    goBack();
  }

  async function deleteSubmission() {
    await SubmissionService.deleteSubmission(submission.value.submission_id);
    goBack();
  }

  function goBack(): void {
    router.back();
  }
</script>

<style scoped>

</style>