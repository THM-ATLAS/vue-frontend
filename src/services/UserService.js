import API from "@/services/API";

export default {

    //TODO: Return / check response codes
    getUser(id) {
        return API.get(`users/${id}`)
    },

    delUser(user) {
        return API.delete(`users/${user.id}`)
    },

    editUser(user) {
        return API.put(`users/`, {
                user: {
                    user_id: user.user_id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    roles: user.roles
                }
            }
        )
    },

    addUser(user) {
        return API.post(`users/`, {
                user: {
                    user_id: user.user_id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    roles: user.roles,
                    settings: user.settings
                }
            }
        )
    }
}
