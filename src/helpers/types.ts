export type User = {
    id : number,
    firstName : string,
    lastName : string,
    email : string,
    password : string,
    settings : any,
    roles : string[]
}

export type Exercise = {
    id : number,
    title : string,
    content : string,
    exercisePublic : boolean
}

export type Module = {
    id : number,
    name : string
}