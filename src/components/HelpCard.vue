<template>
  <v-card class="help-card" elevation="0" rounded="0">
    <v-card-header>
      <v-icon icon="mdi-globe-model" left="true"/>
      <v-card-header-text class="text-left fontszTi">
        Willkommen zu ATLAS!
      </v-card-header-text>
      <v-card-subtitle>Informationen & Hilfe</v-card-subtitle>
    </v-card-header>
    <v-container>
      <v-card-text class="text-left fontszEx grow">
        <div class="text-justify">
          <!-- über Atlas - die Lernplattform für die THM -->
          <h2>Was ist ATLAS?</h2>
          <div>
            <p class="text-body-1">
              ATLAS ist eine Lernplattform, auf welcher Studierende zu Modulen
              begleitende Aufgaben finden und bearbeiten können.
            </p>
            <p class="text-body-1">
              Dabei soll die Plattform eine einfache und schnelle Lösung für die
              Aufgabenstellungen der THM ermöglichen. So können Studierende
              Lösungen zu Aufgaben je nach Aufgabenart entweder direkt und
              automatisiert überprüfen lassen, oder durch eine Abgabe von
              einer/einem Dozent:in Rückmeldung erhalten.
            </p>
          </div>
          <br/>
          <!-- Funktionsweise -->
          <h2>Wie funktioniert ATLAS?</h2>
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
                <b>ATLAS für Lehrende</b>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1">
                  Um Aufgaben auf ATLAS bereitzustellen, müssen Lehrende bzw.
                  Verantwortliche einen Moduleintrag beantragen. Nach dessen
                  Einrichtung können Aufgaben zu diesem Modul eingefügt werden.
                  <br/>
                  Dies kann sowohl händisch im Live-Editor erfolgen, als auch
                  durch das Hochladen von <code>.tex</code>-, <code>.odt</code>,
                  oder <code>.txt</code>-Dateien, welche dann automatisch
                  umgewandelt werden. <br/>
                  Ggf. bedarf es einer Überprüfung, ob die Aufgabe wie gewünscht
                  dargestellt wird. Zudem müssen Bilder, falls gewünscht,
                  manuell hochgeladen werden.<br/>
                  Für das Modul selbst sowie einzelne Aufgaben werden Links
                  erzeugt, welche dann z.B. via Moodle mit den Studierenden
                  geteilt werden können. Für ein Modul können mehrere
                  Verantwortliche eingetragen werden, welche Aufgaben anpassen
                  und Abgaben bewerten können. Optional können für Rückmeldungen
                  und Abgaben Benachrichtigungen verschickt werden.
                  <br/>
                  <br/>
                  <v-alert icon="mdi-lightbulb">
                    Falls Sie bei der Einrichtung eines Moduls oder dessen
                    Aufgaben Hilfe benötigen, steht Ihnen das ATLAS-Team gerne
                    zur Verfügung.
                  </v-alert>
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel rounded="0" elevation="0">
              <v-expansion-panel-title
                  expand-icon="mdi-plus"
                  collapse-icon="mdi-minus"
              >
                <b>ATLAS für Studierende</b>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-1">
                  Nach erfolgreicher Anmeldung via LDAP mit dem THM-Nutzerkonto
                  können Studierende auf ATLAS zugreifen. Dabei müssen sie das
                  eigene Modul auswählen (bzw. über den durch Lehrende geteilten
                  Link die Seite besuchen), und sich einschreiben. Dann können
                  Aufgaben eingesehen und bearbeitet werden.
                  <br/>
                  Lösungen erledigter Aufgaben können je nach Aufgabentyp
                  entweder direkt ausgewertet werden, oder mithilfe einer Abgabe
                  von einer/einem Dozent:in Rückmeldung erhalten. Erledigte
                  Aufgaben werden mit markiert, und der/dem Studierenden werden
                  Punkte zugeschrieben.
                </p>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <br/>
        <h2>Bei ATLAS mitwirken</h2>
        <p class="text-body-1">
          ATLAS ist Open Source und wird von Studierenden entwickelt. Besuchen
          Sie uns doch auf
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
h2 {
  margin-bottom: 3%;
}

.help-card {
  margin-top: 3em;
  margin-bottom: 3em;
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
