import axios from "axios";

type TodolistType = {

            id: string,
            title: string,
            addedDate: Date,
            order: number

}

type CreateTodolistType = {
    resultCode: 0
    messages: [],
        data: {
    item:   {
        "id": "a2dfe62b-ebce-4b37-9581-1cc77ebc999f",
            "title": "important",
            "addedDate": "2019-07-30T12:23:49.677",
            "order": 0
    }
}
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})
export const todolistAPI = {
    getTodolist(){
        return instance.get<TodolistType>('/todo-lists')
    },

    createTodolist(title: string){
        return instance.post(
            '/todo-lists',
            {title})
    },

    deleteTodolist(todoId: string) {
        return instance.delete(
            `/todo-lists/${todoId}`)
    },

    updateTodolist(idTodo: string, title: string){
        return instance.put(
            `/todo-lists/${idTodo}`,
            {title})
    }

}