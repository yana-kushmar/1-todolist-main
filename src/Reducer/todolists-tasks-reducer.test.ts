import {TaskStateType, TodoListType} from "../App";
import {AddTodoListActionCreator, todolistReducer} from "./TodolistReducer/TodolistReducer";
import {tasksReducer} from "./TodolistReducer/TaskReducer";



test('ids should be equals', () => {
    const startTasksState: TaskStateType = {}
    const startTodoListsState: Array<TodoListType> = []

    const action = AddTodoListActionCreator('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodoLists).toBe(action.todoListId)
})