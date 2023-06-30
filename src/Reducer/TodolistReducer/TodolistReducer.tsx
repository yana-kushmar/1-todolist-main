
import {TodoListType} from "../../AppWithRedux";
import {v1} from "uuid";

import { Dispatch } from "redux";
import {todolistAPI} from "../../api/todolist-api";



export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    todoListId: string

}
export type ChangeTodoListActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string

}
export type ChangeFilterTodoListActionType = {
    type:"CHANGE-TODOLIST-FILTER"

    id: string
    filter: FilterValuesType

}

export type SetTodosActionCreator = {
    type: 'SET-TODOS',
    todos: TodoListType[]

}


export type FilterValuesType = "all" | "active" | "completed"

export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListActionType
    | ChangeFilterTodoListActionType
    | SetTodosActionCreator

const initialState: Array<TodoListType> = []


export const todolistReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: "all",
            }
            return [...state, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return state.map((tl => tl.id === action.id ? {...tl, title: action.title} : tl))
        case "CHANGE-TODOLIST-FILTER":
            return state.map((tl => tl.id === action.id ? {...tl, filter: action.filter} : tl ))
        case 'SET-TODOS':
            return action.todos.map((tl) => ({...tl, filter: "all"}))

        default:
            return state
    }
}

export  const removeTodoListActionCreator = (id: string): RemoveTodoListActionType => ( {type: "REMOVE-TODOLIST", id})
export  const addTodoListActionCreator = (title: string): AddTodoListActionType => ( {type: "ADD-TODOLIST", title, todoListId: v1()})
export  const changeTodoListActionCreator = (id: string, title: string): ChangeTodoListActionType => ( {type: "CHANGE-TODOLIST-TITLE", id, title})
export  const changeTodoListFilterActionCreator = (id: string, filter:FilterValuesType): ChangeFilterTodoListActionType => ( {type: "CHANGE-TODOLIST-FILTER", id, filter})
export const setTodolistAC = (todos: TodoListType[]): SetTodosActionCreator => ({type: 'SET-TODOS', todos})


export const fetchTodolistThunk = (dispatch: Dispatch) => {
    todolistAPI.getTodolist()
        .then(res => {
            dispatch(setTodolistAC(res.data.map(todo => ({
                id: todo.id,
                title: todo.title,
                filter: "all"
            }))))
        })
}

export const deleteTodolistThunk =(todoId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todoId)
        .then(res => {
            dispatch(removeTodoListActionCreator(todoId))
        })
}


export const deleteTodolistThunk =(todoId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todoId)
        .then(res => {
            dispatch(removeTodoListActionCreator(todoId))
        })
}
