<template>
<v-card>
  <v-card-title>Icon Picker</v-card-title>
  <v-autocomplete
      v-model="icon"
      :items="iconNames"
      persistent-hint
      prepend-icon="mdi-magnify"
  >
    <template v-slot:append-outer>
      <v-slide-x-reverse-transition
          mode="out-in"
      >
        <v-icon
            :key="`icon-${isEditing}`"
            :color="isEditing ? 'success' : 'info'"
            @click="isEditing = !isEditing"
            v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
        ></v-icon>
      </v-slide-x-reverse-transition>
    </template>
  </v-autocomplete>
  <v-row>
    <v-col cols="9">Preview: <v-icon>{{icon}}</v-icon></v-col>
    <v-col cols="3">
      <v-btn
          style="margin-left: auto;"
          @click="saveIcon(icon)">Save</v-btn>
    </v-col>
  </v-row>
</v-card>
</template>

<script setup lang="ts">
import {defineProps, onBeforeMount, onMounted, Ref, ref} from "vue";
import {Icon, Module, Tag} from "@/helpers/types";
import ModuleService from "@/services/ModuleService";
import {useRoute, useRouter} from "vue-router";
import IconService from "@/services/IconService";
import {AxiosError, AxiosResponse} from "axios";
import TagService from "@/services/TagService";

const router = useRouter();
const iconNames =
    ["mdi-android","mdi-apple","mdi-apple-ios",
      "mdi-angular", "mdi-angularjs", "mdi-ansible", "mdi-application", "mdi-application-braces", "mdi-application-array",
      "mdi-antenna", "mdi-artstation", "mdi-atom", "mdi-bacteria", "mdi-beaker", "mdi-blender-software",
      "mdi-book", "mdi-bootstrap", "mdi-briefcase", "mdi-calculator", "mdi-calendar",
      "mdi-camera", "mdi-cellphone", "mdi-chart-line", "mdi-cloud", "mdi-compass"];
const icon = ref("mdi-magnify");
const isEditing = ref(false);

//using props to change save functionality according to context
const props = defineProps<{
  module?: Module;
  tag?: Tag;
}>();


//returns 0 if it doesn't exist, returns corresponding number if it exists, linear search
function verifyIconExists(iconName: string){
  return new Promise<number>((resolve, reject) => {
    IconService.getIcons().then((res: AxiosResponse) => {
      let foundIcon: boolean = false;
      res.data.forEach((icon: Icon) => {
        if(iconName === icon.reference){
          foundIcon = true;
          resolve(icon.icon_id); //promise resolve doesn't stop execution
          return;
        }
      });
      if(!foundIcon){
        reject(0);
      }
    });
  });
}

function saveIcon(iconName: string){
  verifyIconExists(iconName).then((icon_id: number) => {
    contextBasedSave({icon_id: icon_id, reference: iconName});
  })
      .catch(() => {
        IconService.addIcon({icon_id: 0, reference: iconName}).then((res: AxiosResponse) => {
          contextBasedSave(res.data);
        })
      })
}

function contextBasedSave(icon: Icon){
  if(props.module){
    ModuleService.editModule({module_id : props.module.module_id,
      name : props.module.name,
      description: props.module.description,
      modulePublic: props.module.modulePublic,
      icon: icon})
        .then((res: AxiosResponse) => {
          router.push(router.currentRoute.value) //reload page after making the change
    });
  } else
    if(props.tag){
      TagService.editTag({tag_id: props.tag.tag_id,
        name: props.tag.name,
        icon: icon})
          .then((res: AxiosResponse) => {
            router.push(router.currentRoute.value)
      })
    }
}


onBeforeMount(()=>{
  console.log(props.module)
  if(props.module){
    icon.value = props.module.icon.reference
  } else
    if(props.tag){
      icon.value = props.tag.icon.reference
    }
});
</script>

<style scoped lang="scss">

</style>