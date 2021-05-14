/** @file Form to create a new to-do list */

import { useEffect, useRef, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'

/**
 * To-Do List form
 * @param {Object} props Form properties
 * @param {Function} props.create Function to create to-do item
 * @returns {JSX.Element} To-Do Item form
 */
export const NewListForm = ({
  create
}: {
  create: (name: string, description: string) => void
}) => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (show) {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    } else {
      setName('')
    }
  }, [show])

  const submit = () => {
    create(name, description)
    setShow(false)
  }

  return (
    <form>
      <Collapse in={show}>
        <TextField
          inputRef={inputRef}
          variant={'outlined'}
          type={'text'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submit()
            } else if (e.key === 'Escape') {
              setShow(false)
            }
          }}
          placeholder={'Name'}
        />
        <TextField
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          placeholder={'Description'}
        />
      </Collapse>
      <Button
        onClick={(e) => {
          e.preventDefault()
          if (show) {
            submit()
          } else {
            setShow(true)
          }
        }}
        variant={'outlined'}
        style={{ marginTop: show ? '24px' : 0 }}
        type={'submit'}
      >
        {show ? 'Add this list' : 'Add list'}
      </Button>
    </form>
  )
}
