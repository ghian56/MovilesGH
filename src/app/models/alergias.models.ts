export interface Tareas{
    id:string,
    title:string,
    descripcion:string,
    items: Item[]
}
export interface Item{
    name: string,
    completed: boolean
}