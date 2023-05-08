import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Components/TodoList";

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
     addTodoListActionCreator,
    changeTodoListActionCreator,
    changeTodoListFilterActionCreator, removeTodoListActionCreator,

} from "./Reducer/TodolistReducer/TodolistReducer";
import {
    addTaskActionCreator,
    changeTaskStatusActionCreator, changeTaskTitleActionCreator,
    removeTaskActionCreator,
    tasksReducer
} from "./Reducer/TaskReducer/TaskReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Store/store";


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

const AppWithRedux = () => {
    const todoLists = useSelector<AppRootStateType, TodoListStateType>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const [darkMode, setDarkMode] = useState<boolean>(true)

    // tasks:
    const removeTask = (taskId: string, todoListId: string) => {
        const action = removeTaskActionCreator(taskId, todoListId)
        dispatch(action)
    }
    const addTask = (title: string, todoListId: string) => {
        const action = addTaskActionCreator(title, todoListId)
        dispatch(action)
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        const action = changeTaskStatusActionCreator(taskId, newIsDone, todoListId)
        dispatch(action)
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        const action = changeTaskTitleActionCreator(taskId, newTitle, todoListId)
        dispatch(action)
    }

//todolist:
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        const action = changeTodoListFilterActionCreator(todoListId, filter)
        dispatch(action)
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        const action = changeTodoListActionCreator(title, todoListId)
        dispatch(action)
    }
    const removeTodoLists = (todoListId: string) => {
        const action = removeTodoListActionCreator(todoListId)
        dispatch(action)
    }
    const addTodoList = (title: string) => {
        const action = addTodoListActionCreator(title)
        dispatch(action)

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


    const todoListsComponents = todoLists.map(tl => {
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
                                    onChange={(e) => setDarkMode(e.currentTarget.checked)}/>}
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

export default AppWithRedux;
