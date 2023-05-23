import type { Meta, StoryObj } from '@storybook/react';
import  AddItemForm  from '../AddItemForm/AddItemForm';
import {action} from "@storybook/addon-actions"

const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,

  tags: ['autodocs'],

  argTypes: {
    addNewItem: {
      description: "Button clicked inside form",
      action: "clicked",
    }

  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;


export const AddItemFormStory: Story = {

  args: {
addNewItem: action("Clicked inside form")

  },
};



