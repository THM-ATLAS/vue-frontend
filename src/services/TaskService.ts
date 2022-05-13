
import API from "@/services/API";

import {User, Task} from "@/helpers/types";

// @ts-ignore

class TaskService{
    //TODO: Return / check response codes

 /*   loadTasks(user) {
        API.get(`tasks/user/${user.id}`)
            .then(function (response) {
            })
            .catch(function (error) {
            })
    }*/


    getTask(id : number) : Promise<any> {
        return API.get(`tasks/${id}`);
    }

    delTask(taskId : number) : Promise<any>{
        return API.delete(`tasks/${taskId}`);
    }

    editTask(task : Task, user : User) : Promise<any>{
        return API.put(`tasks/${user.user_id}`,{
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
        return API.post(`tasks/${user.user_id}`,{
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

export default new TaskService();