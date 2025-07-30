import {Todolist} from "../App.tsx";

const initialState: Array<Todolist> = []

export type DeleteTodolistAT = {
    type: 'delete_todolist',
    payload: {
        id: string
    }
}

export type CreateTodolistAt = {}

export type ChangeTodolistTitleAt = {}

export type ChangeFilterAT = {}


export type ActionType = DeleteTodolistAT

export const todolistsReducer = (todolists: Array<Todolist> = initialState, action: ActionType ): Array<Todolist> => {
    switch (action.type) {
        case 'delete_todolist': {
            return todolists.filter(todolist => todolist.id !== action.payload.id) // логика удаления тудулиста
        }
        default:
            return todolists
    }
}

export const DeleteTodolistAC = (id: string): DeleteTodolistAT => ({
    type: 'delete_todolist',
    payload: {
        id: id
    }
})