import React from "react";
import TasksList from "./TasksList";
import {FilterValuesType} from "../App"
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";



//CRUD
//R- filter, sort, search


type TodoListPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    //tasks: TaskType[]

    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void

    changeTodoListFilter: (filter: FilterValuesType, todolistId: string) => void
    removeTodoLists: (todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void

}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;


}

const TodoList = (props: TodoListPropsType) => {


    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todolistId)
    const removeTodoList = () => props.removeTodoLists(props.todolistId)

    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todolistId)
    }

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
}

export default TodoList;
