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
  data: RowsObject<DocType> | DocType[]
): DocType[] {
  if (data?.hasOwnProperty('rows')) {
    return data.rows.map((row: { doc: DocType }) => row.doc)
  } else {
    return data
  }
}
