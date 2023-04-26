
import {TodoListType} from "../../App";
import {v1} from "uuid";



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


export type FilterValuesType = "all" | "active" | "completed"

export type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListActionType | ChangeFilterTodoListActionType


export const todolistReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoListId = v1()
            const newTodoList: TodoListType = {
                id: newTodoListId,
                title: action.title,
                filter: "all",
            }
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map((tl => tl.id === action.id ? {...tl, title: action.title} : tl))
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map((tl => tl.id === action.id ? {...tl, filter: action.filter} : tl ))
        default:
            return todoLists
    }
}

export  const RemoveTodoListActionCreator = (id: string): RemoveTodoListActionType => ( {type: "REMOVE-TODOLIST", id})
export  const AddTodoListActionCreator = (title: string, todoListId: string): AddTodoListActionType => ( {type: "ADD-TODOLIST", title, todoListId})
export  const ChangeTodoListActionCreator = (id: string, title: string): ChangeTodoListActionType => ( {type: "CHANGE-TODOLIST-TITLE", id, title})
export  const ChangeTodoListFilterActionCreator = (id: string, filter:FilterValuesType): ChangeFilterTodoListActionType => ( {type: "CHANGE-TODOLIST-FILTER", id, filter})


