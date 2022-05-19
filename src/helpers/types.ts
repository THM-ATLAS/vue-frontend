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

export type Exercise = {
    exercise_id : number,
    module: Module,
    title : string,
    content : string,
    description: string,
    exercisePublic : boolean
}

export type Module = {
    module_id : number,
    name : string,
    description: string,
}
