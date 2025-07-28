import {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = ({title, changeTitle}: EditableSpanPropsType) => {
    const [isEditMod, setIsEditMod] = useState(false)
    const [itemTitle, setItemTitle] = useState(title)

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }



    const onEditMode = () => setIsEditMod(true)
    const offEditMode = () => {
        changeTitle(itemTitle)
        setIsEditMod(false)
    }

    return (
        isEditMod
            ? <input
                autoFocus={true}
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onBlur={offEditMode}
            />
            : <span onDoubleClick={onEditMode}>{title}</span>);
}
