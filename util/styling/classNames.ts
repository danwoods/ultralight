// @ts-ignore
import classNamesOriginal from 'classnames'
import { overrideTailwindClasses } from 'tailwind-override'

// @ts-ignore
export const classNames = (...args) =>
  overrideTailwindClasses(classNamesOriginal(...args))
