import API from "@/services/API";
import {User, Task} from "@/helpers/types"

export default {
    //TODO: Return / check response codes

    loadTasks(user:User) : Task[]{
        return API.get(`tasks/user/${user.id}`)
    },

    getTask(id:number) : Task{
        return API.get(`tasks/${id}`)
    },

    delTask(taskId:number, user:User) : number{
        return API.delete(`tasks/${taskId}`)
    },

    editTask(task:Task, user:User) : number{
        return API.put(`tasks/${user.id}`,{
                task : {
                    id : task.id,
                    title : task.title,
                    content : task.content,
                    taskPublic : task.taskPublic
                }
            }
        )
    },

    addTask(task:Task, user:User) : number{
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