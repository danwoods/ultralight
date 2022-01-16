/** @file Drag and drop sortable list items */

import Checkbox from '@material-ui/core/Checkbox'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { ListItem as ListItemType } from '../../util/useListItems'
import { useState } from 'react'

// a little function to help us with reordering the result
const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)

  result.splice(endIndex, 0, removed)

  return result
}

const grid = 8

const getItemStyle = (isDragging: boolean, draggableStyle: Object) => ({
  userSelect: 'none',
  background: isDragging ? 'lightgrey' : 'transparent',
  ...draggableStyle
})

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'transparent' : 'transparent',
  padding: grid,
  width: 250
})

type Props = {
  items: ListItemType[]
  update: (_: ListItemType) => Promise<Object>
  updateItemOrder: (_: string[]) => Promise<any>
  remove: (_: ListItemType) => Promise<any>
}

export const Items = ({
  items: propsItems,
  update,
  updateItemOrder,
  remove
}: Props) => {
  const [items, setItems] = useState(propsItems)

  // @ts-ignore
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    )
    setItems(newItems)
    updateItemOrder(newItems.map((i) => i._id))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable'>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, idx: number) => (
              <Draggable key={item._rev} draggableId={item._id} index={idx}>
                {(provided, snapshot) => (
                  <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={item._rev + '>li'}
                    // style={{ minWidth: 400 }}
                    // @ts-ignore
                    style={getItemStyle(
                      snapshot.isDragging,
                      // @ts-ignore
                      provided.draggableProps.style
                    )}
                    onClick={() =>
                      update({ ...item, completed: !item.completed })
                    }
                  >
                    <ListItemIcon>
                      <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <DragIndicatorIcon />
                        <Checkbox
                          edge='start'
                          checked={item.completed}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': item._rev }}
                        />
                      </div>
                    </ListItemIcon>
                    <ListItemText>
                      <label id={item._rev}>{item.name}</label>
                    </ListItemText>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        remove(item)
                      }}
                    >
                      {'remove'}
                    </button>
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
