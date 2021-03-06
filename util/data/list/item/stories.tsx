import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Item } from './index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'List/Item',
  component: Item,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Item>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Item> = (args) => <Item {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {}

export const Secondary = Template.bind({})
Secondary.args = {}

export const Large = Template.bind({})
Large.args = {}

export const Small = Template.bind({})
Small.args = {}
