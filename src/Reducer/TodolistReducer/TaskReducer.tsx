

import {TaskStateType} from "../../App";
import {v1} from "uuid";
import {AddTodoListActionCreator} from "./TodolistReducer";




export type RemoveActionType =  ReturnType<typeof removeTaskActionCreator>
export type AddTaskActionType = ReturnType<typeof addTaskActionCreator>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusActionCreator>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleActionCreator>


export type ActionType = RemoveActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType


export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListId] : state[action.todoListId]
                    .filter(t => t.id !== action.taskId)
            }

        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.title, isDone: action.isDone}
            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]


            }

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, isDone: action.isDone}: t)


            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title}: t)


            }

        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoListId]: []

            }

        default:
            return new Error("avghj")
    }
}

export  const removeTaskActionCreator = (taskId: string,
                                         todoListId: string) => ({type: "REMOVE-TASK", taskId, todoListId})
export  const addTaskActionCreator = (title: string,
                                      todoListId: string ) => ({type: "ADD-TASK", title, todoListId})
export  const changeTaskStatusActionCreator = (taskId: string,
                                               isDone: boolean,
                                               todoListId: string)  => ({type: "CHANGE-TASK-STATUS", taskId, isDone, todoListId})

export  const changeTaskTitleActionCreator = (taskId: string,
                                               title: string,
                                               todoListId: string)  => ({type: "CHANGE-TASK-TITLE", taskId, title, todoListId})


