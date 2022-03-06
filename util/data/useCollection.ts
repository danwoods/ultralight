/** @file Hook for working with Google FireStore Collections */

import '../../components/Auth/init'
import { getFirestore } from 'firebase/firestore'
import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  addDoc,
  getDocs,
  onSnapshot,
  updateDoc
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { log } from '../logger'

/**
 * Document reference to Object with doc data and ID
 * @param doc Document reference
 * @returns Doc data + 'id' property
 */
const mapDocs = <Data extends DocumentData>(
  doc: DocumentSnapshot<Data>
): Data & { id: string } => {
  const data = doc.data()

  // @ts-ignore
  return {
    id: doc.id,
    ...data
  }
}

type UseCollectionReturnValue<CollectionData> = {
  data: CollectionData[]
  add: (arg0: Omit<CollectionData, 'id'>) => Promise<CollectionData>
  edit: (arg0: CollectionData) => Promise<CollectionData>
  remove: (arg0: string) => Promise<void>
}

/**
 * Hook to work with Google FireStore Collections
 * @param {Object} config Config object for useSWR
 * @returns {Object} {data: Projects[], add: name => Promise, remove: id => Promise}
 */
export const useCollection = <CollectionData extends DocumentData>(
  id: string | null | undefined
): UseCollectionReturnValue<CollectionData> => {
  // Data /////////////////////////////////////////////////////////////////////

  const [documents, setDocuments] = useState<CollectionData[]>([])
  const [flipBit, setFlipBit] = useState(false)

  // Load data when db ID changes
  useEffect(() => {
    if (id) {
      const db = getFirestore()

      try {
        getDocs(collection(db, id))
          .then((snapshot) => {
            log.debug('Snapshot', snapshot)

            const docs: QueryDocumentSnapshot<CollectionData>[] = []

            snapshot.forEach((doc) => {
              // @ts-ignore
              docs.push(doc)
            })

            setDocuments(
              docs
                .map((d) => mapDocs<CollectionData>(d))
                .filter((d) => !d.isDeleted)
            )
          })
          .catch((error) => {
            log.error('Error adding document: ', error)
          })
      } catch (e) {
        log.error('Error adding document: ', e)
      }
    }
  }, [id, flipBit])

  // Listen to changes in data
  useEffect(() => {
    const db = getFirestore()

    const unlistenArray =
      (id &&
        documents.map((document) => {
          return onSnapshot(doc(db, id, document.id), (doc) => {
            log.debug('Current data: ', doc.data(), doc)
            const data = doc.data()
            if (typeof data === 'undefined') {
              setDocuments(documents.filter((d) => d.id !== doc.id))
            } else {
              setDocuments(
                documents.map((d) => {
                  if (d.id === doc.id) {
                    return {
                      ...d,
                      ...data
                    }
                  }
                  return d
                })
              )
            }
          })
        })) ||
      []

    return () => {
      unlistenArray.forEach((unlisten) => unlisten())
    }
  }, [id, documents.map((doc) => doc.id).join('+')])

  // Add //////////////////////////////////////////////////////////////////////

  /**
   * Add an item to a collection
   * @param {Object} newDoc Document to add
   * @returns {Promise<DocumentReference<CollectionData>>}
   */
  const add = (
    newDoc: Omit<CollectionData, 'id'>
  ): ReturnType<typeof addDoc> => {
    if (id) {
      const db = getFirestore()
      return addDoc(collection(db, id), newDoc).then((doc) => {
        setFlipBit(!flipBit)
        return doc
      })
    } else {
      const er = new Error('TRYING_TO_ADD_WITHOUT_ID')
      // @ts-ignore
      er.doc = newDoc
      throw er
    }
  }

  // Edit ///////////////////////////////////////////////////////////////////

  /**
   * Edit an item in a collection
   * @param {string} docId Document ID to remove
   * @returns {Promise<undefined>}
   */
  // @ts-ignore
  const edit = (updatedDoc) => {
    const db = getFirestore()
    // @ts-ignore
    return updateDoc(doc(db, id, updatedDoc.id), updatedDoc).then(() => {
      setFlipBit(!flipBit)
    })
  }

  // Remove ///////////////////////////////////////////////////////////////////

  /**
   * Remove an item from a collection
   * @param {string} docId Document ID to remove
   * @returns {Promise<undefined>}
   */
  const remove = (docId: string) => {
    const db = getFirestore()
    // @ts-ignore
    return updateDoc(doc(db, id, docId), { isDeleted: true }).then(() => {
      setFlipBit(!flipBit)
    })
  }

  return {
    data: documents,
    // @ts-ignore
    add,
    // @ts-ignore
    edit,
    remove
  }
}
