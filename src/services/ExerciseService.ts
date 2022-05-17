
import API from "@/services/API";

import {User, Exercise} from "@/helpers/types";

// @ts-ignore

class ExerciseService{
    //TODO: Return / check response codes

 /*   loadExercises(user) {
        API.get(`exercises/user/${user.id}`)
            .then(function (response) {
            })
            .catch(function (error) {
            })
    }*/


    getExercise(id : number) : Promise<any> {
        return API.get(`exercises/${id}`);
    }

    delExercise(exerciseId : number) : Promise<any>{
        return API.delete(`exercises/${exerciseId}`);
    }

    editExercise(exercise : Exercise, user : User) : Promise<any>{
        return API.put(`exercises/${user.id}`,{
                exercise : {
                    exercise_id : exercise.id,
                    title : exercise.title,
                    content : exercise.content,
                    exercisePublic : exercise.exercisePublic
                }
            }
        );
    }

    addExercise(exercise : Exercise, user : User) : Promise<any> {
        return API.post(`exercises/${user.id}`,{
                exercise : {
                    id : exercise.id,
                    title : exercise.title,
                    content : exercise.content,
                    exercisePublic : exercise.exercisePublic
                }
            }
        );
    }
}

export default new ExerciseService();