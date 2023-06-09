// import {
//     addTaskActionCreator,
//     changeTaskStatusActionCreator,
//     changeTaskTitleActionCreator,
//     removeTaskActionCreator,
//     tasksReducer
// } from './TaskReducer'
// import {TaskStateType} from "../../AppWithRedux";
// import {addTodoListActionCreator, removeTodoListActionCreator} from "../TodolistReducer/TodolistReducer";
// import {v1} from "uuid";
//
// let  startState: TaskStateType
// beforeEach( () => {
//     startState = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', completed: false},
//             {id: '2', title: 'JS', completed: true},
//             {id: '3', title: 'React', completed: false}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', completed: false},
//             {id: '2', title: 'milk', completed: true},
//             {id: '3', title: 'tea', completed: false}
//         ]
//     }
// })
//
// test('correct task should be deleted from correct array', () => {
//     const action = removeTaskActionCreator('2', 'todolistId2')
//
//     const endState = tasksReducer(startState, action)
//
//
//     expect(endState["todolistId1"].length).toBe(3)
//     expect(endState["todolistId2"].length).toBe(2)
//     expect(endState).toEqual({
//         'todolistId1': [
//             {id: '1', title: 'CSS', isDone: false},
//             {id: '2', title: 'JS', isDone: true},
//             {id: '3', title: 'React', isDone: false}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', isDone: false},
//             {id: '3', title: 'tea', isDone: false}
//         ]
//     })
// })
//
// test('correct task should be added to correct array', () => {
//     const action = addTaskActionCreator('juice', 'todolistId2', v1())
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId1'].length).toBe(3)
//     expect(endState['todolistId2'].length).toBe(4)
//     expect(endState['todolistId2'][0].id).toBeDefined()
//     expect(endState['todolistId2'][0].title).toBe("bread")
//     expect(endState['todolistId2'][0].completed).toBe(false)
// })
// test('status of specified task should be changed', () => {
//     const action = changeTaskStatusActionCreator("2", false, "todolistId2");
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId2"][1].completed).toBe(false);
//     expect(endState["todolistId1"][1].completed).toBe(true);
// });
//
// test('title of specified task should be changed', () => {
//     const action = changeTaskTitleActionCreator("2", "beer", "todolistId2");
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId2"][1].title).toBe("beer");
//     expect(endState["todolistId1"][1].title).toBe("JS");
// });
//
//
// test('new array should be added when new todolist is added', () => {
//     const action = addTodoListActionCreator('new todolist')
//     const endState = tasksReducer(startState, action)
//
//     const keys = Object.keys(endState)
//     const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
//     if (!newKey) {
//         throw Error('new key should be added')
//     }
//
//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
// })
//
//
// test('property with todolistId should be deleted', () => {
//     const action = removeTodoListActionCreator("todolistId2");
//     const endState = tasksReducer(startState, action)
//     const keys = Object.keys(endState);
//
//     expect(keys.length).toBe(1);
//     expect(endState["todolistId2"]).not.toBeDefined();
// });

export {}