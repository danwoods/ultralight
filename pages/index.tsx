/** @file Main index */

import * as React from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { Head, TITLE, DESCRIPTION } from '../components/Page/Head'

/**
 * Main index page
 * @return {JSX.Element} - Default page
 */
const Index = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Head />
      <main className={styles.main}>
        <h1 className={styles.title}>{TITLE}</h1>

        <p className={styles.description}>{DESCRIPTION}</p>

        <div className={styles.grid}>
          <Link href={'/projects'}>{'Go to Projects'}</Link>
        </div>
      </main>
    </div>
  )
}

export default Index
