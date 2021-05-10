/** @file Database Utilities */

import PouchDB from 'pouchdb'

export interface DBDocument {
  _id: string
  _rev: string
  _deleted: boolean
}

/**
 * Get Database connection
 * @param {string} dbId Database
 * @returns Database connection
 */
export function getDB<Type>(dbId: string): PouchDB.Database<Type> {
  return new PouchDB(`${process.env.NEXT_PUBLIC_DATABASE_URL}${dbId}`, {
    auth: {
      username: process.env.NEXT_PUBLIC_DATABASE_USER,
      password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD
    }
  })
}
