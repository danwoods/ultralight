module.exports = {
  stories: [
    '../**/*.stories.mdx',
    '../**/stories.mdx',
    '../**/*.stories.@(js|jsx|ts|tsx)',
    '../**/stories.@(js|jsx|ts|tsx)'
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react'
}
