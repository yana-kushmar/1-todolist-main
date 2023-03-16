import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';


type AddItemFormPropsType = {
    maxLengthUserMessage: number
    addNewItem: (title: string) => void
}

const AddItemForm: FC<AddItemFormPropsType> = (
    {
        maxLengthUserMessage,
        addNewItem
    }
) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addNewItem(trimmedTitle)
        } else
            setError(true)
        setTitle("")
    }

    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) =>
        e.key === "Enter" && addItem()


    const userErrorMessage = error &&
        <div style={{color: "hotpink"}}> Title is required </div>

    const isUserMessageTooLong: boolean = title.length > maxLengthUserMessage

    const isAddBtnDisable = !title.length || isUserMessageTooLong

    const userMaxLengthMessage =
        title.length > 15 && <div style={{color: "hotpink"}}>
            Task title is too long </div>

    const inputErrorClasses = error || isUserMessageTooLong ? "input-error" : ""



    return (
        <div>
            {/* USEREF <input ref={addTaskInput}/>*/}
            {/*  USEREF <button onClick={addTask}>+</button>*/}
            <input
                value={title}
                placeholder="Please, enter the title "
                onChange={changeLocalTitle}
                onKeyDown={onKeyDownAddItem}
                className={inputErrorClasses}
            />
            <button disabled={isAddBtnDisable} onClick={addItem}>+</button>
            {userMaxLengthMessage}
            {userErrorMessage}
        </div>
    );
};

export default AddItemForm;