<template>
  <NavbarAdmin/>
  <v-main>
    <v-row justify="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <v-card>
          <v-card-text>
            <div v-html="$t('admin.choose_page')"/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<style scoped>
.main {
  margin-top: 2em;
}
</style>

<script setup lang='ts'>
import NavbarAdmin from "@/components/admin/NavbarAdmin.vue";
</script>