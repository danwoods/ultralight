/** @file Single Project */

import Link from 'next/link'
import styles from '../../../styles/Home.module.css'
import { Head } from '../../../components/Page/Head'
import {
  db as projectDB,
  Project as ProjectType
} from '../../../util/useProjects'

/** Get data on request */
export const getServerSideProps = async (context: {
  params: { id: string }
}) => {
  const project = await projectDB.get(context.params.id)
  return {
    props: { project }
  }
}

/**
 * Display for a single Project
 * @param {Object} props Component properties
 * @param {Object} props.project Project
 * @returns {JSX.Element} Project
 */
export default function Project({ project }: { project: ProjectType }) {
  return (
    <div className={styles.container}>
      <Head />

      <main className={styles.main}>
        <h1 className={styles.title}>{project.name}</h1>
        <div className={styles.grid}>
          <a href={'/.'} className={styles.card}>
            <h2>Docs &rarr;</h2>
            <p>Related documents and links</p>
          </a>

          <Link href={`/projects/${project._id}/lists`}>
            <a className={styles.card}>
              <h2>Lists &rarr;</h2>
              <p>Grouped Tasks</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  )
}
