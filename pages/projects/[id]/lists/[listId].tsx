import Image from 'next/image'
import styles from '../../../../styles/Home.module.css'
import { List } from '../../../../components/List'
import { useList } from '../../../../util/useLists'
import { Head } from '../../../../components/Page/Head'

const TITLE = 'Ultralight'
const DESCRIPTION = 'Simple Project Management'

export const getServerSideProps = (context) => {
  return {
    props: { listId: context.params.listId }
  }
}

export default function ListComp({ listId }) {
  // const { data } = useList(listId)
  console.log({ listId })
  return (
    <div className={styles.container}>
      <Head />

      <main className={styles.main}>
        <div>
          <List id={listId} />
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
