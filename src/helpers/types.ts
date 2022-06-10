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

export type Settings = {
    user_id: number,
    language: string,
    theme: string
}

export type Notification = {
    notification_id : number,
    notification_type: string,
    title : string,
    content : string,
    description: string,
    notification_read : boolean
}