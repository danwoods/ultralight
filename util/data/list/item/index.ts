/** @file Utilities for working with a list item */

/** Interface for a List Item */
export interface ListItem {
  createdAt: number
  id: string
  isComplete: boolean
  isDeleted: boolean
  name: string
  sortOrder: number
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
  sortOrder: item.sortOrder || 0
})
