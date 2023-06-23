import {tasksReducer} from '../Reducer/TaskReducer/TaskReducer';
import {todolistReducer} from '../Reducer/TodolistReducer/TodolistReducer';
import {AnyAction, applyMiddleware, combineReducers, createStore, legacy_createStore} from 'redux';
import thunk, {ThunkDispatch} from "redux-thunk"
import {useDispatch} from "react-redux";
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
 export const useAppDispatch  = () => useDispatch<AppDispatchType>()
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>



// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

