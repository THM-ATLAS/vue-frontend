export type User = {
    user_id : number,
    firstName : string,
    lastName : string,
    email : string,
    password : string,
    settings : any,
    roles : string[]
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