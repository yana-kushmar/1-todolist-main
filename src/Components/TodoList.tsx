import React, {ChangeEvent, KeyboardEvent, RefObject, useRef, useState} from "react";
import TasksList from "./TasksList";
import {FilterValuesType} from "../App"
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";

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

                <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                    <button onClick={removeTodoList}>X</button>

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

                    <button
                        className={props.filter === "all" ? "active-filter-btn" : "filter-btn"}
                        onClick={handlerCreator("all")}>All
                    </button>
                    <button className={props.filter === "active" ? "active-filter-btn" : "filter-btn"}
                            onClick={handlerCreator("active")}>Active
                    </button>
                    <button className={props.filter === "completed" ? "active-filter-btn" : "filter-btn"}
                            onClick={handlerCreator("completed")}>Completed
                    </button>

                </div>

            </div>

        </div>
    );
}

export default TodoList;
