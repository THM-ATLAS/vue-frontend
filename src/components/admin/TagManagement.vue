<template>
  <div>
    <v-text-field
        class="mb-4 mt-1"
        :label="$t('admin.tags.search_tag')"
        v-model="search"
        prepend-icon="mdi-magnify"
        single-line
        hide-details
        @input="applySearch"/>
    <v-card elevation="0" rounded="0" role="main">
      <!-- main table -->
      <v-table
          :fixed-header="true"
          density="compact">
        <thead>
        <tr>
          <th>{{ $t("admin.tags.title") }}</th>
          <th>{{ $t("admin.tags.actions") }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="tag in currentPage" v-bind:key="tag.tag_id">
          <!-- Name -->
          <td>
            <v-icon size="22px"
                    class="mr-2"
                    :icon="tag.icon.reference"/>
            {{ tag.name }}
          </td>
          <!-- Buttons -->
          <td>
            <v-tooltip right>
              <template v-slot:activator="{ props: tooltip }">
                <v-btn
                    @click="editTagDialog.target = tag; editTagDialog.show = true"
                    icon="mdi-file-document-edit"
                    small
                    elevation="0"
                    color="primary"
                    class="ma-1"
                    rounded="0"
                    variant="outlined"
                    v-bind="tooltip"
                />
              </template>
              <span v-html="$t('buttons.edit')"/>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ props: tooltip }">
                <v-btn
                    @click="deleteTagDialog.target = tag; deleteTagDialog.show = true"
                    icon="mdi-file-remove"
                    small
                    elevation="0"
                    color="error"
                    class="ma-1"
                    rounded="0"
                    variant="outlined"
                    v-bind="tooltip"
                />
              </template>
              <span v-html="$t('buttons.delete')"/>
            </v-tooltip>
          </td>
        </tr>

        </tbody>
      </v-table>

      <!-- new tag button -->
      <div>
        <v-btn
            @click="createTagDialog.show = true"
            icon="mdi-file-plus"
            small
            elevation="0"
            color="primary"
            class="mr-2"
            rounded="0"
            variant="outlined"
        />
      </div>

    </v-card>
    <!-- edit tag dialog -->
    <v-dialog
        v-model="editTagDialog.show"
        :scrollable="true"
        :retain-focus="false"
    >
      <v-card top="20%" width="80vw">
        <v-card-title>
          <span class="headline">{{ $t("admin.tags.edit_tag") }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editTagDialog.target.name"></v-text-field>
        </v-card-text>
        <IconPicker :tag="editTagDialog.target"></IconPicker>
        <v-card-actions>
          <v-btn @click="editTagDialog.show = false" v-html="$t('buttons.cancel')"/>
          <v-btn color="primary" @click="editTag(editTagDialog.target); editTagDialog.show = false"
                 v-html="$t('buttons.save')"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- edit tag dialog end -->
    <!-- delete tag dialog -->
    <v-dialog
        v-model="deleteTagDialog.show"
        :scrollable="true"
        :retain-focus="false"
    >
      <v-card top="20%" width="80vw">
        <v-card-title>
          <span class="headline">{{ $t("admin.tags.delete_tag") }}</span>
        </v-card-title>
        <v-card-text>
          <p>{{ $t('admin.tags.delete_confirm', [deleteTagDialog.target.name]) }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="deleteTagDialog.show = false" v-html="$t('buttons.cancel')"/>
          <v-btn color="error" @click="deleteTag(deleteTagDialog.target); deleteTagDialog.show = false"
                 v-html="$t('buttons.delete')"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- create tag dialog -->
    <v-dialog
        v-model="createTagDialog.show"
        :scrollable="true"
        :retain-focus="false"
    >
      <v-card top="20%" width="80vw">
        <v-card-title>
          <span class="headline">{{ $t("admin.tags.create_tag") }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="createTagDialog.target.name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="createTagDialog.show = false" v-html="$t('buttons.cancel')"/>
          <v-btn color="primary" @click="createTag(createTagDialog.target); createTagDialog.show = false"
                 v-html="$t('buttons.save')"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- create tag dialog end -->
    <v-row>
      <v-col cols="4" sm="3">
        <v-select
            :items="numbers"
            :label="$t('admin.tags.tags_per_page')"
            v-model="itemsPerPage">
        </v-select>
      </v-col>
      <v-col cols="12" sm="9">
        <v-pagination
            v-model="currentPageNumber"
            :length="length"
            total-visible="5"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, Ref, ref, watch} from "vue";
import {Tag} from "@/helpers/types";
import TagService from "@/services/TagService";
import IconPicker from "@/components/misc/IconPicker.vue";

const currentPage: Ref<Tag[]> = ref([]);
const currentPageNumber = ref(1);
const numbers = [1, 3, 5, 10, 20, 50];
const itemsPerPage = ref(10);
const length = ref(3);
const search = ref("");
const allTags: Ref<Tag[]> = ref([])
const filteredTags: Ref<Tag[]> = ref([])

const editTagDialog: Ref<{ show: boolean, target: Tag | null }> = ref({
  show: false,
  target: null,
});
const createTagDialog: Ref<{ show: boolean, target: Tag | null }> = ref({
  show: false,
  target: getTagTemplate(),
});

function applySearch(): void {
  filteredTags.value = allTags.value.filter((tag) => {
    return tag.name.toLowerCase().includes(search.value.toLowerCase())
  })
  currentPage.value = filteredTags.value.slice((currentPageNumber.value - 1) * itemsPerPage.value, currentPageNumber.value * itemsPerPage.value)
  length.value = Math.ceil(filteredTags.value.length / itemsPerPage.value)
}

onBeforeMount(async () => refreshTags());

function refreshTags(): void {
  getAllTags().then(() => {
    applySearch()
  })
}

watch(currentPageNumber, () => applySearch())

watch(itemsPerPage, () => applySearch())


function getAllTags(): Promise<void> {
  return TagService.getAllTags().then(res => filteredTags.value = allTags.value = res.data.sort((tag1: Tag, tag2: Tag) => tag1.name.localeCompare(tag2.name)));
}

function createTag(givenTag: Tag): void {
  // we don't check if the tag already exists, as we naively assume competence of the admin
  TagService.addTag(givenTag).then(() => refreshTags());
}

function editTag(tag: Tag): void {
  TagService.editTag(tag).then(() => refreshTags());
}

function deleteTag(givenTag: Tag): void {
  allTags.value = allTags.value.filter((tag) => tag !== givenTag); // visual deletion
  filteredTags.value = filteredTags.value.filter((tag) => tag !== givenTag); // wow, so fast!

  TagService.delTag(givenTag).then(() => refreshTags()); // server deletion, reload tags in case of error
}

const deleteTagDialog: Ref<{ show: boolean, target: Tag | null }> = ref({
  show: false,
  target: null,
});

function getTagTemplate(): Tag {
  return {
    tag_id: 0,
    name: "",
    icon: {
      icon_id: 5,
      reference: "mdi-laptop"
    }
  };
}
</script>

<style scoped>
.desc {
  margin-top: 1em;
  margin-bottom: 1em;
}

.dialogWidth {
  width: 50vw;
}

@media (max-width: 1280px) {
  .dialogWidth {
    width: 80vw;
  }
}
</style>