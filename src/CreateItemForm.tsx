import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type CreateItemFormPropsType = {
    createTask: (title: string) => void
}


export const CreateItemForm = ({createTask}:CreateItemFormPropsType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={taskTitle}
                   onChange={changeTaskTitleHandler}
                   onKeyDown={createTaskOnEnterHandler}
            />
            <Button onClick={createTaskHandler} title={'+'}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

