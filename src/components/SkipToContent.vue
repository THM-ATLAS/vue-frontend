<template>
  <a :href="'#' + this.$props.id" class="skipLink" ref="skipLink" tabindex="0">Skip to main
    content</a>
</template>

<script>
export default {
  name: "SkipToContent",
  props: {
    id: {
      type: String,
      default: "content"
    }
  },
}
</script>

<style scoped>
.skipLink {
  background: #e77e23;
  height: 30px;
  left: 50%;
  padding: 8px;
  position: absolute;
  transform: translateY(-100%);
  transition: transform 0.3s;
  z-index: 1000 !important;
}

.skipLink:focus, .skipLink:active, .skipLink:focus-within {
  transform: translateY(0%);
}
</style>