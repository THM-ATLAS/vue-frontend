export type User = {
    user_id : number,
    roles : UserRole[],
    name : string,
    username : string,
    email : string,
}

export type UserRole = {
    role_id : number,
    name : string
}

export type Task = {
    id : number,
    title : string,
    content : string,
    taskPublic : boolean
}

export type Module = {
    id : number,
    name : string
}