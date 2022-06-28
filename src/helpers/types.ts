export type User = {
    user_id : number,
    roles : Role[],
    name : string,
    username : string,
    email : string,
}

export type Role = {
    role_id : number,
    name : string
}
export type Tag = {
    tag_id: number,
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

export type Evaluation = {
    submission_id : number,
    grade : number | null,
    teacher_id : number | null,
    comment : string | null
}

export type UserSettings = {
    user_id: number,
    language: string,
    theme: string
}

export type Rating = {
    rating_id: number,
    user_id: number,
    exercise_id: number,
    value: number
}

export type Module = {
    module_id : number,
    name : string,
    description: string
}

export type ModuleUser = {
    user_id: number,
    module_role: Role,
    name: string,
    username: string,
    email: string
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
    type_id: number,
    title : string,
    content : string,
    description: string,
    exercisePublic : boolean,
}

export type Asset = {
    asset_id : number,
    asset: string,
    public: boolean,
    filename: string,
}


export type Notification = {
    notification_id : number,
    notification_type: string,
    title : string,
    content : string,
    description: string,
    notification_read : boolean
}