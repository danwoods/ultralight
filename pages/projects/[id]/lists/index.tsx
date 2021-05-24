import * as React from 'react'
import styles from '../../../../styles/Home.module.css'
import { Head } from '../../../../components/Page/Head'
import { List } from '../../../../components/List'
import { NewListForm } from '../../../../components/List/NewListForm'
import {
  db as listsDB,
  useList,
  useLists,
  List as ListType
} from '../../../../util/useLists'
import { useListItems } from '../../../../util/useListItems'
import {
  db as projectDB,
  useProject,
  Project as ProjectType
} from '../../../../util/useProjects'
import { mapDocs } from '../../../../util/mapDocs'
import { db as itemsDB } from '../../../../util/useListItems'
import { logger } from '../../../../util/logger'

export const getServerSideProps = async (context) => {
  const project = await projectDB.get(context.params.id)
  const lists = await listsDB
    .allDocs({
      keys: project.lists,
      include_docs: true
    })
    .then(mapDocs)
  const items = await itemsDB
    .allDocs({
      keys: lists.reduce((acc, cur) => acc.concat(cur.items), []),
      include_docs: true
    })
    .then(mapDocs)
  return {
    props: { project, lists, items }
  }
}

type ListWrapperProps = {
  listId: string
  projectId: string
  remove: () => void
}

const ListWrapper = ({ listId, projectId, remove }: ListWrapperProps) => {
  const log = logger('pages/.../lists/index.js$ListWrapper')
  const { data: list, addItem, removeItem, updateItemOrder } = useList(listId)
  const { data: items } = useListItems(list?.items)

  log.debug('', { listId, list, items })

  return (
    <List
      key={listId + list?._rev}
      titleIsLink={true}
      projectId={projectId}
      list={{
        ...list,
        items
      }}
      remove={remove}
      addItem={addItem}
      removeItem={removeItem}
      updateItemOrder={updateItemOrder}
      style={{ margin: '8px 0' }}
    />
  )
}

const grid = 8

const getItemStyle = (isDragging: boolean, draggableStyle: Object) => ({
  userSelect: 'none',
  background: isDragging ? 'lightgrey' : 'transparent',
  ...draggableStyle
})

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'transparent' : 'transparent',
  padding: grid,
  width: 250
})

export default function Lists({
  project: initialProject,
  lists: initialLists,
  items
}: {
  project: ProjectType
  lists: ListType[]
}): JSX.Element {
  const log = logger('pages/../lists/index.js')
  const { data: project, addList, removeList } = useProject(initialProject.id, {
    initialData: initialProject
  })
  const { data: lists } = useLists(project?.lists, {
    initialData: initialLists
  })

  log.debug('Data', { project, initialProject, lists, initialLists, items })

  return (
    <div className={styles.container}>
      <Head />
      <main className={styles.main}>
        <h1 className={styles.title}>{project?.name}</h1>

        <p className={styles.description}>{'Lists'}</p>

        {(lists || []).map((list) => (
          <ListWrapper
            key={list._rev}
            listId={list._id}
            projectId={project?._id || ''}
            remove={() => removeList(list)}
          />
        ))}

        <NewListForm
          style={{ width: 400 }}
          create={(name, description) => addList(name, description)}
        />
      </main>
    </div>
  )
}
