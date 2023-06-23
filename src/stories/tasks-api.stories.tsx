
import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/tasks-api";

export default {
    title: 'API'
}



export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTasks()
            .then(res => {
                setState(res.data)

            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "Ky"
        todolistAPI.createTasks(title)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "31c361f2-e0eb-45a3-974f-6f15e1693e98"
        todolistAPI.deleteTasks(todolistId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTasksTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = "be46eb68-5444-4eab-bd58-6be6e91f4260"
        const title = "KY-ky"
       todolistAPI.updateTasks(todoId, title)
            .then(res => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

