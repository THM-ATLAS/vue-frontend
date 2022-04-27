<template>
  <div class="spacer"/>
  <div class="footer">
    <v-footer
        color="secondary"
        role="contentinfo"
        padless
        max-height="200px"
    >
      <v-card width="100%" rounded="0" elevation="0" color="transparent" class="justify-content-center">
        <v-card-text>
          <v-row
              justify="center"
              :no-gutters="true"
          >
            <v-col
                class="lighten-1 py-4 text-center white--text"
                cols="12"
            >
              {{ date }} — <strong>Atlas</strong> ein Projekt der THM
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider/>
        <v-row justify="center">
          <v-card-text>
            <v-btn elevation="0" color="secondary" v-for="link in links" :key="link[0]" @click.prevent.stop="link[1]">
              <a>{{ link[0] }}</a>
            </v-btn>
          </v-card-text>
        </v-row>
      </v-card>
    </v-footer>
  </div>
</template>

<script lang='ts'>
import {useRouter} from "vue-router";


export default {
  name: "FooterCard",

  setup(): any {
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
      ['Home', goToMainpage],
      ['Impressum', goToImpressum], //wir müssen uns noch eine Lösung für Bildnachweise überlegen
      ['Hilfe', goToHelp],
      ['Datenschutzerklärung', goToPrivacyStatement],
      ['THM', goToThmMainpage],
    ];

    return {date, links};
  }
};
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
</style>