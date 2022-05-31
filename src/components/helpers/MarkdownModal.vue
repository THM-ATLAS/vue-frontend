<template>
  <Editor
      v-if="editor"
      preview-theme="github"
      code-theme="github"
      :theme="theme"
      v-model="contentRef"
      language="en-US"
      @input="$emit('update:modelValue', $event.target.value)"
      :toolbars="toolbars"
      :showCodeRowNumber="true"
  />

  <Editor
      v-else
      style="background: none"
      preview-theme="github"
      code-theme="github"
      previewOnly
      :theme="theme"
      class="text-block"
      language="en-US"
      :modelValue="modelValue"
      :showCodeRowNumber="true"/>
</template>

<script setup>
import Editor from 'md-editor-v3';
import {toRef} from "vue";
import {theme} from "@/helpers/theme";

// these are compiler macros that don't need to be imported
// eslint-disable-next-line no-undef
const props = defineProps(['modelValue', 'editor', 'storePath']);
// eslint-disable-next-line no-undef
defineEmits(['update:modelValue']);

const contentRef = toRef(props, 'modelValue');

// https://imzbf.github.io/md-editor-v3/docs/index#%F0%9F%A7%B1%20toolbars
const toolbars = [
  'bold', 'underline', 'italic', 'strikeThrough',
  '-',
  'unorderedList', 'orderedList', 'quote',
  '-',
  'link', 'table', 'codeRow', 'code',
  '-',
  'katex', 'sub', 'sup', 'mermaid',
  '=',
  'revoke', 'next', 'pageFullscreen',
]

</script>

<style>
.md-content .md-preview,
.md-content .md-html {
  word-break: break-word;
  word-wrap: break-word;
  overflow-wrap: break-word;

  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
}
</style>