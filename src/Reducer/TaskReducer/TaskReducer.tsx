import {TaskStateType} from "../../AppWithRedux";

import {
    AddTodoListActionType,
    RemoveTodoListActionType,
    SetTodosActionCreator
} from "../TodolistReducer/TodolistReducer";


import {TaskType} from "../../Components/TodoList";
import {Dispatch} from "redux";
import {TaskStatuses, TasksType, todolistAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {AppRootStateType} from "../../Store/store";


export type RemoveActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string


}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    task: TasksType

}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todolistId: string

}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string

}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: TaskType[]
    todolistId: string
}


export type ActionType = RemoveActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodoListActionType | RemoveTodoListActionType | SetTodosActionCreator | SetTasksActionType

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, isDone: action.status} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoListId]: []
            }

        case "REMOVE-TODOLIST":
            const copyState = {...state}
            delete copyState[action.id]
            return {
                ...copyState
            }
        case 'SET-TODOS':
            const copySt = {...state}
            action.todos.forEach((tl) => {
                copySt[tl.id] = []
            })
            return copySt

        case 'SET-TASKS':
            return {
                ...state,
                [action.todolistId]: action.tasks
            }


        default:
            return state
    }
}

export const removeTaskActionCreator = (taskId: string, todolistId: string): RemoveActionType => ({
    type: 'REMOVE-TASK',
    taskId,
    todolistId
})
export const addTaskActionCreator = (task: TasksType, todolistId: string): AddTaskActionType => ({
    type: 'ADD-TASK',
    task,
    todolistId,

})
export const changeTaskStatusActionCreator = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => ({
    type: "CHANGE-TASK-STATUS",
    taskId,
    status,
    todolistId
})
export const changeTaskTitleActionCreator = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => ({
    type: "CHANGE-TASK-TITLE",
    taskId,
    title,
    todolistId
})

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', tasks, todolistId})


export const getTasksThunk = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items.map(task => ({
                id: task.id,
                title: task.title,
                completed: task.completed
            }))))
        })
}

export const deleteTasksThunk = (todolistId: string, tasksId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTasks(todolistId, tasksId)
        .then(res => {
            dispatch(removeTaskActionCreator(tasksId, todolistId))
        })
}

export const addTasksThunk = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTasks(todolistId, title)
        .then(res => {
            dispatch(addTaskActionCreator(res.data.data.item, todolistId))
        })
}


export const updateTasksTitleThunk = (todolistId: string, taskId: string, model: UpdateTaskModelType) => (dispatch: Dispatch) => {
    todolistAPI.updateTasks(todolistId, taskId, model)
        .then(res => {
            dispatch(changeTaskTitleActionCreator(taskId, res.data.data.item.title, todolistId))
        })
}

export const updateTasksStatusThunk = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        const model: UpdateTaskModelType = {
            title: task!.title,
            deadline: task!.deadline,
            startDate:task!.startDate,
            priority: task!.priority,
            description: task!.description,
            status
        }
        todolistAPI.updateTasks(todolistId, taskId, model)
            .then(res => {
                dispatch(changeTaskStatusActionCreator(taskId, status, todolistId))
            })
    }
