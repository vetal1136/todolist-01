import type {TasksState} from '../App'
import {CreateTodolistAt, DeleteTodolistAT} from "./todolists-reducer.ts";

const initialState: TasksState = {}

type ActionType = CreateTodolistAt | DeleteTodolistAT

export const tasksReducer = (tasks: TasksState = initialState, action: ActionType): TasksState => {
    switch (action.type) {
        case "create_todolist": {
            const {id} = action.payload
            return ({...tasks, [id]: []})
        }
        case "delete_todolist": {
            delete tasks[action.payload.id]
            return {...tasks}
        }
        default:
            return tasks
    }
}
