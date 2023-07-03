const db = require('../../db/index')

// 分页查询信息
exports.reviInfo = (req, res) => {
  const sql = `select *  from revi_management limit ?,?`
  const sq2 = `select count(*) as total from revi_management`
  db.query(
    sql,
    [
      (req.query.pagenum - 1) * req.query.pagesize,
      parseInt(req.query.pagesize)
    ],
    (err, results) => {
      if (err) return res.send('错误：' + err.message)
      db.query(sq2, (err, totalresults) => {
        if (err) return res.send('错误：' + err.message)
        res.send({
          status: 200,
          message: '获取客户信息成功',
          data: results,
          total: totalresults[0].total //数据总条数
        })
      })
    }
  )
}

// 酒店回复
exports.reviUpdate = (req, res) => {
  const sql = 'update revi_management set admin_reply=? where id=?'
  db.query(sql, [req.body.admin_reply, req.body.id], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.affectedRows > 0) {
      res.send({
        status: 200,
        message: '回复成功'
      })
    } else {
      res.send({
        status: 201,
        message: '回复失败'
      })
    }
  })
}
