import todoList, {TaskType} from "./TodoList";
import React, {ChangeEvent, memo, useCallback} from "react";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type TasksListPropsType = {
    todoListId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void

}

const TasksList = memo((props: TasksListPropsType) => {
    console.log("task")

    const tasksItems: JSX.Element[] | JSX.Element = props.tasks.length
        ? props.tasks.map((task) => {
            const taskClasses = ["task"]
            task.isDone && taskClasses.push("task-done")
            const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)

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

                        checked={task.isDone}
                        onChange={changeTaskStatusHandler}
                    />


                    <EditableSpan
                        title={task.title}
                        spanClasses={`task ${task.isDone ? 'task-done' : ''}`}
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