import React, { ComponentProps } from 'react'

import { Story } from '@storybook/react'
import { Item } from './Item'

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Item',
  component: Item,
  argTypes: {
    onDoneToggle: { action: 'onDoneToggle' },
    remove: { action: 'remove' }
  }
}

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Item>> = (args) => (
  <Item {...args} />
)

export const Default = Template.bind({})
Default.args = {
  item: {
    _id: 'a',
    _rev: '1',
    name: 'Item',
    completed: false,
    _deleted: false,
    description: ''
  }
}

export const WithDescription = Template.bind({})
WithDescription.args = {
  style: { width: '400px' },
  item: {
    _id: 'a',
    _rev: '1',
    name: 'Item',
    completed: false,
    _deleted: false,
    description: 'This is a description of the to-do'
  }
}
