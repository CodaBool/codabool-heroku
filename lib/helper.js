import query from './db'
import { dateParsed } from '../constants'

export async function getPostData(id) {
  const post_result = await query('SELECT * FROM post WHERE post_id=$1', [id])
  const comment_result = await query('SELECT * FROM comment WHERE post_id=$1', [id])
  return { post: post_result.rows[0], comments: dateParsed(comment_result.rows) }
}