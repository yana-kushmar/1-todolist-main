import React, {memo, useCallback, useEffect} from "react";
import TasksList from "./TasksList";
import {FilterValuesType} from "../AppWithRedux"
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { getTasksThunk} from "../Reducer/TaskReducer/TaskReducer";

import {useAppDispatch} from "../Store/store";
import {TaskStatuses} from "../api/todolist-api";



//CRUD
//R- filter, sort, search


type TodoListPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>

    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void

    changeTodoListFilter: (filter: FilterValuesType, todolistId: string) => void
    removeTodoLists: (todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void

}

export type TaskType = {
    id: string;
    title: string;
    completed: boolean;
    description?: string
    status?: number
    priority?: number
    startDate?: string | null
    deadline?: string | null

}

const TodoList =  memo((props: TodoListPropsType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksThunk(props.todolistId))

    }, [])

    const handlerCreator = useCallback((filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todolistId),[props.changeTodoListFilter, props.todolistId])
    const removeTodoList = () => props.removeTodoLists(props.todolistId)
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistId)
    }, [props.addTask, props.todolistId])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todolistId)
    },[ props.changeTodoListTitle, props.todolistId])


    return (
        <div className="App">

            <div className={"todolist"}>

                <h3 className="h3"><EditableSpan title={props.title}
                                                 changeTitle={changeTodoListTitle}/>

                    <IconButton
                        size="small"
                        onClick={removeTodoList}
                    >
                        <DeleteOutlineIcon/>
                    </IconButton>

                </h3>

                <AddItemForm
                    maxLengthUserMessage={15}
                    addNewItem={addTask}
                />


                <TasksList
                    todoListId={props.todolistId}
                    tasks={props.tasks}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                />

                <div className={"filter-btn-container"}>

                    <Button
                        size="small"
                        variant="contained"
                        disableElevation
                        color={props.filter === "all" ? "secondary" : "primary"}


                        onClick={handlerCreator("all")}>All
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        disableElevation
                        color={props.filter === "active" ? "secondary" : "primary"}

                        onClick={handlerCreator("active")}>Active
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        disableElevation
                        color={props.filter === "completed" ? "secondary" : "primary"}



                        onClick={handlerCreator("completed")}>Completed
                    </Button>

                </div>

            </div>

        </div>
    );
})

export default TodoList;
