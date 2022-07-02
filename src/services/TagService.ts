import API from "@/services/API";
import {Exercise, Tag, Module} from "@/helpers/types"

class TagService {

    //TODO: Return / check response codes
    getAllTags(): Promise<any> {
        return API.get(`tags/`);
    }

    editTag(tag: Tag): Promise<any> {
        return API.put(`tags/`, tag);
    }

    addTag(tag: Tag): Promise<any> {
        return API.post(`tags`, tag);
    }

    delTag(tag: Tag): Promise<any> {
        return API.delete(`tags/${tag.tag_id}`);
    }

    getTagsFromExercise(exercise: Exercise): Promise<any> {
        return API.get(`exercises/${exercise.exercise_id}/tags/`);
    }

    addTagToExercise(tag: Tag, exercise: Exercise): Promise<any> {
        return API.post(`exercises/${exercise.exercise_id}/${tag.tag_id}`);
    }

    delTagFromExercise(tag: Tag, exercise: Exercise): Promise<any> {
        return API.delete(`exercises/${exercise.exercise_id}/${tag.tag_id}`);
    }

    getModuleTags(module: Module) {
        API.get(`modules/${module.module_id}/tags`);
    }

    addTagToModule(module: Module, tag: Tag) {
        API.post(`modules/tags/${module.module_id}/${tag.tag_id}`);
    }

    delTagFromModule(module: Module, tag: Tag) {
        API.delete(`modules/tags/${module.module_id}/${tag.tag_id}`);
    }

}

export default new TagService();