import React, {ChangeEvent, KeyboardEvent, RefObject, useRef, useState} from "react";
import TasksList from "./TasksList";
import {FilterValuesType} from "../App"

//CRUD
//R- filter, sort, search



type TodoListPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    //tasks: TaskType[]

    removeTask: (taskId: string, todolistId: string ) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void

    changeTodoListFilter: (filter: FilterValuesType, todolistId: string) => void
    removeTodoLists: (todoListId: string) => void

}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;

}

const TodoList = (props: TodoListPropsType) => {
    //const TodoList: FC<TodoListProps> = (props: TodoListType) =>

    const [title, setTitle] = useState<string>("")

    const [error, setError] = useState<boolean>(false)
    const maxLengthUserMessage: number = 15
    const isUserMessageTooLong: boolean = title.length > maxLengthUserMessage
    const isAddBtnDisable = title.length === 0


    // const addTaskInput: RefObject<HTMLInputElement> = useRef(null)
    // const addTask = () => {
    //    if (addTaskInput.current) {
    //        props.addTask(addTaskInput.current.value)
    //        addTaskInput.current.value = ""
    //    }
    // }
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todolistId)
        } else
            setError(true)
        setTitle("")
    }


    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()

    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todolistId)
const removeTodoList = () => props.removeTodoLists(props.todolistId)




    const inputErrorClasses = error || isUserMessageTooLong ? "input-error" : ""
    const userMaxLengthMessage = title.length > 15 && <div style={{color: "hotpink"}}> Task title is too long </div>
    const userErrorMessage = error && <div style={{color: "hotpink"}}> Title is required </div>


    return (
        <div className="App">

            <div className={"todolist"}>

                <h3>{props.title}
                <button onClick={removeTodoList}>X</button>
                </h3>

                <div>
                    {/* USEREF <input ref={addTaskInput}/>*/}
                    {/*  USEREF <button onClick={addTask}>+</button>*/}
                    <input
                        value={title}
                        placeholder="Please, enter the title "
                        onChange={changeLocalTitle}
                        onKeyDown={onKeyDownAddTask}
                        className={inputErrorClasses}
                    />
                    <button disabled={isAddBtnDisable} onClick={addTask}>+</button>
                    {userMaxLengthMessage}
                    {userErrorMessage}
                </div>
                <TasksList
                    todoListId={props.todolistId}
                    tasks={props.tasks}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
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
