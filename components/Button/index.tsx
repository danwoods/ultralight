/** @file Default Buttion */
import React from 'react'

/**
 * Default Button
 */
export const Button = (
  props: React.HTMLAttributes<HTMLButtonElement> & { disabled?: boolean }
) => (
  <button
    {...props}
    className="m-8 ml-auto p-5 bg-primary hover:bg-primary-dark disabled:bg-primary-light text-white font-bold py-2 rounded cursor-pointer"
  />
)

export default Button
