
import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";
import {string} from "prop-types";

export default {
    title: 'API'
}



export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then(res => {
                setState(res.data)

            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "Ky"
        todolistAPI.createTodolist(title)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "31c361f2-e0eb-45a3-974f-6f15e1693e98"
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = "be46eb68-5444-4eab-bd58-6be6e91f4260"
        const title = "KY-ky"
       todolistAPI.updateTodolist(todoId, title)
            .then(res => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "41a222bd-44cb-4c07-94e2-5316331ce661"
        todolistAPI.getTasks(todolistId)
            .then(res => {
                setState(res.data)

            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "go"
        const todolistId = "41a222bd-44cb-4c07-94e2-5316331ce661"
        todolistAPI.createTasks(todolistId, title)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("null")
    const [todoId, setTodoId] = useState<string>("null")
    const deleteTask = () => {
        const todolistId = "a585e61-b9a2-4419-9eae-1bb7d9761b4a"
        const taskId = ""
        todolistAPI.deleteTasks(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })
    }


    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder={"todoId"} value={todoId} onChange={(e) => {setTodoId(e.currentTarget.value)}}/>
        <input placeholder={"taskId"} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
        <button onClick={deleteTask}>Delete Task</button>
    </div>
</div>
}


export const UpdateTasksTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")
    const [description, setTaskDesc] = useState<string>("")
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [deadline, setDeadline] = useState<string>("")
    const [startDate, setStartDate] = useState<string>("")

    const [todolistId, setTodolistId]= useState<string>("")
    const [taskId, setTaskId]= useState<string>("")


    const updateTaskTitle = () => {
        todolistAPI.updateTasks(todolistId, taskId, {
            deadline: "",
            description: description,
            priority: priority,
            startDate: "",
            title: title,
            status: status


        })
            .then(res => {
                setState(res.data)
            })

    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"title"} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
            <input placeholder={"description"} value={description} onChange={(e) => {setTaskDesc(e.currentTarget.value)}}/>
            <input placeholder={"status"} value={status} onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
            <input placeholder={"priority"} value={priority} onChange={(e) => {setPriority(+e.currentTarget.value)}}/>
            <input placeholder={"deadline"} value={deadline} onChange={(e) => {setDeadline(e.currentTarget.value)}}/>
            <input placeholder={"startDate"} value={startDate} onChange={(e) => {setStartDate(e.currentTarget.value)}}/>
            <button onClick={updateTaskTitle}>Update Task Title</button>
        </div></div>
}
