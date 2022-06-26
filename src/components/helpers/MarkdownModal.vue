<template>
  <Editor
      v-if="editor"
      preview-theme="github"
      code-theme="github"
      :theme="theme"
      v-model="contentRef"
      language="en-US"
      :toolbars="toolbars"
      :footers="[]"
      :showCodeRowNumber="true"
      @on-upload-img="onUploadImg"
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
      :footers="[]"
      :showCodeRowNumber="true"/>
</template>

<script setup lang="ts">
import Editor from 'md-editor-v3';
import {PropType, ref, watch} from "vue";
import {theme} from "@/helpers/theme";
import AssetService from "@/services/AssetService";
import {Asset} from "@/helpers/types";

// eslint-disable-next-line no-undef
const props = defineProps({
  modelValue: {
    type: String as PropType<string>,
    default: '',
  },
  editor: {
    type: Boolean as PropType<boolean>,
    default: false,
  }
});

// eslint-disable-next-line no-undef
defineEmits(['update:modelValue']);

const contentRef = ref('');

// https://imzbf.github.io/md-editor-v3/docs/index#%F0%9F%A7%B1%20toolbars
const toolbars = [
  'bold', 'underline', 'italic', 'strikeThrough',
  '-',
  'unorderedList', 'orderedList', 'quote',
  '-',
  'link', 'table', 'codeRow', 'code', 'image',
  '-',
  'katex', 'sub', 'sup', 'mermaid',
  '=',
  'revoke', 'next', 'pageFullscreen',
]

watch(props, (val) => {
  contentRef.value = val.modelValue
})

// eslint-disable-next-line no-unused-vars
const onUploadImg = async (files: Array<File>, callback: (url: Array<String>) => void) => {

  const res = await Promise.all(files.map((file: File) => {

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = async () => {
        console.log(reader.result);

        if (!reader.result) {
          reject(new Error("Could not read file"));
        } else {
          const base64Only = reader.result.toString().split(',')[1];

          const asset: Asset = {
            asset_id: 0,
            asset: base64Only,
            public: true,
            filename: file.name,
          };

          console.log(asset);

          AssetService.addAsset(asset).then((res) => {
            console.log(res);

            const asset_id = res.data.asset_id == 0 ? 10 : res.data.asset_id;
            const url: string = `/api/assets/${asset_id}/view`;
            console.log(url);

            resolve(url);
          }).catch((err) => {
            console.log(err);
            reject(err);
          });

        }
      };
      reader.onerror = (err) => {
        reject(err);
      };
    });
  }));

  callback(res as Array<String>);
}

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