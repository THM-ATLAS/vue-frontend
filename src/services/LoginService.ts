import API from "@/services/API";

export default {
    login(username:string, password:string) {
        return API.post(`authenticate`,{
            username: `${username}`,
            password: `${password}`
        })
    }
}