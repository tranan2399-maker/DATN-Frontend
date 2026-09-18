import { TDate } from 'timeago.js'

export interface MyObjectComment {
  id?: number
  _id?: string
  content: string
  like: string[]
  comments: MyObjectComment[]
  userId?: {
    name: string
    avatar: string
    _id: string
  }
  createdAt?: TDate
}

const useNode = () => {
  const insertNode = (
    tree: MyObjectComment,
    commentId: string,
    like: string[],
    item: string
  ): MyObjectComment => {
    if (tree._id == commentId) {
      tree.comments.push({
        id: new Date().getTime(),
        content: item,
        comments: [],
        like: like
      })
      return tree
    }
    let latestNode = []
    latestNode = tree?.comments?.map((ob: MyObjectComment) => {
      return insertNode(ob, commentId, like, item)
    })
    return { ...tree, comments: latestNode }
  }
  const editNode = (
    tree: MyObjectComment,
    commentId: string,
    like: string[],
    value: string
  ): MyObjectComment => {
    if (tree._id === commentId) {
      tree.content = value
      tree.like = like
      return tree
    }

    tree.comments.map((ob) => {
      return editNode(ob, commentId, like, value)
    })

    return { ...tree }
  }

  return {
    insertNode,
    editNode
  }
}
export default useNode
