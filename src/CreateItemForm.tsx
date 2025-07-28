import {ChangeEvent, KeyboardEvent, useState} from "react";
import IconButton from '@mui/material/IconButton';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TextField from '@mui/material/TextField';

type CreateItemFormPropsType = {
    createItem: (newTitle: string) => void
}


export const CreateItemForm = ({createItem}: CreateItemFormPropsType) => {
    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle !== '') {
            createItem(trimmedTitle)
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <TextField label={'Enter a title'}
                       variant={'outlined'}
                       className={error ? 'error' : ''}
                       value={itemTitle}
                       size={'small'}
                       onChange={changeItemTitleHandler}
                       onKeyDown={createItemOnEnterHandler}/>
            <IconButton
                onClick={createItemHandler}
            >
                <AddTaskIcon/>
            </IconButton>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

