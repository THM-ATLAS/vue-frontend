<template>
  <v-card elevation="0" rounded="0">
    <v-card-header>
      <v-card-header-text class="text-left text-h4">
        Abgabe erstellen
      </v-card-header-text>
    </v-card-header>
    <div>
      <v-card-subtitle v-if="auto_review==='full'">
        Diese Abgabe wird automatisch bewertet.
      </v-card-subtitle>
      <v-card-subtitle v-else-if="auto_review==='partial'">
        Diese Abgabe wird teilweise automatisch bewertet.
      </v-card-subtitle>
      <v-card-subtitle v-else>
        Bewertung dieser Abgabe erfolgt manuell.
      </v-card-subtitle>
    </div>
    <form>
      <v-container>
        <v-container class="ma-6" v-if="!items">
          <v-icon class="ma-1">mdi-alert-circle</v-icon>
          <span class="font-weight-bold">Diese Abgabe enthält keine Teilabgaben.</span>
        </v-container>
        <v-list three-line v-else>
          <template v-for="(item, index) in items">

            <v-list-item
                v-if="item.type"
                :key="item.id"
                class="justify-center flex-column"
            >
              <!--- item title -->
              <div class="ma-2">
                <v-list-item-title>
                  <v-icon v-if="item.type === 'code'" icon="mdi-code-tags"/>
                  <v-icon v-else-if="item.type === 'single-line'" icon="mdi-text-box"/>
                  <v-icon v-else-if="item.type === 'multi-line'" icon="mdi-text-box-multiple"/>
                  <v-icon v-else-if="item.type === 'multiple-choice'" icon="mdi-checkbox-multiple-marked-outline"/>
                  <v-icon v-else-if="item.type === 'file'" icon="mdi-file"/>
                  <v-icon v-else icon="mdi-question"/>
                  {{ item.title }}
                </v-list-item-title>
              </div>
              <!--- item context -->
              <v-list-item-subtitle v-if="item.body" v-html="item.body"/>
              <!--- item content -->
              <v-container>
                <v-container v-if="item.type === 'code'">
                  <v-row class="justify-center">
                    <v-col cols="auto">
                      <CodeEditor
                          :wrap_code="true"
                          :language_selector=false
                          :languages="[[item.language]]"
                          v-model="submission_items[index].content"
                          :copy_code="false"
                          :read_only="false"
                          theme="light"
                          class="ma-2"
                          @input="store"
                      />
                    </v-col>
                  </v-row>
                </v-container>

                <v-container v-if="item.type === 'single-line'" class="justify-center">
                  <v-row class="justify-center">
                    <v-col cols="8">
                      <v-text-field
                          v-model="submission_items[index].content"
                          class="ma-3"
                          :counter="item.max_length"
                          @input="store"
                      />
                    </v-col>
                  </v-row>
                </v-container>

                <v-container v-if="item.type === 'multi-line'" class="justify-center">
                  <v-row class="justify-center">
                    <v-col cols="10">

                      <v-textarea
                          v-model="submission_items[index].content"
                          class="ma-3"
                          :counter="item.max_length"
                          @input="store"
                      />
                    </v-col>
                  </v-row>
                </v-container>

                <div v-else-if="item.type === 'multiple-choice'">
                  <v-container variant="outlined">
                    <v-row class="ma-4 pa-2">
                      <v-col cols="auto" v-for="(choice, cindex) in item.options"
                             :key="cindex">
                        <v-checkbox
                            v-model="submission_items[index].options[cindex].selected"
                            :label="choice.text"
                            @input="store"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </div>

                <div v-else-if="item.type === 'file'">
                  <v-file-input
                      v-model="submission_items[index].content"
                      :rules="[
                            v => !!v || 'Bitte wählen Sie eine Datei aus',
                            v => v.size <= item.max_size || 'Die Datei ist zu groß'
                        ]"
                      :label="item.multiple ?  'Dateien auswählen...' : 'Datei auswählen...'"
                      prepend-inner-icon="mdi-file"
                      :accept="item.allowed_extensions"
                      outlined
                      class="ma-3"
                      :chips="true"
                      :multiple="true"
                      @input="store"/>
                </div>
              </v-container>

            </v-list-item>

            <v-divider
                v-if="index < items.length - 1"
                :key="index"
                :inset="item.inset"
            ></v-divider>
          </template>
        </v-list>
      </v-container>

      <p>
        <v-btn
            class="align-self-center"
            v-if="items.length > 0"
            variant="outlined"
            rounded="0"
            :disabled="submission_items.some(i => i.content === '')"
            @click="submit"
        >
          Abschicken
        </v-btn>
        Du kannst auch zu einem späteren Zeitpunkt deine Abgabe fertigstellen, sie wird in deinem Browser
        zwischengespeichert.
      </p>
      <!--|| i.options && !i.options.any(o => o.selected === true))" should be added to check if multiple choices have been filled -->

      <v-container>{{ submit_error }}</v-container>
    </form>
  </v-card>
