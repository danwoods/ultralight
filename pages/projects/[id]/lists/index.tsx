import { Head } from '../../../../components/Page/Head'
import Image from 'next/image'
import styles from '../../../../styles/Home.module.css'
import { List } from '../../../../components/List'
import * as React from 'react'
import {
  db as projectDB,
  useProject,
  Project as ProjectType
} from '../../../../util/useProjects'
import {
  db as listsDB,
  useLists,
  List as ListType
} from '../../../../util/useLists'
import { mapDocs } from '../../../../util/mapDocs'

export const getServerSideProps = async (context) => {
  const project = await projectDB.get(context.params.id)
  const lists = await listsDB
    .allDocs({
      keys: project.lists,
      include_docs: true
    })
    .then(mapDocs)

  return {
    props: { project, lists }
  }
}

export default function Lists({
  project: initialProject,
  lists: initialLists
}: {
  project: ProjectType
  lists: ListType[]
}): JSX.Element {
  const { data: project } = useProject(initialProject.id, {
    initialData: initialProject
  })
  const { data: lists } = useLists(project?.lists, {
    initialData: initialLists
  })

  return (
    <div className={styles.container}>
      <Head />
      <main className={styles.main}>
        <h1 className={styles.title}>{project?.name}</h1>

        <p className={styles.description}>{'Lists'}</p>

        {(lists || []).map((list) => (
          <div className={styles.grid} key={list._rev}>
            <div>
              <List id={list._id} titleIsLink={true} projectId={project?._id} />
            </div>
            <button>{'Add List'}</button>
          </div>
        ))}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
