import React, { ComponentProps } from 'react'

import { Story } from '@storybook/react'
import { NewListForm } from './NewListForm'

//👇 This default export determines where your story goes in the story list
export default {
  title: 'New List Form',
  component: NewListForm,
  argTypes: {
    create: { action: 'create' }
  }
}

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof NewListForm>> = (args) => (
  <NewListForm {...args} />
)

export const Default = Template.bind({})
Default.args = {}
