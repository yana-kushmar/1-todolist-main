import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';



type AddItemFormPropsType = {
    maxLengthUserMessage: number
    addNewItem: (title: string) => void
}

const AddItemForm = memo((props: AddItemFormPropsType)  => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addNewItem(trimmedTitle)
        } else
            setError(true)
        setTitle("")
    }

    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) =>
        e.key === "Enter" && addItem()


    const userErrorMessage = error &&
        <div style={{color: "hotpink"}}> Title is required </div>

    const isUserMessageTooLong: boolean = title.length > props.maxLengthUserMessage

    const isAddBtnDisable = !title.length || isUserMessageTooLong

    const userMaxLengthMessage =
        title.length > 15 && <div style={{color: "hotpink"}}>
            Task title is too long </div>





    return (
        <div >

            <TextField
                size="small"
                error={error}

                value={title}
                placeholder="Please, enter the title "
                onChange={changeLocalTitle}
                onKeyDown={onKeyDownAddItem}

            />


            <IconButton  disabled={isAddBtnDisable} onClick={addItem}>
                <AddBoxIcon/>
            </IconButton>
            {userMaxLengthMessage}
            {userErrorMessage}
        </div>
    );
})

export default AddItemForm;