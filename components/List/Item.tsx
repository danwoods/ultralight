/** @file List Item */

import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from '@material-ui/icons/Delete'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import NotesIcon from '@material-ui/icons/Notes'
import { DBResponse } from '../../util/db'
import { ListItem as ListItemType } from '../../util/useListItems'
import { forwardRef } from 'react'

interface Props {
  item: ListItemType
  isDraggable: boolean
  onDoneToggle: () => Promise<ListItemType>
  remove: () => Promise<DBResponse>
}

const HeaderIcons = ({ description }: ListItemType) => (
  <span style={{ display: 'inline-block', margin: '0 8px' }}>
    {description ? (
      <NotesIcon aria-label="has-notes" fontSize={'small'} />
    ) : null}
  </span>
)

export const Item = forwardRef(
  ({ isDraggable, item, onDoneToggle, remove, ...rest }: Props, ref) => (
    <ListItem key={item._rev + ' > list-item'} ref={ref} {...rest}>
      <ListItemIcon>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          {isDraggable ? <DragIndicatorIcon /> : <div style={{ width: 24 }} />}
          <Checkbox
            edge="start"
            checked={item.completed}
            tabIndex={-1}
            disableRipple
            onClick={onDoneToggle}
          />
        </div>
      </ListItemIcon>
      <ListItemText>
        <label id={item._rev}>{item.name}</label>
        <HeaderIcons {...item} />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={(e) => {
            e.stopPropagation()
            remove()
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
)
