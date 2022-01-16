/** @file Edit menu for list */
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React, { MouseEvent, useState, Fragment } from 'react'

type Props = {
  listId: string
  remove: () => void
}

/**
 * List edit menu; currently only `remove`
 * @param {Object} Props Component properties
 * @param {string} listId List ID; used to construct IDs
 * @param {Function} remove Function to remove List
 * @returns {JSX.Element} IconButton and Menu
 */
export const EditMenu = ({ listId, remove }: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Fragment>
      <IconButton
        aria-controls={`${listId}-edit-menu`}
        aria-haspopup='true'
        aria-label={'edit'}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`${listId}-edit-menu`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={remove}>{'Delete'}</MenuItem>
      </Menu>
    </Fragment>
  )
}
