import API from "@/services/API";

export default {
    //TODO: Return / check response codes

    login(username:string, password:string) {
        return API.post(`authenticate`,{
            username: `${username}`,
            password: `${password}`
        })
    }
}