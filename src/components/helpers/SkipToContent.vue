<template>
    <a :href="'#' + id" class="skipLink" ref="skipLink" tabindex="0" v-html="$t('app.skip_to_content')"/>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps({
  id: {
    type: String,
    default: 'content'
  }
});
</script>

<style scoped>
.skipLink {
  color:white;
  height: 30px;
  text-decoration: none;
  padding: 10px;
  position: absolute;
  background: #4a5c66;
  z-index: 1000 !important;
  transform: translateY(-100%);
  transition: transform 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.skipLink:focus {
  transform: translateY(0%);
  top: 100px;
}
</style>