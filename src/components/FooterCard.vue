<template>
  <div class="spacer"/>
  <div class="footer">
    <v-footer
        color="secondary"
        role="contentinfo"
        max-height="200px"
        :padless="true"
    >
      <v-card width="100%" rounded="0" elevation="0" color="transparent" class="justify-content-center text-center">
        <v-row justify="center">
          <v-card-text>
            <v-btn class="mx-4" elevation="0" color="secondary" v-for="link in links" :key="link[0]"
                   @click.prevent.stop="link[1]">
              <a>{{ $t(`footer.${link[0]}`) }}</a>
            </v-btn>
          </v-card-text>
        </v-row>
        <v-divider id="h-line"/>
        <v-card-text class="text-white">
          {{ date }} — <strong>{{ $t("app.name") }}</strong>, {{ $t("footer.a_project_by_thm") }}
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script setup lang='ts'>
  import {useRouter} from "vue-router";

  const router = useRouter();
  let date = new Date().getFullYear();

  function goToMainpage(): void {
    router.push("/mainpage");
  }

  function goToImpressum(): void {
    location.replace('https://www.thm.de/site/impressum.html')
  }

  function goToHelp(): void {
    router.push("/help");
  }

  function goToThmMainpage(): void {
    location.replace('https://www.thm.de/site/')
  }

  function goToPrivacyStatement(): void {
    location.replace('https://www.thm.de/site/datenschutz.html')
  }

  let links = [
    ['home', goToMainpage],
    ['imprint', goToImpressum], //wir müssen uns noch eine Lösung für Bildnachweise überlegen
    ['help', goToHelp],
    ['data_protection', goToPrivacyStatement],
    ['thm', goToThmMainpage],
  ];
</script>

<style>
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 200px;
    background-color: #fafafa;
  }

  .spacer {
    height: 200px;
  }

  #h-line {
    border-top: 1px solid #b7b7b7;
  }
</style>