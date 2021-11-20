/** @file Main index */

import * as React from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { Head, TITLE, DESCRIPTION } from '../components/Page/Head'

import '../components/Auth/init'

/**
 * Main index page
 * @return {JSX.Element} - Default page
 */
const Index = (): JSX.Element => {
  return (
    <>
      <Head />
      <h1 className={styles.title}>{TITLE}</h1>

      <p className={styles.description}>{DESCRIPTION}</p>
    </>
  )
}

export default Index
