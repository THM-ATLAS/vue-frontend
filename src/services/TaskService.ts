import API from "@/services/API";

export default {

    loadTask(user) {
        return API.get(`tasks/user/${user.id}`)
    },

    getTask(id) {
        return API.get(`tasks/${id}`)
    },

    delTask(taskId, user) {
        return API.delete(`tasks/taskId=${taskId}&userId=${user.id}`)
    },

    editTask(task, user) {
        return API.put(`tasks/userId=${user.id}`,{
            //TODO: This probably won't work so easily
            task : `${task}`
        })
    },

    addTask(task, user) {
        return API.post(`tasks/userId=${user.id}`,{
            //TODO: This probably won't work so easily
            task : `${task}`
        })
    }
}