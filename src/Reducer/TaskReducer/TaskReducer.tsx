import {TaskStateType} from "../../AppWithRedux";
import {v1} from "uuid";
import {
    AddTodoListActionType,
    RemoveTodoListActionType,
    SetTodosActionCreator
} from "../TodolistReducer/TodolistReducer";
import {Simulate} from "react-dom/test-utils";
import copy = Simulate.copy;
import { TaskType } from "../../Components/TodoList";
import {Dispatch} from "redux";
import {todolistAPI} from "../../api/todolist-api";


export type RemoveActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string


}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string

}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
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
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], newTask]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
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
export const addTaskActionCreator = (title: string, todolistId: string): AddTaskActionType => ({
    type: 'ADD-TASK',
    title,
    todolistId
})
export const changeTaskStatusActionCreator = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => ({
    type: "CHANGE-TASK-STATUS",
    taskId,
    isDone,
    todolistId
})
export const changeTaskTitleActionCreator = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => ({
    type: "CHANGE-TASK-TITLE",
    taskId,
    title,
    todolistId
})

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', tasks, todolistId})
export const fetchTasksThunk = (todolistId: string)= (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)///сделать таски
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}

export const deleteTasksThunk = (todolistId: string, tasksId: string) = (dispatch: Dispatch) => {
    todolistAPI.deleteTasks(todolistId, tasksId)///сделать таски
        .then(res => {
            dispatch(setTasksAC(taskId, todolistId))
        })
}
