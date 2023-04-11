import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    spanClasses?: string
    inputClasses?: string
}

const EditableSpan: FC<EditableSpanPropsType> = (
    {
        title,
        spanClasses,
        changeTitle,
    }
    ) => {
    const [editMode, setEditMode] =useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(title)

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }
    const onEditMode = () => {
        setEditMode(true)

    }
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(localTitle)

    }


    return (
        editMode
            ? <TextField
            variant="standard"

            value={localTitle}
            onChange={changeLocalTitle}
            autoFocus
            onBlur={offEditMode}
            />
            : <span
                className={spanClasses}
                onDoubleClick={onEditMode}
            >{title}</span>
    );
};

export default EditableSpan;