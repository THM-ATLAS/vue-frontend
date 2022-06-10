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
    type: string
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