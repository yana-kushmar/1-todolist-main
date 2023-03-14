import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Components/TodoList";
import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed"


type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}

type TaskStateType = {
     [todoListId: string]: Array<TaskType>
}
type TodoListStateType = TodoListType[]

const App = () => {

    //business logic layer:
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<TodoListStateType>([
        {id: todoListId_1, title: "What to learn ", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "React & Redux", isDone: false},
        ],
       [todoListId_2]: [
           {id: v1(), title: "Milk", isDone: true},
           {id: v1(), title: "Bread", isDone: true},
           {id: v1(), title: "Meat", isDone: false},
       ]
    })


    //BLL:


    // useState function / method-object React
    // useState - hook which track React
    // hook pulls the state of a component

    const removeTask = (taskId: string, todoListId: string) => {
        //
        setTasks({...tasks,
            [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})


        // const updatedTasks = tasks[todoListId].filter(t => t.id !== taskId)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)

    }

    //const updatedTask = tasks.filter(t => t.id !== taskId)=> setTasks(updatedTask)

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el) }) //уточить про el.id === taskId
    }
    const changeTodoListFilter  = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map((tl) => tl.id === todoListId ? {...tl, filter: filter} : tl ))
    }

    const removeTodoLists = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        const copyTasks = {...tasks}
        delete copyTasks[todoListId]
        setTasks(copyTasks)
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {

            case  "active":
                return tasks.filter(t => !t.isDone)

            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }


const todoListsComponents = todoLists.map(tl =>  {
    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)

    return (
        <TodoList
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={filteredTasks}
            filter={tl.filter}

            removeTask={removeTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}

            changeTodoListFilter={changeTodoListFilter}
            removeTodoLists={removeTodoLists}/>

    )
})


    //UI:
    return (
        <div className="App">

            {todoListsComponents}

        </div>
    );
}

export default App;