/** @file Drag and drop sortable list items */

import { Item } from './Item'
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
  padding: grid
  // width: 250
})

type Props = {
  items: ListItemType[]
  update: (_: ListItemType) => Promise<Object>
  updateItemOrder: (_: string[]) => Promise<any>
  remove: (_: ListItemType) => Promise<any>
}

export const DraggableItems = ({
  items, //: propsItems,
  update,
  updateItemOrder,
  remove
}: Props) => {
  //const [items, setItems] = useState(propsItems)

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
    // setItems(newItems)
    updateItemOrder(newItems.map((i) => i._id))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, idx: number) => (
              <Draggable
                key={item._id + '__' + item._rev}
                draggableId={item._id}
                index={idx}
              >
                {(provided, snapshot) => (
                  <Item
                    item={item}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={item._rev + '>li'}
                    // style={{ minWidth: 400 }}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                    isDraggable={true}
                    onDoneToggle={() =>
                      update({ ...item, completed: !item.completed })
                    }
                    remove={() => remove(item)}
                  />
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
