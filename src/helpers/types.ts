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
    exercisePublic : boolean,
    avgRating: number,
    type: string,
    tags: Tag[]
}

export type PostExercise = {
    exercise_id : number,
    module_id: number,
    title : string,
    content : string,
    description: string,
    exercisePublic : boolean,
    avgRating: number,
    type: string,
    tags: Tag[]
}

export type Tag = {
    tag_id: number,
    name: string
}

export type Module = {
    module_id : number,
    name : string,
    description: string
}

export type ModuleUser = {
    user_id: number,
    module_role: ModuleRole[],
    name: string,
    username: string,
    email: string
}

export type ModuleRole = {
    role_id: number,
    name: string
}