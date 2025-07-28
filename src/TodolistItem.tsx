import {type ChangeEvent} from 'react'
import type {FilterValues, Task, Todolist} from './App'
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = (props: Props) => {
    const {
        todolist: {id, title, filter},
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist,
        changeTaskTitle,
        changeTodolistTitle
    } = props

    const createTaskCallback = (newTaskTitle: string) => {
        createTask(id, newTaskTitle)
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(id, newTitle)
    }

    return (
        <div>
            <div className={'container'}>
                <h3>
                    <EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
                    <IconButton aria-label="delete" onClick={deleteTodolistHandler} size={'small'}>
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                </h3>
            </div>
            <CreateItemForm createItem={createTaskCallback}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(id, task.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(id, task.id, newStatusValue)
                        }
                        const changeTaskTitleHandler = (newTitle: string) => {
                            changeTaskTitle(id, task.id, newTitle)
                        }
                        return (
                            <ListItem
                                key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} size={'small'}
                                          color={'success'}/>
                                <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                                <IconButton aria-label="delete" onClick={deleteTaskHandler} size={'small'}>
                                    <DeleteIcon fontSize="inherit"/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <div>
                <Button
                    onClick={() => changeFilterHandler('all')}
                    variant={"contained"}
                    size={"small"}
                    disableElevation
                    color={filter === 'all' ? 'secondary' : 'primary'}
                >All</Button>
                <Button
                    onClick={() => changeFilterHandler('active')}
                    variant={"contained"}
                    size={"small"}
                    disableElevation
                    color={filter === 'active' ? 'secondary' : 'primary'}
                >Active</Button>
                <Button
                    onClick={() => changeFilterHandler('completed')}
                    variant={"contained"}
                    size={"small"}
                    disableElevation
                    color={filter === 'completed' ? 'secondary' : 'primary'}
                >Completed</Button>
            </div>
        </div>
    )
}
