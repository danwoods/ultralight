/** @file Hooks for working with Google FireStore Collections */
import '../../components/Auth/init'
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

interface Document {
  id: string
}

/**
 * Hook to work with Google FireStore Collections
 * @param {Object} config Config object for useSWR
 * @returns {Object} {data: Projects[], add: name => Promise, remove: id => Promise}
 */
export const useCollection = <CollectionData extends Document>(
  id: string | null | undefined
): { data: CollectionData[] } => {
  const [documents, setDocuments] = useState<CollectionData[]>([])

  useEffect(() => {
    if (id) {
      const db = getFirestore()

      try {
        getDocs(collection(db, id))
          .then((snapshot) => {
            console.log('Snapshot', snapshot)
            // @ts-ignore
            const docs: CollectionData[] = []
            snapshot.forEach((doc) => {
              // @ts-ignore
              docs.push({ id: doc.id, ...doc.data() })
            })
            setDocuments(docs)
          })
          .catch((error) => {
            console.error('Error adding document: ', error)
          })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    }
  }, [id])

  return {
    data: documents
  }
}
