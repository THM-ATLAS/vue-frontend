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

export type Submission = {
    submission_id : number,
    exercise_id: number,
    user_id : number,
    file: string,
    upload_time: string,
    grade: number | null,
    teacher_id: number | null,
    comment: string | null
}