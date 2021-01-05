import query from '../../lib/db'
import { parseCookies } from 'nookies'

export default async function (req, res) {
  try {
    const cookies = parseCookies({ req })
    if (cookies.admin === 'true') {
      res.status(400).send('Detected Admin User, skipping adding to view')
    } else {
      const result = await query('UPDATE post SET views=views+1 WHERE post_id=$1 RETURNING *', [req.body.post_id])
      res.status(200).json(result.rows[0].views)
    }
  } catch (err) {
    res.status(400).send('General Error Cannot Update Post')
  }
}