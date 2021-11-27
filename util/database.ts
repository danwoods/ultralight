import '../components/Auth/init'
import { getFirestore } from 'firebase/firestore'

const db = getFirestore()

import { collection, addDoc } from 'firebase/firestore'

try {
  addDoc(collection(db, 'users'), {
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id)
    })
    .catch((error) => {
      console.error('Error adding document: ', error)
    })
} catch (e) {
  console.error('Error adding document: ', e)
}
