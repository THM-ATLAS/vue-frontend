export type User = {
    user_id : number,
    roles : Role[],
    name : string,
    username : string,
    email : string,
    password: string | null,
}

export type Role = {
    role_id : number,
    name : string
}
export type Tag = {
    tag_id: number,
    name: string,
    icon: Icon
}

export type Submission = {
    submission_id : number,
    exercise_id: number,
    user_id : number,
    file: string,
    upload_time: string,
    grade: number | null,
    teacher_id: number | null,
    comment: string | null,
    type: number,
    content: {
        "type": string,
        "submission_id": number,
        "content": string,
        "language": number
    }
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
    description: string,
    modulePublic: boolean,
    icon: Icon,
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
    mc: MultipleChoice
}

export type MultipleChoice = {
    "question_id": number,
    "content": string,
    "exercise_id": number,
    "answers": Answer[]
}

export type Answer = {
    "answer_id": 0,
    "content": "string",
    "correct": true,
    "question_id": 0,
    "marked": true
}

export type Asset = {
    asset_id : number,
    asset: string,
    public: boolean,
    filename: string,
}

export type Icon = {
    icon_id: number,
    reference: string,
}

export type Notification = {
    "notification_id": number,
    "title": string,
    "content": string,
    "time": string,
    "type_id": number,
    "module_id": number,
    "exercise_id": number,
    "submission_id": number,
    "read": boolean
}