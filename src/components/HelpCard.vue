<template>
  <v-card elevation="0" rounded="0">
    <v-card-header>
      <v-icon icon="mdi-globe-model"/>
      <v-card-header-text class="text-left fontszTi">
        Willkommen zu ATLAS!
      </v-card-header-text>
      <v-card-subtitle>
        Informationen & Hilfe
      </v-card-subtitle>
    </v-card-header>
    <v-container>
      <v-card-text class="text-left fontszEx">
        <div class="text-justify">
          <!-- über Atlas - die Lernplattform für die THM -->
          <div class="text-h4">
            Was ist ATLAS?
          </div>
          <p class="text-body-1">
            ATLAS ist eine Lernplattform, auf welcher Studierende zu Modulen begleitende Aufgaben finden und bearbeiten
            können.
          </p>
          <p class="text-body-1">
            Dabei soll die Plattform eine einfache und schnelle Lösung für die Aufgabenstellungen der THM ermöglichen.
            So können Studierende Lösungen zu Aufgaben je nach Aufgabenart entweder direkt und automatisiert überprüfen
            lassen,
            oder durch eine Abgabe von einer/einem Dozent:in Rückmeldung erhalten.
          </p>
          <br/>
          <!-- Funktionsweise -->
          <div class="text-h4">
            Wie funktioniert ATLAS?
          </div>
          <div class="text-h6">
            <b>ATLAS für Lehrende</b>
          </div>
          <p class="text-body-1">
            Um Aufgaben auf ATLAS bereitzustellen, müssen Lehrende bzw. Verantwortliche einen Moduleintrag beantragen.
            Nach dessen Einrichtung können Aufgaben zu diesem Modul eingefügt werden. <br/>
            Dies kann sowohl händisch im Live-Editor erfolgen, als auch durch das Hochladen von <code>.tex</code>-,
            <code>.odt</code>, oder <code>.txt</code>-Dateien,
            welche dann automatisch umgewandelt werden. <br/>
            Ggf. bedarf es einer Überprüfung, ob die Aufgabe wie gewünscht dargestellt wird.
            Zudem müssen Bilder, falls gewünscht, manuell hochgeladen werden.<br/>
            Für das Modul selbst sowie einzelne Aufgaben werden Links erzeugt,
            welche dann z.B. via Moodle mit den Studierenden geteilt werden können.
            <v-alert icon="mdi-lightbulb">
              Falls Sie bei der Einrichtung eines Moduls oder dessen Aufgaben Hilfe benötigen, steht Ihnen das
              ATLAS-Team gerne zur Verfügung.
            </v-alert>
            Für ein Modul können mehrere Verantwortliche eingetragen werden, welche Aufgaben anpassen und Abgaben
            bewerten können.
            Optional können für Rückmeldungen und Abgaben Benachrichtigungen verschickt werden.
          </p>
        </div>
        <br/>
        <div class="text-h6">
          <b>ATLAS für Studierende</b>
        </div>
        <p class="text-body-1">
          Nach erfolgreicher Anmeldung via LDAP mit dem THM-Nutzerkonto können Studierende auf ATLAS zugreifen.
          Dabei müssen sie das eigene Modul auswählen (bzw. über den durch Lehrende geteilten Link die Seite besuchen),
          und sich einschreiben.
          Dann können Aufgaben eingesehen und bearbeitet werden.
          <br/>
          Lösungen erledigter Aufgaben können je nach Aufgabentyp entweder direkt ausgewertet werden, oder mithilfe
          einer Abgabe von einer/einem Dozent:in Rückmeldung erhalten. Erledigte Aufgaben werden mit markiert, und
          der/dem Studierenden werden Punkte zugeschrieben.

        </p>
        <br/>
        <div class="text-h4">
          Bei ATLAS mitwirken
        </div>
        <p class="text-body-1">
          Atlas ist Open Source und wird von Studierenden entwickelt. Besuchen Sie uns auf <a
            href="https://git.thm.de/br-ckenkurs-programmieren/atlas-die-lernplattform"
            class="text-decoration-none"
        >GitLab</a>!
        </p>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script lang='ts'>
import {defineComponent} from "vue";

export default defineComponent({
  name: "HelpCard"
});
</script>