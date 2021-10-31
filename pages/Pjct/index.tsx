import React, { useEffect, useState } from 'react'
import '../../components/Auth/init'
import { getFirestore } from 'firebase/firestore'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import { useProjects } from '../../util/data/useProjects'

// import '../../util/database'

export const Pjct = () => {
  const { data: projects } = useProjects()
  // useEffect(() => {
  //   const db = getFirestore()

  //   try {
  //     addDoc(collection(db, 'Projects'), {
  //       first: 'Ada',
  //       last: 'Lovelace',
  //       born: 1815
  //     })
  //       .then((docRef) => {
  //         console.log('Document written with ID: ', docRef.id)
  //       })
  //       .catch((error) => {
  //         console.error('Error adding document: ', error)
  //       })
  //   } catch (e) {
  //     console.error('Error adding document: ', e)
  //   }
  // }, [])

  // useEffect(() => {
  //   const db = getFirestore()

  //   try {
  //     getDocs(collection(db, 'Projects'))
  //       .then((snapshot) => {
  //         console.log('Snapshot', snapshot)
  //         const pjts = []
  //         snapshot.forEach((doc) => {
  //           // doc.data() is never undefined for query doc snapshots
  //           console.log(doc.id, ' => ', doc.data())
  //           pjts.push({ id: doc.id, ...doc.data() })
  //         })
  //         setProjects(pjts)
  //       })
  //       .catch((error) => {
  //         console.error('Error adding document: ', error)
  //       })
  //   } catch (e) {
  //     console.error('Error adding document: ', e)
  //   }
  // }, [])

  return (
    <div>
      {'Projects V2'}
      <ol>
        {projects.map((p) => (
          // @ts-ignore
          <li key={p.id}>
            {/* @ts-ignore */}
            <Link href={`/projects/${p.id}`}>
              <a>{p.name}</a>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Pjct
