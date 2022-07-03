<template>
  <v-card
      class="mx-auto"
      elevation="0"
      rounded="0"
  >
    <v-card-title>
      <div class="text-h3">404</div>
    </v-card-title>
    <v-card-text>
      <div class="text-h4">{{ $t('page_not_found.error_title') }}</div>
      <br/>
      <span>{{ $t('page_not_found.error_description') }}</span>
    </v-card-text>
    <v-card-actions>
      <v-btn
          color="secondary"
          dark
          href="/"
      >
        {{ $t('page_not_found.home_button') }}
      </v-btn>
      <v-btn
          color="secondary"
          dark
          @click="$router.back()"
      >
        {{ $t('page_not_found.back_button') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
</script>