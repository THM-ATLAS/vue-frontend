<template>
  <v-card elevation="0" rounded="0">
    <v-btn
        v-bind="props"
        @click="goBack"
        icon="mdi-menu-left"
        class="ma-2"
        variant="outlined"/>
    <v-btn
        v-if="submission.exercise_id"
        @click="this.$router.push(`/exercise/${submission.exercise_id}`)"
        icon="mdi-newspaper"
        class="ma-2"
        variant="outlined"/>

    <v-dialog
        v-model="dialog"
        :scrollable="true"
    >
      <template v-slot:activator="{ props: dialog }">
        <v-tooltip bottom>
          <template v-slot:activator="{ props: tooltip }">
            <v-btn
                v-bind="mergeProps(dialog, tooltip)"
                icon="mdi-message-text"
                class="ma-2"
                variant="outlined"/>
          </template>
          <span>Frage zur Bewertung stellen</span>
        </v-tooltip>
      </template>
      <v-card width="auto"
              style="top: 20%">
        <v-card-title>
          <span class="text-h5">Kommunikation</span>
        </v-card-title>
        <!-- Nachrichten -->
        <div v-if="chat.length > 0">
          <v-container
              v-for="(message, index) in chat" :key="index">
            <v-row
                v-if="message.author === 'Du'"
                justify="end"
                align="center"
                class="ma-2">
              <v-col
                  cols="12"
                  sm="10"
                  md="8"
                  lg="6"
                  class="pa-2">
                <span class="text-h6 pr-2">{{ message.author }}</span>
                <span class="text-subheading">{{ formatDate(message.datetime) }}</span>
                <br/>
                <v-card
                    class="elevation-0"
                    outlined
                    color="primary"
                    text-color="white">
                  <v-card-text>
                    <span class="text-subtitle1">{{ message.message }}</span>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row
                v-else
                justify="start"
                align="center"
                class="ma-2">
              <v-col
                  cols="12"
                  sm="10"
                  md="8"
                  lg="6"
                  class="pa-2">
                <span class="text-h6 pr-2">{{ message.author }}</span>
                <span class="text-subheading">{{ formatDate(message.datetime) }}</span>
                <br/>
                <v-card
                    class="elevation-0"
                    outlined
                    color="grey lighten-4"
                    text-color="#000000">
                  <v-card-text>
                    <span class="text-subtitle1">{{ message.message }}</span>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <v-textarea v-model="question"/>
        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="dialog = false; submitQuestion(question); question = '';">Senden</v-btn>
          <v-btn text @click="dialog = false">Abbrechen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-header>
      <v-card-header-text class="text-h4 text-left fontszTi">
        Abgabe für <a @click="visitIntLink(submission.exercise_link)" class="font-weight-bold"
                      v-html="submission.exercise_title"/> vom {{ submission.date }}
      </v-card-header-text>
    </v-card-header>
    <!-- submission status -->
    <v-container>
      <div>
        <div v-if="submission.status === 'pending'">
          <v-icon class="ma-1" icon="mdi-file-question"/>
          <span class="font-weight-bold">Diese Abgabe wurde noch nicht bewertet.</span>
          <span v-if="submission.feedback"> Bitte beachte das Feedback.</span>
        </div>
        <div
            v-else-if="submission.status === 'accepted'">
          <v-icon class="ma-1" icon="mdi-file-check"/>
          <span class="font-weight-bold">Diese Abgabe wurde akzeptiert und die Aufgabe als erledigt markiert.</span>
        </div>
        <div
            v-else-if="submission.status === 'rejected'">
          <v-icon class="ma-1" icon="mdi-file-cancel"/>
          <span class="font-weight-bold">Diese Abgabe wurde abgelehnt.</span>
          <span v-if="submission.feedback"> Bitte beachte das Feedback, bevor Du erneut abgibst.</span>
        </div>
        <div
            v-else-if="submission.status === 'awarded'">
          <v-icon class="ma-1" icon="mdi-file-star"/>
          <span class="font-weight-bold">Diese Abgabe wurde akzeptiert und als besonders gut markiert. Weiter so!</span>
        </div>
        <div
            v-else-if="submission.status === 'graded'">
          <v-icon class="ma-1" icon="mdi-file-edit"/>
          <span class="font-weight-bold">Diese Abgabe wurde bewertet.</span>
        </div>
        <div
            v-else-if="submission.status === 'partially_reviewed'">
          <v-icon class="ma-1" icon="mdi-file-clock"/>
          <span class="font-weight-bold">Diese Abgabe wurde zum Teil bewertet.</span>
          <span v-if="submission.items && submission.items.filter(i => i.rating)"> Du kannst dir die Bewertungen unten ansehen.</span>
        </div>
        <div
            v-else-if="submission.status === 'auto_accepted'">
          <v-icon class="ma-1" icon="mdi-file-check"/>
          <span
              class="font-weight-bold">Diese Abgabe wurde automatisch akzeptiert und die Aufgabe als erledigt markiert.</span>
        </div>
        <div
            v-else-if="submission.status === 'auto_rejected'">
          <v-icon class="ma-1" icon="mdi-file-cancel"/>
          <span class="font-weight-bold">Diese Abgabe wurde automatisch abgelehnt.</span>
          <span> Bitte beachte, welche Teilabgaben abgelehnt wurden.</span>
        </div>
        <div
            v-else>
          <v-icon class="ma-1" icon="mdi-alert-circle"/>
          <span class="font-weight-bold">Unbekannter Status</span>

        </div>
      </div>
      <!--- feedback & grade -->
      <div>
        <div v-if="submission.feedback">
          <v-icon class="ma-1" icon="mdi-comment-text-outline"/>
          <span class="font-italic">Feedback zur Bewertung: </span>
          <span v-html="submission.feedback"/>
        </div>
        <div v-if="submission.grade">
          <v-icon class="ma-1" icon="mdi-pencil"/>
          <span class="font-weight-bold">Erhaltene Note: </span>
          <span v-html="submission.grade"/>
        </div>
      </div>
    </v-container>
    <!--- submission items -->
    <v-container>
      <v-container class="ma-6" v-if="!submission.items">
        <v-icon class="ma-1" icon="mdi-alert-circle"/>
        <span class="font-weight-bold">Diese Abgabe enthält keine Teilabgaben.</span>
      </v-container>
      <v-list three-line v-else>
        <template v-for="(item, index) in submission.items">

          <v-list-item
              v-if="item.type"
              :key="item.id"
              class="justify-center flex-column"
          >
            <!--- item title -->
            <div>
              <v-list-item-title v-if="item.type === 'code'">
                <v-icon icon="mdi-code-tags"/>
                Codeabgabe
              </v-list-item-title>
              <v-list-item-title v-else-if="item.type === 'single-line'">
                <v-icon icon="mdi-text-box"/>
                Einzeilige Textabgabe
              </v-list-item-title>
              <v-list-item-title v-else-if="item.type === 'multi-line'">
                <v-icon icon="mdi-text-box-multiple"/>
                Mehrzeilige Textabgabe
              </v-list-item-title>
              <v-list-item-title v-else-if="item.type === 'multiple-choice'">
                <v-icon icon="mdi-checkbox-marked"/>
                Multiple-Choice-Abgabe
              </v-list-item-title>
              <v-list-item-title v-else-if="item.type === 'file'">
                <v-icon icon="mdi-file"/>
                Dateiabgabe
              </v-list-item-title>
              <v-list-item-title v-else>
                Unbekannter Typ
              </v-list-item-title>
            </div>
            <!--- item title -->
            <v-list-item-subtitle v-if="item.title" v-html="item.title"/>
            <!--- item content -->
            <div>
              <div v-if="item.type === 'code'">
                <CodeEditor
                    width="auto"
                    :wrap_code="true"
                    :language_selector=false
                    :languages="[[item.language]]"
                    :value="item.content"
                    :copy_code="true"
                    :read_only="true"
                    :theme="'light'"
                    class="ma-2"
                />
              </div>

              <div v-else-if="item.type === 'single-line' || item.type === 'multi-line'">
                <v-list-item-title class="ma-3 text-pre-wrap" v-html="item.content"/>
              </div>

              <div v-else-if="item.type === 'multiple-choice'">
                <v-card
                    variant="outlined" class="ma-2"
                    width="max-content"
                >
                  <v-card-text
                      v-for="(choice, index) in item.content"
                      :key="index">
                    <v-icon class='mr-1' v-if="choice.selected" icon="mdi-checkbox-marked"/>
                    <v-icon class='mr-1' v-else icon="mdi-checkbox-blank"/>
                    <span class="text-wrap">{{ choice.text }}</span>
                  </v-card-text>
                </v-card>
              </div>

              <div v-else-if="item.type === 'file'">
                <v-list-item-title class="ma-3">
                  <v-icon icon="mdi-file-document"/>
                  {{ item.content.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="ma-3">
                  <v-icon icon="mdi-database"/>
                  {{ item.content.size }}, {{ item.content.type }}
                </v-list-item-subtitle>
                <div v-if="item.content.url">
                  <v-btn
                      :href="item.content.url"
                      class="ma-3"
                      color="primary"
                      title="Download"
                      variant="outlined"
                      rounded="0">
                    <v-icon icon="mdi-download"/>
                    Herunterladen
                  </v-btn>
                  <v-list-item-subtitle>
                    <v-icon icon="mdi-alert-circle"/>
                    Vorsicht beim Herunterladen - Dateien werden nicht gescannt!
                  </v-list-item-subtitle>
                </div>
                <v-list-item-subtitle
                    v-else>
                  <v-icon icon="mdi-folder-alert"/>
                  Datei kann nicht heruntergeladen werden.
                </v-list-item-subtitle>
              </div>
            </div>
            <!--- item review -->
            <div v-if="item.auto_review">
              <v-list-item-subtitle class="ma-3">
                <v-icon class="ma-1" icon="mdi-cog"/>
                <span>Diese Teilabgabe wurde automatisch bewertet und </span>
                <span v-if="item.auto_review.result === 'accepted'" class="font-weight-bold">
                  akzeptiert.
                </span>
                <span v-else-if="item.auto_review.result === 'rejected'" class="font-weight-bold">
                  abgelehnt.
                </span>
                <span v-else class="font-weight-bold">
                  hat einen unbekannten Bewertungsstatus.
                </span>
                <span v-if="item.auto_review.feedback"><br/>
                  <v-icon class="ma-1" icon="mdi-message-cog"/>
                  {{ item.auto_review.feedback }}
                </span>
              </v-list-item-subtitle>
            </div>
          </v-list-item>

          <v-divider
              v-if="index < submission.items.length - 1"
              :key="index"
              :inset="item.inset"
          />
        </template>
      </v-list>
    </v-container>
  </v-card>

</template>
<script lang="ts">

import {defineComponent, mergeProps} from "vue";
import moment from "moment";

import CodeEditor from 'simple-code-editor/CodeEditor.vue'

export default defineComponent({
  name: "SubmissionCard",
  components: {
    CodeEditor,
  },
  methods: {
    visitIntLink(url: string): void {
      this.$router.push(url);
    },
    goBack(): void {
      this.$router.back();
    },
    submitQuestion(question: string): void {
      console.log(question);
      // this.$store.dispatch('submitQuestion', {
      //   question: question,
      //   submission_id: this.submission.id,
      // });
    },
    mergeProps,
    formatDate(date: string): string {
      return moment(date).format('DD.MM.YYYY HH:mm');
    },
  },
  data: () => ({
    dialog: false,
    question: '',
    props: null,
    chat: [
      {
        author: 'Studentische Hilfskraft', // anonymized
        message: 'Der Code in "Irgendein Code" lässt sich nicht ausführen. Bitte überprüfe den Code und versuche es erneut.',
        datetime: '2020-01-07T17:00:00+01:00', // random date
      },
      {
        author: 'Du',
        message: 'Bei mir läuft der Code! Ich habe in der letzten Zeile eine schließende Klammer vergessen',
        datetime: '2020-01-07T23:22:00+01:00',
      },
      {
        author: 'Studentische Hilfskraft',
        message: 'Vielen Dank! Der Code lässt sich nun ausführen, ich habe die Bewertung korrigiert.',
        datetime: '2020-01-08T09:30:00+01:00',
      }
    ],
    submission: {
      id: 10393,
      exercise_title: "Zielscheibe",
      exercise_id: "103",
      date: "21.12.21",
      status: "partially_reviewed", // pending, accepted, rejected, graded, awarded, partially_reviewed, auto_accepted, auto_rejected
      // feedback: "Hast du ganz ganz toll gemacht", // optional, especially recommended for rejected & awarded
      grade: 1.2, // should not be used if status is not 'graded'
      items: [
        {
          id: 1, // item id
          type: "code", // code, multiple-choice, single-line, multi-line, file
          title: "Der abzugebende Programmcode", // describes the title of the item
          content: "void setup() {\n\tsize(400, 400);\n}\nvoid draw() {\n\tbackground(0);\n}\nint getNumber() {\n\treturn 41;\n}\nvoid reallyLongMethod(int a, int b, int c, int d) { // ooh look at me i'm a long method\n\t// nothing to see here!\n}", // code content
          language: "processing", // optional, only used for code items
          auto_review: { // indicates if this item was automatically reviewed
            result: "rejected", // accepted, rejected, unknown; only used if auto_review is true
            feedback: "Der Aufruf von getNumber hat nicht das erwartete Ergebnis (42) gegeben.", // optional, only used if auto_review is true
          }
        }, {
          id: 2,
          type: "multi-line",
          title: "Das Skript des Filmes 'Bee Movie' (Englisch)",
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of module, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Oan't say yellow black. They're both happy. It's yellow; and black.\n\nBut now we know. We're no longer in the business of making honey. We're in the business of doing more, with less bee-work.\n\nAnyway, this is your job. It's important, too, as bees work, pollinating us, teaching us about life and death. And as a responsible bee, you have to make sure that, too, is done right.\n\nYou may have heard that it's a dangerous job. But I'm not going to argue with you. I'm not going to quit your job. I'm going to make it look like I've got a few more lines of work to do.\n\nBut I promise, we'll get right back to work. Make sure you set the table.\n\nGo to the other side.\n\nYou may have heard that it's a dangerous job. But I'm not going to argue with you. I'm not going to quit your job. I'm going to make it look like I've got a few more lines of work to do.\n\nBut I promise, we'll get right back to work. Make sure you set the table.\n\nGo to the other side.\n\nYou may have heard that it's a dangerous job. But I'm not going to argue with you. I'm not going to quit your job. I'm going to make it look like I've got a few more lines of work to do.\n\nBut I promise, we'll get right back to work. Make sure you set the table.\n\nGo to the other side.\n\nYou may have heard that it's a dangerous job. But I'm not going to argue with you. I'm not going to quit your job. I'm going to make it look like I've got a few more lines of work to do.\n\nBut I promise, we'll get right back to work.",
          auto_review: { // indicates if this item was automatically reviewed
            result: "accepted", // accepted, rejected, unknown; only used if auto_review is true
          }
        }, {
          id: 3,
          type: "single-line",
          title: "Der Schmelzpunkt einer Eisen-Nickel-Kugel in Grad Celsius",
          content: "231.2C",
          auto_review: { // indicates if this item was automatically reviewed
            result: "accepted", // accepted, rejected, unknown; only used if auto_review is true
            feedback: "Antwort ist im erwarteten Rundungsraum (230-232 C).", // optional, only used if auto_review is true
          }
        }, {
          id: 4,
          type: 'multiple-choice',
          title: "Bezeichnungen der verwendeten Buchstaben",
          content: [
            {
              text: "A steht nicht für Apfel",
              selected: false,
            },
            {
              text: "B steht für Banane",
              selected: true,
            },
            {
              text: "C steht für Cherry (Kirsche)",
              selected: true,
            },
            {
              text: "D steht für Donut (ringförmiges Gebäck)",
              selected: false,
            },
          ]
        }, {
          id: 5,
          type: 'file',
          title: "Upload der generierten Datei zur Linearen Regression",
          content: {
            name: "test.txt",
            size: "1.2 MB",
            type: "text/plain",
            url: "https://www.google.com/",
          },
          auto_review: { // indicates if this item was automatically reviewed
            result: "rejected", // accepted, rejected, unknown; only used if auto_review is true
            feedback: "Falscher Datentyp, erwartet war .json", // optional, only used if auto_review is true
          }
        }, {
          id: 6,
          type: 'file',
          title: "Automatischer Upload der Log-Datei",
          content: {
            name: "logfile.txt",
            size: "22 KB",
            type: "text/plain",
            url: null,
          }
        },
        {
          id: 7,
          type: "code",
          title: "Irgendein Code",
          content: "String[] femaleName = new String[]{\"Anna\", \"Emilia\", \n" +
              "  \"Gudrun\", \"Ursela\", \"Olga\", \"Maya\", \"Gisela\", \"Knort\"};\n" +
              "String[] maleName = new String[]{\"Olaf\", \"Peter\", \"Thor\", \n" +
              "  \"Nero\", \"Gnaruff\", \"Ronald\", \"Gregor\", \"Rüdiger\"};\n" +
              "String[] connective = new String[]{\"Unermüdigte\", \"Schläfrige\", \n" +
              "  \"Hungrige\", \"Wütende\", \"Verschnupfte\", \"Blutende\", \"Unsportliche\", \n" +
              "  \"Schnelle\", \"Faule\", \"Fleißige\", \"Programmierende\"};\n" +
              "String[] surname = new String[]{\"von und zu Kunz\", \"von Drenor\", \"\", \n" +
              "  \"von Gießen\", \"von Atlantis\", \"aus der Hölle\"};\n" +
              "String name;\n" +
              "\n" +
              "void setup() {\n" +
              "  size(800, 150);\n" +
              "  textSize(35);\n" +
              "  textAlign(CENTER);\n" +
              "  name = getName();\n" +
              "}\n" +
              "\n" +
              "void draw() {\n" +
              "  background(0);\n" +
              "  fill(255);\n" +
              "  text(name, width / 2, 100);\n" +
              "}\n" +
              "\n" +
              "void keyPressed() {\n" +
              "  name = getName();\n" +
              "}\n" +
              "\n" +
              "String getName() {\n" +
              "  if (random(2) > 1)\n" +
              "    return femaleName[(int) random(femaleName.length)] + \" die \" + \n" +
              "      connective[(int) random(connective.length)] + \" \" + \n" +
              "      surname[(int) random(surname.length)];\n" +
              "  else\n" +
              "    return maleName[(int) random(maleName.length)] + \" der \" + \n" +
              "      connective[(int) random(connective.length)] + \" \" + \n" +
              "      surname[(int) random(surname.length)];\n" +
              "}\n",
          language: "processing",
        }, {
          id: 7,
          type: "code",
          title: "Mehr Code",
          content: "var x1, x2;\n" +
              "\n" +
              "var finishLine;\n" +
              "\n" +
              "function setup() {\n" +
              "    initializeFields();\n" +
              "    createCanvas(800, 350);\n" +
              "    finishLine = width - 45;\n" +
              "    textSize(50);\n" +
              "    textAlign(CENTER);\n" +
              "    strokeCap(PROJECT);\n" +
              "}\n" +
              "\n" +
              "function draw() {\n" +
              "    background(color(0xfe, 0xe6, 0x9c));\n" +
              "    drawFinishLine();\n" +
              "    strokeWeight(1);\n" +
              "    fill(color(0xf8, 0x7a, 0x63));\n" +
              "    circle(x1, 100, 50);\n" +
              "    fill(color(0x42, 0x7a, 0xa1));\n" +
              "    circle(x2, height - 100, 50);\n" +
              "    if (x1 > finishLine) {\n" +
              "        fill(0, 150);\n" +
              "        rect(0, 0, width, height);\n" +
              "        fill(255);\n" +
              "        text(\"Pferd 1 (oben) hat gewonnen!\", width / 2, height / 2);\n" +
              "        noLoop();\n" +
              "    } else if (x2 > finishLine) {\n" +
              "        fill(0, 150);\n" +
              "        rect(0, 0, width, height);\n" +
              "        fill(255);\n" +
              "        text(\"Pferd 2 (unten) hat gewonnen!\", width / 2, height / 2);\n" +
              "        noLoop();\n" +
              "    }\n" +
              "}\n" +
              "\n" +
              "function keyReleased() {\n" +
              "    if (key == 'a' || key == 'd')\n" +
              "        x1 += 5;\n" +
              "    else if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW)\n" +
              "        x2 += 5;\n" +
              "}\n" +
              "\n" +
              "function drawFinishLine() {\n" +
              "    stroke(255);\n" +
              "    strokeWeight(20);\n" +
              "    line(finishLine, 0, finishLine, height);\n" +
              "    strokeWeight(10);\n" +
              "    stroke(0);\n" +
              "    for (var i = 0; i < height + 10; i += 20) {\n" +
              "        point(finishLine - 5, i);\n" +
              "        point(finishLine + 5, i + 10);\n" +
              "    }\n" +
              "}\n" +
              "\n" +
              "function initializeFields() {\n" +
              "    x1 = 50;\n" +
              "    x2 = 50;\n" +
              "    finishLine = 0;\n" +
              "}\n",
          language: "js",
        }, {
          id: 8,
          type: "single-line",
          title: "Lateinische Bezeichnung der alpinen Bergziege",
          content: "Alpinus alpinus",
        }
      ],
    },
  }),
});
</script>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>

</style>