</template>

<script>
import CodeEditor from 'simple-code-editor/CodeEditor.vue';
import {ref} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "NewSubmission",
  components: {
    CodeEditor,
  },
  props: {
    module: String,
    exercise_id: String
  },
  setup: (props) => {
    const router = useRouter();

    const generateSubmission = (items, target) => {
      items.forEach((item) => {
        switch (item.type) {
          case 'single-line':
            target.push({
              id: item.id,
              type: 'single-line',
              content: '',
            });
            break;
          case 'multi-line':
            target.push({
              id: item.id,
              type: 'multi-line',
              content: '',
            });
            break;
          case 'multiple-choice':
            console.assert(item.options instanceof Array);
            target.push({
              id: item.id,
              type: 'multiple-choice',
              options: item.options.map((o) => {
                return {
                  text: o.text,
                  selected: false,
                };
              }),
            });
            break;
          case 'file':
            target.push({
              id: item.id,
              type: 'file',
              content: [],
            });
            break;
          case 'code':
            target.push({
              id: item.id,
              type: 'code',
              content: '',
            });
            break;
          default:
            console.log('CRITICAL: Unknown item type: ' + item.type);
        }
      });
      return target;
    }

    const items = [
      {
        id: 1, // item id
        type: "code", // code, multiple-choice, single-line, multi-line, file
        title: "Sum of n numbers",
        body: "Write a program to find the sum of first n natural numbers", // describes the context of the item
        content: "", // code content
        language: "processing", // optional, only used for code items
      },
      {
        id: 2, // item id
        type: "multiple-choice", // code, multiple-choice, single-line, multi-line, file
        title: "Wähle die richtige Antwort", // describes the context of the item
        options: [
          {
            id: 1, // option id
            text: "A", // option content
          },
          {
            id: 2, // option id
            text: "B", // option content
          },
          {
            id: 3, // option id
            text: "C", // option content
          },
          {
            id: 4,
            text: "Ich bin ein längerer Text. Ich darf nicht bereits ausgewählt sein",
          },
        ],
      },
      {
        id: 3, // item id
        type: "single-line", // code, multiple-choice, single-line, multi-line, file
        title: "Gib eine Zahl ein", // describes the context of the item
        content: "", // code content
        correct: "42", // indicates the correct answer
        max_length: 32, // indicates the maximum length of the text
      },
      {
        id: 4, // item id
        type: "multi-line", // code, multiple-choice, single-line, multi-line, file
        title: "Gedichtsanalyse", // describes the context of the item
        body: "Analysiere das Gedicht.", // describes the context of the item
        content: "", // code content
        max_length: 256, // indicates the maximum length of the text
      },
      {
        id: 5, // item id
        type: "file", // code, multiple-choice, single-line, multi-line, file
        title: "Lade eine Datei hoch", // describes the context
        allowed_extensions: ["application/pdf", "image/png"], // specifies the allowed file extensions
        multiple: true, // allow multiple files
      }
    ]; // should be fetched from server

    const localStoragePath = `${props.module}.s.${props.exercise_id}`;

    let submission_items;

    if (props.exercise_id && localStorage.getItem(localStoragePath)) {
      submission_items = ref(JSON.parse(localStorage.getItem(localStoragePath) || '[]'));
      console.log('Submission loaded from localStorage');
    } else {
      submission_items = ref(generateSubmission(items, []))
      console.log('Submission generated');
    }

    const store = () => {
      localStorage.setItem(localStoragePath, JSON.stringify(submission_items.value));
    };

    const submit = () => {
      // validate
      // submit to server
      console.log(submission_items);
      let submission_id = 1234; // get from server
      // upon success, clear localStorage
      localStorage.removeItem(localStoragePath);
      // redirect to submission page
      router.push(`/${props.module}/s/${submission_id}`);
    };

    return {
      items,
      store,
      submit,
      submit_error: '',
      submission_items
    };
  },
  data: () => ({
    auto_review: 'partial', //full, partial, none
    checkbox: false,
    title: '',
  })
})
</script>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>

</style>