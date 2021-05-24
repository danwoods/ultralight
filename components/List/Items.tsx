/** @file List items */

import { Item } from './Item'
import { ListItem as ListItemType } from '../../util/useListItems'
import { Fragment } from 'react'

type Props = {
  items: ListItemType[]
  update: (_: ListItemType) => Promise<Object>
  remove: (_: ListItemType) => Promise<any>
}

export const Items = ({ items, update, remove }: Props) => {
  return (
    <Fragment>
      {items.map((item, idx: number) => (
        <Item
          item={item}
          key={item._rev + '>li'}
          isDraggable={false}
          onDoneToggle={() => update({ ...item, completed: !item.completed })}
          remove={() => remove(item)}
        />
      ))}
    </Fragment>
  )
}
