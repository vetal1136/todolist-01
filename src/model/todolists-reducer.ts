import {FilterValues, Todolist} from "../App.tsx";


const initialState: Array<Todolist> = []

export type DeleteTodolistAT = ReturnType<typeof DeleteTodolistAC>

export type CreateTodolistAt = ReturnType<typeof CreateTodolistAC>

export type ChangeTodolistTitleAt = ReturnType<typeof ChangeTodolistTitleAC>

export type ChangeFilterAT = ReturnType<typeof ChangeTodolistFilterAC>


export type ActionType = DeleteTodolistAT | CreateTodolistAt | ChangeTodolistTitleAt | ChangeFilterAT

export const todolistsReducer = (todolists: Array<Todolist> = initialState, action: ActionType ): Array<Todolist> => {
    switch (action.type) {
        case 'delete_todolist': {
            return todolists.filter(todolist => todolist.id !== action.payload.id) // логика удаления тудулиста
        }
        case 'create_todolist': {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...todolists, newTodolist]
        }
        case 'change_todolist_title': {
            const {id, title} = action.payload
            return todolists.map(todolist => todolist.id === id ? {...todolist, title} : todolist)
        }
        case 'change_todolist_filter': {
            const {id, filter} = action.payload
            return todolists.map(todolist => todolist.id === id ? {...todolist, filter} : todolist)
        }
        default:
            return todolists
    }
}

export const DeleteTodolistAC = (id: string) => ({
    type: 'delete_todolist',
    payload: {
        id: id
    }
} as const)

export const CreateTodolistAC = ({id, title}:{id: string, title: string}) => ({
    type: 'create_todolist',
    payload: {
        id: id,
        title: title
    }
} as const)

export const ChangeTodolistTitleAC = ({id, title}:{id: string, title: string}) => ({
    type: 'change_todolist_title',
    payload: {
        id: id,
        title: title
    }
} as const)

export const ChangeTodolistFilterAC = ({id, filter}:{id: string, filter: FilterValues})  => ({
    type: 'change_todolist_filter',
    payload: {
        id: id,
        filter: filter
    }
} as const)