import {TaskType} from "./TodoList";
import React, {ChangeEvent, memo} from "react";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {TaskStatuses} from "../api/todolist-api";

type TasksListPropsType = {
    todoListId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void

}

const TasksList = memo((props: TasksListPropsType) => {
    console.log("task")

    const tasksItems: JSX.Element[] | JSX.Element = props.tasks.length
        ? props.tasks.map((task) => {
            const taskClasses = ["task"]
            task.completed && taskClasses.push("task-done")
            const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todoListId)

            const changeTaskTitleHandler = ( title: string) => {
                props.changeTaskTitle(task.id, title, props.todoListId)
            }

            return (
                <ListItem key={task.id}

                          disablePadding
                          secondaryAction={<IconButton
                              size="small"

                              onClick={removeTaskHandler}
                          >
                              <DeleteOutlineIcon/>
                          </IconButton>}

                >

                    <Checkbox
                        size="small"
                        color="secondary"
                        edge="start"

                        checked={task.completed}
                        onChange={changeTaskStatusHandler}
                    />


                    <EditableSpan
                        title={task.title}
                        spanClasses={`task ${task.completed ? 'task-done' : ''}`}
                        changeTitle={changeTaskTitleHandler}
                    />


                </ListItem>

            )
        })
        : <span>Your tasks-list is empty</span>

    return (

        <ul>
            {tasksItems}
        </ul>

    );
})

export default TasksList;