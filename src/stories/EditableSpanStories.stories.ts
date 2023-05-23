import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {EditableSpan} from "../EditableSpan/EditableSpan"


const meta: Meta<typeof EditableSpan> = {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,

  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Start value empty. Add value push button set string.'
    },
    changeTitle: {
      description: 'Value EditableSpan changed'
    },

  },
  args: {
    changeTitle: action("Change value editable span"),
    title: "HTML"
  }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;
export const EditableSpanStory: Story = {};



