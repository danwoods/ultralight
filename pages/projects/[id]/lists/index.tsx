import * as React from 'react'
import Image from 'next/image'
import styles from '../../../../styles/Home.module.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Head } from '../../../../components/Page/Head'
import { List } from '../../../../components/List'
import { NewListForm } from '../../../../components/List/NewListForm'
import {
  db as listsDB,
  useLists,
  List as ListType
} from '../../../../util/useLists'
import {
  db as projectDB,
  useProject,
  Project as ProjectType
} from '../../../../util/useProjects'
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
  lists: initialLists
}: {
  project: ProjectType
  lists: ListType[]
}): JSX.Element {
  const { data: project, addList } = useProject(initialProject.id, {
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

        <DragDropContext onDragEnd={console.log}>
          <Droppable droppableId={project?._id + '/list'}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {(lists || []).map((list, idx) => (
                  <Draggable key={list._rev} draggableId={list._id} index={idx}>
                    {(provided, snapshot) => (
                      <List
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={list._rev}
                        id={list._id}
                        titleIsLink={true}
                        projectId={project?._id}
                      />
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <NewListForm
          create={(name, description) => addList(name, description)}
        />
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
