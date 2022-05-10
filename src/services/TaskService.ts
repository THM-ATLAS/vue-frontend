import API from "@/services/API";

export default {

    loadTask(user:User) {
        return API.get(`tasks/user/${user.id}`)
    },

    getTask(id:number) {
        return API.get(`tasks/${id}`)
    },

    delTask(taskId:number, user:User) {
        return API.delete(`tasks/taskId=${taskId}&userId=${user.id}`)
    },

    editTask(task:Task, user:User) {
        return API.put(`tasks/userId=${user.id}`,{
            //TODO: This probably won't work so easily
            task : `${task}`
        })
    },

    addTask(task:Task, user:User) {
        return API.post(`tasks/userId=${user.id}`,{
            //TODO: This probably won't work so easily
            task : `${task}`
        })
    }
}