import axios from "axios";

type TodolistType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number

}

type ResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: []
    messages: string[],
    data: T

}





const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})
export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>('/todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(
            '/todo-lists',
            {title})
    },

    deleteTodolist(todoId: string) {
        return instance.delete<ResponseType>(
            `/todo-lists/${todoId}`)
    },

    updateTodolist(idTodo: string, title: string) {
        return instance.put<ResponseType>(
            `/todo-lists/${idTodo}`,
            {title})
    }

}