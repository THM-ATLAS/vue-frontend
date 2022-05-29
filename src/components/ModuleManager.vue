<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col cols="1" align-self="center">
          <v-btn @click="goBack" class="back-button"> &lt; </v-btn>
        </v-col>
        <v-col cols="9">
          <v-card-title>Modulname</v-card-title>
        </v-col>
        <v-col cols="2" align-self="center">
          <v-btn>Edit Tags</v-btn>
        </v-col>
      </v-row>
    </v-card>
    <br />
    <v-card>
      <v-row>
        <v-col cols="12">
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Rollen</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Max Mustermann</td>
                <td>Admin, Student</td>
              </tr>
              <tr>
                <td>Test Tester</td>
                <td>Student</td>
              </tr>
              <tr>
                <td>Marie Musterfrau</td>
                <td>Tutor, Student</td>
              </tr>
              <tr>
                <td>Max Mustermann</td>
                <td>Admin, Student</td>
              </tr>
              <tr>
                <td>Test Tester</td>
                <td>Student</td>
              </tr>
              <tr>
                <td>Marie Musterfrau</td>
                <td>Tutor, Student</td>
              </tr>
              <tr>
                <td>Max Mustermann</td>
                <td>Admin, Student</td>
              </tr>
              <tr>
                <td>Test Tester</td>
                <td>Student</td>
              </tr>
              <tr>
                <td>Marie Musterfrau</td>
                <td>Tutor, Student</td>
              </tr>
              <tr>
                <td>Max Mustermann</td>
                <td>Admin, Student</td>
              </tr>
              <tr>
                <td>Test Tester</td>
                <td>Student</td>
              </tr>
              <tr>
                <td>Marie Musterfrau</td>
                <td>Tutor, Student</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
        <v-col cols="12">
          <v-pagination></v-pagination>
        </v-col>
      </v-row> </v-card
  ></v-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

function goBack(): void {
  router.back();
}
</script>

<style scoped></style>
