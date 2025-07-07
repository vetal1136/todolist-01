import {type ChangeEvent} from 'react'
import type {FilterValues, Task, Todolist} from './App'
import {Button} from './Button'
import {CreateItemForm} from "./CreateItemForm.tsx";

type Props = {
  todolist: Todolist
  tasks: Task[]
  deleteTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, filter: FilterValues) => void
  createTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  deleteTodolist: (todolistId: string) => void
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
  } = props

  const createTaskCallback = (newTaskTitle: string) => {
      createTask(id, newTaskTitle)
  }

  // const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setTaskTitle(event.currentTarget.value)
  //   setError(null)
  // }


  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter)
  }

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }

  return (
      <div>
        <div className={'container'}>
          <h3>{title}</h3>
          <Button title={'x'} onClick={deleteTodolistHandler}/>
        </div>
        <CreateItemForm createItem={createTaskCallback}/>
        {tasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <ul>
              {tasks.map(task => {
                const deleteTaskHandler = () => {
                  deleteTask(id, task.id)
                }

                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  const newStatusValue = e.currentTarget.checked
                  changeTaskStatus(id, task.id, newStatusValue)
                }

                return (
                    <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                      <input type="checkbox" checked={task.isDone}
                             onChange={changeTaskStatusHandler}/>
                      <span>{task.title}</span>
                      <Button title={'x'} onClick={deleteTaskHandler}/>
                    </li>
                )
              })}
            </ul>
        )}
        <div>
          <Button className={filter === 'all' ? 'active-filter' : ''}
                  title={'All'}
                  onClick={() => changeFilterHandler('all')}/>
          <Button className={filter === 'active' ? 'active-filter' : ''}
                  title={'Active'}
                  onClick={() => changeFilterHandler('active')}/>
          <Button className={filter === 'completed' ? 'active-filter' : ''}
                  title={'Completed'}
                  onClick={() => changeFilterHandler('completed')}/>
        </div>
      </div>
  )
}
