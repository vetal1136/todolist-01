import {FilterValues, TaskType, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export type TodoProps = {
    todolist: Todolist
    tasks: TaskType[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistsId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = ({

                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 changeTaskStatus,
                                 todolist,
                                 deleteTodolist
                             }: TodoProps) => {
    const [taskTitle, setTaskTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(todolist.id, trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(todolist.id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(todolist.id)
    }

    return (
        <div>
            <div>
                <div className={'container'}>
                    <h3>{todolist.title}</h3>
                    <Button title={'x'} onClick={deleteTodolistHandler}/>
                    </div>
                    <div>
                        <input className={error ? 'error' : ''}
                               value={taskTitle}
                               onChange={changeTaskTitleHandler}
                               onKeyDown={createTaskOnEnterHandler}
                        />
                        <Button onClick={createTaskHandler} title={'+'}/>
                        {error && <div className={'error-message'}>{error}</div>}
                    </div>
                    {tasks.length === 0 ? (<p>Task not found</p>) : (<ul>
                        {tasks.map(t => {
                            const deleteTaskHandler = () => {
                                deleteTask(todolist.id, t.id)
                            }
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(todolist.id, t.id, newStatusValue)
                            }
                            return (<li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={changeTaskStatusHandler}
                                /> <span>{t.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>)
                        })}
                    </ul>)}
                    <div>
                        <Button className={todolist.filter === 'all' ? 'active-filter' : ''}
                                title={'All'}
                                onClick={() => changeFilterHandler('all')}/>
                        <Button className={todolist.filter === 'active' ? 'active-filter' : ''}
                                title={'Active'}
                                onClick={() => changeFilterHandler('active')}/>
                        <Button className={todolist.filter === 'completed' ? 'active-filter' : ''}
                                title={'Completed'}
                                onClick={() => changeFilterHandler('completed')}/>
                    </div>
                </div>
            </div>
            );
            };

