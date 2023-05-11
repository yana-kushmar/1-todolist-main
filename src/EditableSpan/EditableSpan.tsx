import React, {ChangeEvent, FC, memo, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    spanClasses?: string
    inputClasses?: string
}

const EditableSpan = memo((props: EditableSpanPropsType) => {
    console.log(EditableSpan)
    const [editMode, setEditMode] =useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(props.title)

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }
    const onEditMode = () => {
        setEditMode(true)

    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(localTitle)

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
                className={props.spanClasses}
                onDoubleClick={onEditMode}
            >{props.title}</span>
    );
})

export default EditableSpan;