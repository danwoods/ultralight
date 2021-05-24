import React, { ComponentProps, useState } from 'react'

import { Story } from '@storybook/react'
import { List } from './index'

const items = [
  {
    _id: 'a',
    _rev: '1',
    name: 'Item 1',
    completed: false,
    _deleted: false,
    description: 'This is a description of the to-do'
  },
  {
    _id: 'b',
    _rev: '1',
    name: 'Item 2',
    completed: true,
    _deleted: false,
    description: ''
  }
]

//👇 This default export determines where your story goes in the story list
export default {
  title: 'List',
  component: List,
  argTypes: {
    remove: { action: 'remove' },
    addItem: { action: 'addItem' },
    removeItem: { action: 'removeItem' },
    updateItemOrder: { action: 'updateItemOrder' }
  }
}

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof List>> = (args) => (
  <List {...args} />
)

const SortableTemplate: Story<ComponentProps<typeof List>> = (args) => {
  const [sortedItems, setSortedItems] = useState(args.list.items)

  // Handle sorting
  args.list.items = sortedItems
  args.updateItemOrder = (newIdOrder) => {
    const newItems = newIdOrder.map((id) =>
      sortedItems.find((item) => item._id === id)
    )
    setSortedItems(newItems)
  }

  return <List {...args} />
}

export const Default = Template.bind({})
Default.args = {
  list: {
    _id: 'la',
    _rev: '1',
    name: 'List 1',
    _deleted: false,
    description: '',
    items
  }
}

export const Sortable = SortableTemplate.bind({})
Sortable.args = {
  list: {
    _id: 'la',
    _rev: '1',
    name: 'List 1',
    _deleted: false,
    description: '',
    items: [
      ...items,
      {
        _id: 'c',
        _rev: '1',
        name: 'Item 3',
        completed: false,
        _deleted: false,
        description: ''
      }
    ]
  }
}
