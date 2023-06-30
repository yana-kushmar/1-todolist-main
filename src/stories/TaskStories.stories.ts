import type {Meta, StoryObj} from '@storybook/react';
import TaskList from '../Components/TasksList';
import {action} from "@storybook/addon-actions"


const meta: Meta<typeof TaskList> = {
    title: 'TODOLIST/TaskList',
    component: TaskList,

    tags: ['autodocs'],

};

export default meta;
type Story = StoryObj<typeof TaskList>;


export const TaskIsDoneStory: Story = {
    args: {
        tasks: [{id: "234", completed: true, title: "JS"}],
        removeTask: action(" task is removed"),
        changeTaskStatus: action("change task status"),
        changeTaskTitle: action("change task title"),
    },
};

export const TaskINotDoneStory: Story = {
  args: {
    todoListId: "wsdfjmkafg",
    tasks: [{id: "21232334", completed: false, title: "CSS"}],
    removeTask: action(" task is removed"),
    changeTaskStatus: action("change task status"),
    changeTaskTitle: action("change task title"),
  },
};



