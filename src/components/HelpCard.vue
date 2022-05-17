<template>
  <v-card class="help-card" elevation="0" rounded="0">
    <v-card-header>
      <v-icon icon="mdi-globe-model" left="true"/>
      <v-card-header-text class="text-left fontszTi">
        {{$t('help_page.title')}}
      </v-card-header-text>
      <v-card-subtitle>{{$t('help_page.subtitle')}}</v-card-subtitle>
    </v-card-header>
    <v-container>
      <v-card-text class="text-left fontszEx grow">
        <div class="text-justify">
          <!-- über Atlas - die Lernplattform für die THM -->
          <h2>{{$t('help_page.what_is_atlas.title')}}</h2>
          <div>
            <p class="text-body-1">
              {{$t('help_page.what_is_atlas.description')}}
            </p>
          </div>
          <br/>
          <!-- Funktionsweise -->
          <h2>{{$t('help_page.how_atlas_works.title')}}</h2>
          <div class="text-subheader"></div>
        </div>
        <br/>
        <div class="accordion-panel">
          <v-expansion-panels>
            <v-expansion-panel rounded="0" elevation="0">
              <v-expansion-panel-title
                  expand-icon="mdi-plus"
                  collapse-icon="mdi-minus"
              >
                <b>{{$t('help_page.how_atlas_works.description.atlas_for_lecturers.title')}}</b>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1">
                  {{$t('help_page.how_atlas_works.description.atlas_for_lecturers.description')}}
                  <br><br>
                  <v-alert icon="mdi-lightbulb">
                    {{$t('help_page.how_atlas_works.description.atlas_for_lecturers.help')}}
                  </v-alert>
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel rounded="0" elevation="0">
              <v-expansion-panel-title
                  expand-icon="mdi-plus"
                  collapse-icon="mdi-minus"
              >
                <b>{{$t('help_page.how_atlas_works.description.atlas_for_students.title')}}</b>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1">
                  {{$t('help_page.how_atlas_works.description.atlas_for_students.description')}}
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <br/>
        <h2>{{$t('help_page.contribute_to_atlas.title')}}</h2>
        <p class="text-body-1">
          {{$t('help_page.contribute_to_atlas.description')}}
          <a href="https://github.com/THM-ATLAS"
             class="text-decoration-none">
            GitHub
          </a>
          !
        </p>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script setup>
</script>

<style scoped>
* {
  white-space: pre-line;
}
h2 {
  margin-bottom: 3%;
}

.text-body-1 {
  margin-bottom: 3%;
}

.text-subheader {
  margin-bottom: 1%;
}

.accordion-panel {
  margin-top: 0;
  margin-bottom: 3%;
}
</style>
