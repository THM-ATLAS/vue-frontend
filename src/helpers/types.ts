export type User = {
    user_id : string,
    roles : UserRole[],
    name : string,
    username : string,
    email : string,
}

export type UserRole = {
    role_id : number,
    name : string
}

export type TokenRet = {
    token : string
}

export type Exercise = {
    exercise_id : number,
    module: Module,
    title : string,
    content : string,
    description: string,
    exercisePublic : boolean
}

export type PostExercise = {
    exercise_id : number,
    module_id: number,
    title : string,
    content : string,
    description: string,
    exercisePublic : boolean
}

export type Module = {
    module_id : number,
    name : string,
    description: string
}