/** @file List component */

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import Link from 'next/link'
import MUIList from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import { CompletedPieChart } from './CompletedPieChart'
import { Items } from './Items'
import { NewItemForm } from './NewItemForm'
import { forwardRef, useEffect, useState } from 'react'
import { useList } from '../../util/useLists'
import { useListItems } from '../../util/useListItems'
import { useProject } from '../../util/useProjects'
import { EditMenu } from './EditMenu'
import { useRouter } from 'next/router'

/**
 * List
 */
export const List = forwardRef(
  (
    {
      id,
      titleIsLink,
      projectId
    }: {
      id: string
      titleIsLink?: boolean
      projectId?: string
    },
    ref
  ) => {
		// @ts-ignore
    const { removeList } = useProject(projectId)
    const { data, addItem, removeItem, updateItemOrder } = useList(id)
		// @ts-ignore
    const { data: items, update } = useListItems(data?.items)
    const router = useRouter()
    const [curItems, setCurItems] = useState(null)

		// @ts-ignore
    const addNewItem = (name) => addItem(name)

    // When we add or remove items, the key on the useItems hook changes,
    // resulting in it returning `undefined` for items and causing an odd content
    // flash. This prevents that.
    useEffect(() => {
      if (items) {
		// @ts-ignore
        setCurItems(items.filter(Boolean))
      }
    }, [items])

		// @ts-ignore
    const complete = curItems?.filter((i) => i.completed) || []
		// @ts-ignore
    const incomplete = curItems?.filter((i) => !i.completed) || []
    const numOfComplete: number = complete.length
    const numOfIncomplete: number = incomplete.length

    return !data ? null : (
      <Card ref={ref}>
        <CardHeader
          style={{ paddingBottom: 0 }}
          title={
            titleIsLink ? (
              <Link href={`/projects/${projectId}/lists/${id}`} passHref={true}>
                <a title={data.name}>
                  <Typography variant="h5" component="h3">
                    {data.name}
                  </Typography>
                </a>
              </Link>
            ) : (
              <Typography variant="h5" component="h3">
                {data.name}
              </Typography>
            )
          }
          avatar={
            <div style={{ width: 48, display: 'flex', alignItems: 'baseline' }}>
              <DragIndicatorIcon />
              <CompletedPieChart
                numOfComplete={numOfComplete}
                numOfIncomplete={numOfIncomplete}
              />
            </div>
          }
          action={
            titleIsLink ? null : (
              <EditMenu
                listId={id}
                remove={() => {
                  removeList(data)
                    .then(() => router.push(`/projects/${projectId}/lists`))
                    .catch(console.error)
                  //
                }}
              />
            )
          }
        />
        <CardContent style={{ paddingTop: 0 }}>
					{ /* @ts-ignore */ }
          <MUIList key={complete.map((c) => c._id).join('/')}>
            {curItems ? (
              <Items
								// @ts-ignore
                items={curItems.filter((i) => !i.completed)}
                update={(partial) => update(partial)}
                updateItemOrder={(newOrder: string[]) =>
                  updateItemOrder(newOrder)
                }
                remove={(item) => removeItem(item)}
              />
            ) : null}
          </MUIList>

          <CardActions>
            <NewItemForm create={addNewItem} />
          </CardActions>
					{ /* @ts-ignore */ }
          <MUIList key={incomplete.map((c) => c._id).join('/')}>
            {curItems ? (
              <Items
								// @ts-ignore
                items={curItems.filter((i) => i.completed)}
                update={(partial) => update(partial)}
                updateItemOrder={(newOrder: string[]) =>
                  updateItemOrder(newOrder)
                }
                remove={(item) => removeItem(item)}
              />
            ) : null}
          </MUIList>
        </CardContent>
      </Card>
    )
  }
)
