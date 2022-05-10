export type User = {
    id : number,
    firstName : string,
    lastName : string,
    email : string,
    password : string
    role : string
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