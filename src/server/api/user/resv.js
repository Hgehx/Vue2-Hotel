const db = require('../../db/index')

// 查询预定信息数据表
exports.resvInfo = (req, res) => {
  const sql = 'select * from resv_management where phone=?'
  db.query(sql, req.query.phone, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send({
      status: 200,
      message: '请求预定信息成功',
      data: data
    })
  })
}

// 改变state状态
exports.stateChange = (req, res) => {
  const info = req.body
  const sql = 'update resv_management set state=? where phone=? and date=?'
  db.query(sql, [info.state, info.phone, info.date], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.affectedRows > 0) {
      res.send({
        status: 200,
        message: 'success'
      })
    } else {
      res.send({
        status: 202,
        message: '失败'
      })
    }
  })
}
