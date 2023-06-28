const db = require('../../db/index')
// 预定信息管理
// 查询预定信息数据表
// exports.resvInfo = (req, res) => {
//   const sql = 'select * from resv_management'
//   db.query(sql, (err, data) => {
//     if (err) {
//       return res.send('错误：' + err.message)
//     }
//     res.send({
//       status: 200,
//       message: '请求预定信息成功',
//       data: data
//     })
//   })
// }

// 分页查询信息
exports.resvInfo = (req, res) => {
  const sql = `select *  from resv_management limit ?,?`
  const sq2 = `select count(*) as total from resv_management`
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

// 修改信息
exports.resvUpdate = (req, res) => {
  const sql = 'update resv_management set ? where id=?'
  db.query(sql, [req.body, req.body.id], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.affectedRows > 0) {
      res.send({
        status: 200,
        message: '修改数据成功'
      })
    } else {
      res.send({
        status: 201,
        message: '修改数据失败'
      })
    }
  })
}

// 新增数据
exports.resvAdd = (req, res) => {
  const { username, room_name, price, phone, date } = req.body
  const sql =
    'insert into resv_management (username,room_name,price,phone,date) values (?,?,?,?,?)'
  db.query(sql, [username, room_name, price, phone, date], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.affectedRows > 0) {
      res.send({
        status: 200,
        message: '新增预定数据成功'
      })
    } else {
      res.send({
        status: 201,
        message: '新增预定数据失败'
      })
    }
  })
}

// 删除数据
exports.resvDel = (req, res) => {
  const sql = 'delete from resv_management where id=?'
  db.query(sql, req.query.id, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.affectedRows > 0) {
      res.send({
        status: 200,
        message: '删除成功'
      })
    } else {
      res.send({
        status: 201,
        message: '删除失败'
      })
    }
  })
}

// 查询指定客户信息
exports.resvUser = (req, res) => {
  const sql = 'select * from resv_management where username=?'
  db.query(sql, req.query.username, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.length !== 0) {
      res.send({
        status: 200,
        message: '查询成功',
        data
      })
    } else {
      res.send({
        status: 201,
        message: '查询失败'
      })
    }
  })
}
