import React, {useState} from 'react';
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


export type FilterValuesType = "all" | "active" | "completed"


 export type TodoListType = {
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
const [darkMode, setDarkMode] = useState<boolean>(true)

    //BLL:


    // useState function / method-object React
    // useState - hook which track React
    // hook pulls the state of a component

    const removeTask = (taskId: string, todoListId: string) => {
        //get next state// set next state
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)
        })
    }
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

    const changeTodoListTitle  = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map((tl) => tl.id === todoListId ? {...tl, title: title} : tl ))
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, title: newTitle} : el) }) //уточить про el.id === taskId

    }

    const removeTodoLists = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        const copyTasks = {...tasks}
        delete copyTasks[todoListId]
        setTasks(copyTasks)
    }

    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title:title,
            filter: "all"

        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
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

export default App;
