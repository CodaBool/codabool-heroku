import query from '../../lib/db'

export default async function (req, res) {
  try {
    const result = await query('SELECT * FROM post', [])
    let totalViews = 0
    for (const page in result.rows) {
      console.log(totalViews, ' + ', Number(result.rows[page].views))
      totalViews = totalViews + Number(result.rows[page].views)
    }
    const inReview = await query('SELECT COUNT(*) FROM comment WHERE status=\'review\'', [])
    res.status(200).json({stat: result.rows, inReview: inReview.rows[0].count, totalViews})
  } catch (err) {
    res.status(400).send('General Error Cannot Update Post')
  }
}