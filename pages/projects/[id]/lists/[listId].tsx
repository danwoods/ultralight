import Image from 'next/image'

import styles from '../../../../styles/Home.module.css'
import { Head } from '../../../../components/Page/Head'
import { List } from '../../../../components/List'
import { db as itemDB } from '../../../../util/useListItems'
import { db as listDB, useList } from '../../../../util/useLists'
import { logger } from '../../../../util/logger'
import { mapDocs } from '../../../../util/mapDocs'

const log = logger('pages/.../lists/[listId].tsx')

export const getServerSideProps = async (context) => {
  const list = await listDB.get(context.params.listId)
  const items = await itemDB
    .allDocs({
      keys: list.items,
      include_docs: true
    })
    .then(mapDocs)

  return {
    props: { list: { ...list, items }, projectId: context.params.id }
  }
}

export default function ListComp({ listId, projectId, list }) {
  // const { data } = useList(listId)
  log.debug('Props', { listId, projectId, list })
  return (
    <div className={styles.container}>
      <Head />

      <main className={styles.main}>
        <div>
          <List id={listId} projectId={projectId} list={list} />
        </div>
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
