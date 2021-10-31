/** @file Main landing page; returns a list of projects */

import * as React from 'react'
import styles from '../../styles/Home.module.css'
import { Head, TITLE, DESCRIPTION } from '../../components/Page/Head'
import { db as projectDB, useProjects, Project } from '../../util/useProjects'

/** Load data on request */
export const getServerSideProps = async () => {
  const projects = await projectDB.allDocs({ include_docs: true })

  return {
    props: {
      projects: projects.rows.map((r: { doc?: Object }) => r.doc)
    }
  }
}

/**
 * Project listing page
 * @param {Object} props - Component properties
 * @param {Object[]} props.projects - Initial array of Projects
 * @return {JSX.Element} - List (grid) of Projects
 */
const Projects = ({ projects }: { projects: Project[] }): JSX.Element => {
  const { data, add, remove } = useProjects({ initialData: projects })

  return (
    <div className={styles.container}>
      <Head />
      <main className={styles.main}>
        <h1 className={styles.title}>{TITLE}</h1>

        <p className={styles.description}>{DESCRIPTION}</p>

        <div className={styles.grid}>
          {(data || []).map((project: Project) => (
            <a href={`/projects/${project._id}`} className={styles.card}>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  remove(project._id)
                }}
              >
                {'remove'}
              </button>
            </a>
          ))}
        </div>
				{ /* @ts-ignore */ }
        <button onClick={() => add('Project ' + data.length)}>
          {'New Project'}
        </button>
      </main>
    </div>
  )
}

export default Projects
