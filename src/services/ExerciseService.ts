
import API from "@/services/API";

import {User, Exercise} from "@/helpers/types";

// @ts-ignore

class ExerciseService{
    //TODO: Return / check response codes

 /*   loadTasks(user) {
        API.get(`tasks/user/${user.id}`)
            .then(function (response) {
            })
            .catch(function (error) {
            })
    }*/
    getExercisesForModule(moduleId : number) : Promise<any> {
        return API.get(`exercises/module/${moduleId}`);
    }

    getExercise(exerciseId : number) : Promise<any> {
        return API.get(`exercises/${exerciseId}`);
    }

    delExercise(exerciseId : number) : Promise<any>{
        return API.delete(`exercises/${exerciseId}`);
    }

    editExercise(exercise : Exercise) : Promise<any>{
        return API.put(`exercises/`, exercise);
    }

    addExercise(exercise : Exercise) : Promise<any> {
        return API.post(`exercises/`, exercise);
    }
}

export default new ExerciseService();