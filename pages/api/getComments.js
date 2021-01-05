import query from '../../lib/db'
import { parseCookies } from 'nookies'

export default async function (req, res) {
  try {
    let result
    const cookies = parseCookies({ req })
    if (cookies.admin === 'true') {
      result = await query('SELECT * FROM comment WHERE post_id=$1',
        [req.query[0]]
      )
    } else {
      result = await query('SELECT * FROM comment WHERE post_id=$1 AND status=\'approved\'',
        [req.query[0]]
      )
    }
    const inReview = await query('SELECT COUNT(*) FROM comment WHERE post_id=$1 AND status=\'review\'',
      [req.query[0]]
    )
    if (result.err) {
      res.status(400).send(result.err)
    } else {
      res.status(200).json({ comments: result.rows, inReview: inReview.rows.length})
    }
  } catch (err) {
    res.status(400).send('General Error Cannot Post Comment')
  }
}