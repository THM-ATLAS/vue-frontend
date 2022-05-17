
import API from "@/services/API";

import {User, Task} from "@/helpers/types";

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


    getExercise(id : number) : Promise<any> {
        return API.get(`exercises/${id}`);
    }

    delExercise(taskId : number) : Promise<any>{
        return API.delete(`exercises/${taskId}`);
    }

    editExercise(task : Task, user : User) : Promise<any>{
        return API.put(`exercises/${user.id}`,{
                task : {
                    exercise_id : task.id,
                    title : task.title,
                    content : task.content,
                    taskPublic : task.taskPublic
                }
            }
        );
    }

    addTask(task : Task, user : User) : Promise<any> {
        return API.post(`exercises/${user.id}`,{
                task : {
                    id : task.id,
                    title : task.title,
                    content : task.content,
                    taskPublic : task.taskPublic
                }
            }
        );
    }
}

export default new ExerciseService();