import {FilterValues, TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export type TodoProps = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValues
}

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 changeTaskStatus,
                                 filter
                             }: TodoProps) => {
    const [taskTitle, setTaskTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(trimmedTitle)
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


    return (
        <div>
            <div>
                <h3>{title}</h3>
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
                            deleteTask(t.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(t.id, newStatusValue)
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
                    <Button className={filter === 'all' ? 'active-filter' : ''}
                            title={'All'}
                            onClick={() => changeFilter('all')}/>
                    <Button className={filter === 'active' ? 'active-filter' : ''}
                            title={'Active'}
                            onClick={() => changeFilter('active')}/>
                    <Button className={filter === 'completed' ? 'active-filter' : ''}
                            title={'Completed'}
                            onClick={() => changeFilter('completed')}/>
                </div>
            </div>
        </div>
    );
};

