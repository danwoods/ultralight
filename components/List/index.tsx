import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Checkbox from '@material-ui/core/Checkbox'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MUIList from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import { Fragment, useEffect, useState } from 'react'
import { NewItemForm } from './NewItemForm'
import { VictoryPie } from 'victory'
import { useList } from '../../util/useLists'
import { useListItems } from '../../util/useListItems'
import Link from 'next/link'

const sortByOrder = (a, b) => a.order - b.order

const ListItems = ({ items, update, remove }) => {
  return (
    <Fragment>
      {items.map((item) => (
        <ListItem
          key={item._rev}
          style={{ minWidth: 400 }}
          onClick={() => update({ ...item, completed: !item.completed })}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={item.completed}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': item._rev }}
            />
          </ListItemIcon>
          <ListItemText>
            <label id={item._rev}>{item.name}</label>
          </ListItemText>
          <button
            onClick={(e) => {
              e.stopPropagation()
              remove(item)
            }}
          >
            {'remove'}
          </button>
        </ListItem>
      ))}
    </Fragment>
  )
}

export const List = ({
  id,
  titleIsLink,
  projectId
}: {
  id: string
  titleIsLink?: boolean
  projectId?: string
}) => {
  const { data, addItem, removeItem } = useList(id)
  const { data: items, update } = useListItems(data?.items)
  const [showNewItemForm, setShowNewItemForm] = useState(false)
  const [curItems, setCurItems] = useState(null)

  const addNewItem = (name) =>
    addItem(name).then(() => {
      setShowNewItemForm(false)
    })

  // When we add or remove items, the key on the useItems hook changes,
  // resulting in it returning `undefined` for items and causing an odd content
  // flash. This prevents that.
  useEffect(() => {
    if (items) {
      setCurItems(items.filter(Boolean))
    }
  }, [items])
  console.log({ curItems })
  const numOfComplete: number = curItems?.filter((i) => i.completed).length || 0
  const numOfIncomplete: number =
    curItems?.filter((i) => !i.completed).length || 0

  return !data ? null : (
    <Card>
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
          <div
            style={{ width: 24 }}
            title={`${numOfComplete} of ${curItems?.length || 0} done`}
          >
            <VictoryPie
              data={[
                {
                  x: 'a',
                  y: numOfComplete
                },
                { x: 'b', y: numOfIncomplete }
              ]}
            />
          </div>
        }
      />
      <CardContent style={{ paddingTop: 0 }}>
        <MUIList>
          {curItems ? (
            <ListItems
              items={curItems.filter((i) => !i.completed)}
              update={(partial) => update(partial)}
              remove={(item) => removeItem(item)}
            />
          ) : null}
        </MUIList>

        <CardActions>
          <NewItemForm create={addNewItem} />
        </CardActions>
        <MUIList>
          {curItems ? (
            <ListItems
              items={curItems.filter((i) => i.completed)}
              update={(partial) => update(partial)}
              remove={(item) => removeItem(item)}
            />
          ) : null}
        </MUIList>
      </CardContent>
    </Card>
  )
}
