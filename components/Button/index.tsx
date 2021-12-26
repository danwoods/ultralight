/** @file Default Buttion */
import React from 'react'
import { classNames } from '../../util/styling/classNames'

const classes = {
  root: `
    m-8
    ml-auto
    p-5
    bg-primary
    hover:bg-primary-dark
    disabled:bg-primary-light
    text-white
    font-bold
    py-2
    rounded
    cursor-pointer
  `
}

/**
 * Default Button
 */
export const Button = (
  props: React.HTMLAttributes<HTMLButtonElement> & { disabled?: boolean }
) => <button {...props} className={classNames(classes.root, props.className)} />

export default Button
