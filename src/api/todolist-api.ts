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
export type TasksType = {
    description: string
    title: string
    // completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TasksType[]
}


export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string | null
    deadline?: string | null
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
        return instance.post<ResponseType<{ item: TodolistType }>>(
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
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },

    createTasks(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TasksType }>>(
            `/todo-lists/${todolistId}/tasks`,
            {title})
    },
    //
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTasks(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TasksType }>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`,
            model)
    }


}