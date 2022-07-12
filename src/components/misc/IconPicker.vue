<template>
<v-card>
  <v-card-title>{{$t("icon_picker.title")}}</v-card-title>
  <v-combobox
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
        />
      </v-slide-x-reverse-transition>
    </template>
  </v-combobox>
  <v-row>
    <v-col cols="9">{{$t("icon_picker.preview")}} <v-icon>{{icon}}</v-icon></v-col>
    <v-col cols="3" align="end">
      <v-btn
          style="margin-left: auto;"
          @click="saveIcon(icon)">{{$t("buttons.save")}}</v-btn>
    </v-col>
  </v-row>
      <!-- <v-card style="background: whitesmoke">
        <v-row>
          <v-col cols="5" align="center">
            <v-text-field
            v-model="t"
            @input="test()"></v-text-field>
          </v-col>
          <v-col cols="5" align="center">
            
              <v-chip v-for="icon in filteredIcons.value" :key="icon">
                <v-icon :icon="icon"/>
              </v-chip>

          </v-col>
          <v-col cols="2" align="center">
            <v-btn>Save</v-btn>
          </v-col>
        </v-row>
      </v-card> -->
</v-card>
</template>

<script setup lang="ts">
import {defineProps, onBeforeMount, ref} from "vue";
import {Icon, Module, Tag} from "@/helpers/types";
import ModuleService from "@/services/ModuleService";
import {useRoute, useRouter} from "vue-router";
import IconService from "@/services/IconService";
import {AxiosResponse} from "axios";
import TagService from "@/services/TagService";
    //import mdi_icons from "@/helpers/mdi-icons.json"

const router = useRouter();
const iconNames =
    ["mdi-animation", "mdi-android","mdi-apple","mdi-apple-ios",
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


    // const allIcons = ref([]) as Ref<[]>;
    // const filteredIcons: Ref<String[]> = ref([]) as Ref<String[]>;

    // function test(): void {
    //   filteredIcons.value = allIcons.value.map(icon => 'mdi-'+icon.name.toString()).filter(name => name.includes(t.value)).slice(0, 5);
    //   console.log(filteredIcons.value)
    // }

    // function jsonToArray(): void {
    //   for(var icon in mdi_icons) {
    //     allIcons.value.push(mdi_icons[icon]);
    //   }
    //   filteredIcons.value = allIcons.value.map(icon => 'mdi-'+icon.name.toString()).slice(0, 5)
    //   console.log(filteredIcons.value);
    // }

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

//couldn't get props to work here, workaround using current route to get module
let module:Module | undefined  = undefined;
let tag:Tag | undefined = undefined;
function contextBasedSave(icon: Icon){
  if(module && !tag){
    ModuleService.editModule({module_id : module.module_id,
      name : module.name,
      description: module.description,
      modulePublic: module.modulePublic,
      icon: icon})
        .then(() => {
          router.push(router.currentRoute.value) //reload page after making the change
    });
  } else
    if(tag){
      TagService.editTag({tag_id: tag.tag_id,
        name: tag.name,
        icon: icon})
          .then(() => {
            router.push(router.currentRoute.value)
      })
    }
}

const route = useRoute();
onBeforeMount(async ()=>{
      //jsonToArray();
  if(route.params.module){
    ModuleService.getModule(
        route.params.module instanceof Array
            ? route.params.module[0]
            : route.params.module)
        .then((res) => {
          module = res.data;
          icon.value = res.data.icon.reference;
        });
  }
  if(props.tag){
    tag = props.tag
    icon.value = tag.icon.reference
  }
});
</script>

<style scoped lang="scss">

</style>