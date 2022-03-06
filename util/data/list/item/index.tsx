/** @file Utilities for working with a list item */

/** Interface for a List Item */
export interface ListItem {
  createdAt: number
  id: string
  isComplete: boolean
  isDeleted: boolean
  name: string
  sortOrder: number
  parentId: string
}

/**
 * Fill in missing properties of a ListItem
 * @param item Partial of a ListItem
 * @returns {Omit<ListItem, 'id'>} ListItem without ID
 */
export const createItem = (
  item: Partial<ListItem> = {}
): Omit<ListItem, 'id'> => ({
  createdAt: item.createdAt || Date.now(),
  isComplete: item.isComplete || false,
  isDeleted: item.isDeleted || false,
  name: item.name || '',
  sortOrder: item.sortOrder || 0,
  parentId: item.parentId || ''
})

const classes = {
  root: `
    flex
    justify-start
    cursor-pointer
    text-gray-700
    hover:text-blue-400
    hover:bg-blue-100
    rounded-md
    px-2
    py-2
    my-2
  `,
  label: `
    px-2
    cursor-pointer
  `
}

type Props = {
  onDelete: () => any
  onComplete: (isComplete: boolean) => any
  Item: ListItem
}

/**
 * Single List Item
 * @param props Component properties
 * @returns {JSX.Element}
 */
// @ts-ignore
export const Item = ({ Item = createItem(), onComplete }: Props) => {
  return (
    <li className={classes.root}>
      <input
        type={'checkbox'}
        id={`listItem_${Item.id}_isComplete_input`}
        name={`listItem_${Item.id}_isComplete_input`}
        title={`Mark item "${Item.name}" ${
          Item.isComplete ? 'undone' : 'done'
        }`}
        onClick={() => onComplete(!Item.isComplete)}
        checked={Item.isComplete}
      />
      <span className={classes.label}>{Item.name}</span>
    </li>
  )
}
