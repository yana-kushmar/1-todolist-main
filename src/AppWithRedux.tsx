import React, {useCallback, useEffect, useState} from 'react';
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
    changeTodoListFilterActionCreator,
    deleteTodolistThunk,
    fetchTodolistThunk,
    removeTodoListActionCreator,
    setTodolistAC,

} from "./Reducer/TodolistReducer/TodolistReducer";
import {
    addTasksThunk,
     deleteTasksThunk, updateTasksStatusThunk,
    updateTasksTitleThunk
} from "./Reducer/TaskReducer/TaskReducer";
import { useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./Store/store";
import {TaskStatuses, todolistAPI} from "./api/todolist-api";


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

    const dispatch = useAppDispatch()


    useEffect(() => {
todolistAPI.getTodolist().then((res) => {
    dispatch(fetchTodolistThunk)

})
    }, [])


    const [darkMode, setDarkMode] = useState<boolean>(true)

    // tasks:
    const removeTask = useCallback((tasksId: string, todolistId: string) => {
        dispatch(deleteTasksThunk(todolistId, tasksId))
    },[dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTasksThunk(todoListId, title))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskId: string, status:  TaskStatuses, todoListId: string) => {

        dispatch(updateTasksStatusThunk(todoListId, taskId, status))
    },[dispatch])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        dispatch(updateTasksTitleThunk(todoListId, taskId, {title: newTitle}))
    },[dispatch])

//todolist:
    const removeTodoLists = useCallback((todoListId: string) => {
        dispatch(deleteTodolistThunk(todoListId))
    },[dispatch])
    const addTodoList = useCallback((title: string) => {
        const action = addTodoListActionCreator(title)
        dispatch(action)
    }, [dispatch])

    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
        const action = changeTodoListFilterActionCreator(todoListId, filter)
        dispatch(action)
    },[dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        const action = changeTodoListActionCreator(title, todoListId)
        dispatch(action)
    },[dispatch])


    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case  "active":
                return tasks.filter(t => !t.completed)

            case "completed":
                return tasks.filter(t => t.completed)
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
