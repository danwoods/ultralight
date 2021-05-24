/** @file Form to create a new to-do item */

import { useEffect, useRef, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

/**
 * To-Do Item form
 * @param {Object} props Form properties
 * @param {Function} props.create Function to create to-do item
 * @returns {JSX.Element} To-Do Item form
 */
export const NewItemForm = ({
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
    <ClickAwayListener onClickAway={() => setShow(false)}>
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
            placeholder={'Describe this to-do'}
          />
          <TextField
            variant={'outlined'}
            type={'text'}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label={'Notes'}
            placeholder={'Describe this to-do'}
            multiline={true}
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
          size={'small'}
          style={{ marginTop: show ? '24px' : 0 }}
          type={'submit'}
        >
          {show ? 'Add this to-do' : 'Add to-do'}
        </Button>
      </form>
    </ClickAwayListener>
  )
}
