<template>
  <div id="skipLinkContainer">
    <a :href="'#' + id" class="skipLink" ref="skipLink" tabindex="0" v-html="$t('app.skip_to_content')"/>
  </div>
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

<style scoped lang="scss">
.skipLink {
  color: rgb(var(--v-theme-surface));
  height: 30px;
  text-decoration: none;
  padding: 10px;
  background: rgb(var(--v-theme-skipLink));
  z-index: 1000 !important;
  transform: translateY(-110%);
  transition: transform 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.skipLink:focus {
  transform: translateY(0%);
  top: 100px;
}

#skipLinkContainer {
  z-index: 1000 !important;
  width: 200px;
  margin: 0 auto;
}
</style>