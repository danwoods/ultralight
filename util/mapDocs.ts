/** @file Mapping function for documents returned from couchDB */

interface RowsObject<DocType> {
  rows: { doc: DocType }[]
}

/**
 * Get documents from couchDB response
 * @param {Object | Object[]} data couchDB response
 * @returns Object[]
 */
export function mapDocs<DocType>(
  // @ts-ignore
  data: RowsObject<DocType> | DocType[]
): DocType[] {
  if (data.hasOwnProperty('rows')) {
    // @ts-ignore
    return data.rows.map((row: { doc: DocType }) => row.doc)
  } else {
    // @ts-ignore
    return data
  }
}
