
import API from "@/services/API";
//import {User, Task} from "@/helpers/types"

// @ts-ignore

export default {
    //TODO: Return / check response codes

 /*   loadTasks(user) {
        API.get(`tasks/user/${user.id}`)
            .then(function (response) {

            })
            .catch(function (error) {

            })
    },*/

    getTask(id)  {
        return API.get(`tasks/${id}`)
    },

    delTask(taskId) {
        return API.delete(`tasks/${taskId}`)
    },

    editTask(task, user) {
        return API.put(`tasks/${user.id}`,{
                task : {
                    exercise_id : task.id,
                    title : task.title,
                    content : task.content,
                    taskPublic : task.taskPublic
                }
            }
        )
    },

    addTask(task, user) {
        return API.post(`tasks/${user.id}`,{
                task : {
                    id : task.id,
                    title : task.title,
                    content : task.content,
                    taskPublic : task.taskPublic
                }
            }
        )
    }
}