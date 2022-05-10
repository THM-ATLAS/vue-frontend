import API from "@/services/API";
import {User, Task} from "@/helpers/types.ts"

export default {

    loadTasks(user:User) : Task{
        return API.get(`tasks/user/${user.id}`)
    },

    getTask(id:number) : Task{
        return API.get(`tasks/${id}`)
    },

    delTask(taskId:number, user:User) : number{
        return API.delete(`tasks/taskId=${taskId}&userId=${user.id}`)
    },

    editTask(task:Task, user:User) : number{
        return API.put(`tasks/userId=${user.id}`,{
            //TODO: This probably won't work so easily
            task : `${task}`
        })
    },

    addTask(task:Task, user:User) : number{
        API.post(`tasks/userId=${user.id}`,{
            //TODO: This probably won't work so easily
            task : `${task}`
        }).finally(return response.statusCode)
    }
}