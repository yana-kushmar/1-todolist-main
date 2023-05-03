import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Components/TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm/AddItemForm";
import {
    AppBar,
    Button,
    Checkbox,
    Container, createTheme,
    CssBaseline,
    FormControlLabel,
    FormGroup, Grid,
    IconButton,
    Paper, ThemeProvider,
    Toolbar,
    Typography
} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    ActionType, addTodoListActionCreator,
    changeTodoListActionCreator,
    changeTodoListFilterActionCreator, removeTodoListActionCreator,
    todolistReducer
} from "./Reducer/TodolistReducer/TodolistReducer";
import {
    addTaskActionCreator,
    changeTaskStatusActionCreator, changeTaskTitleActionCreator,
    removeTaskActionCreator,
    tasksReducer
} from "./Reducer/TaskReducer/TaskReducer";


export type FilterValuesType = "all" | "active" | "completed"


 export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}

 export type TaskStateType = {
     [todoListId: string]: Array<TaskType>
}
type TodoListStateType = TodoListType[]

const AppWithReducers = () => {

    //business logic layer:
    const todoListId_1 = v1()
    const todoListId_2 = v1()


    const [todoLists, dispatchTodoLists] = useReducer<Reducer<TodoListType[], ActionType>>(todolistReducer,[
        {id: todoListId_1, title: "What to learn ", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer,{
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
const [darkMode, setDarkMode] = useState<boolean>(true)

    //BLL:

    // useState function / method-object React
    // useState - hook which track React
    // hook pulls the state of a component

    // tasks:
    const removeTask = (taskId: string, todoListId: string) => {
        const action = removeTaskActionCreator(taskId, todoListId)
        dispatchTasks(action)
    }
    const addTask = (title: string, todoListId: string) => {
        const action = addTaskActionCreator(title, todoListId)
        dispatchTasks(action)
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        const action = changeTaskStatusActionCreator(taskId, newIsDone, todoListId)
        dispatchTasks(action)
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        const action = changeTaskTitleActionCreator(taskId, newTitle, todoListId)
        dispatchTasks(action)
    }

//todolist:
    const changeTodoListFilter  = (filter: FilterValuesType, todoListId: string) => {
        const action = changeTodoListFilterActionCreator(todoListId, filter)
        dispatchTodoLists(action)
    }
    const changeTodoListTitle  = (title: string, todoListId: string) => {
        const action = changeTodoListActionCreator(title, todoListId)
        dispatchTodoLists(action)
    }
    const removeTodoLists = (todoListId: string) => {
        const action = removeTodoListActionCreator(todoListId)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const addTodoList = (title: string) => {
        const action = addTodoListActionCreator(title)
        dispatchTodoLists(action)
        dispatchTasks(action)

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
        <Grid item>
            <Paper>
        <TodoList
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={filteredTasks}
            filter={tl.filter}

            removeTask={removeTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}

            changeTodoListFilter={changeTodoListFilter}
            removeTodoLists={removeTodoLists}
            changeTodoListTitle={changeTodoListTitle}
        />
        </Paper>
        </Grid>


    )
})
    const mode = darkMode ? "dark" : "light"
    const customTheme = createTheme({

            palette: {
                primary: {
                    main: '#c2185b',
                },
                secondary: {
                    main: '#512da8',
                },
                mode: mode
            },
    })



    //UI:
    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline/>
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox
                                onChange={(e)=>setDarkMode(e.currentTarget.checked)} />}
                            label={darkMode ? "Light mode" : "Dark mode"}
                        />
                    </FormGroup>

                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{p: "15px 0"}}>
            <AddItemForm maxLengthUserMessage={15} addNewItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
            {todoListsComponents}
                </Grid>
                </Container>
        </div>
        </ThemeProvider>
    );
}

export default AppWithReducers;
