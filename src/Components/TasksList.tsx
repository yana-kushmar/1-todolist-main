import {TaskType} from "./TodoList";
import React, {ChangeEvent, FC} from "react";

type TasksListPropsType = {
    todoListId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
}

const TasksList = (props: TasksListPropsType) => {
    //const TodoList: FC<TodoListProps> = (props: TodoListType) =>

    const tasksItems: JSX.Element[] | JSX.Element = props.tasks.length
        ? props.tasks.map((task) => {
            const taskClasses = ["task"]
            task.isDone && taskClasses.push("task-done")
            // const taskClasses = task.isDone ? "task task-done" : "task"
            const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)


            return (

                <li key={task.id}>

                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={changeTaskStatusHandler}
                    />

                    <span className={taskClasses.join(" ")}>{task.title}</span>
                    <button onClick={removeTaskHandler}>x</button>

                </li>

            )
        })
        : <span>Your tasks-list is empty</span>

    return (

        <ul>
            {tasksItems}
        </ul>

    );
};

export default TasksList;