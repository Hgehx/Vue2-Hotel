const db = require('../../db/index')

// 分页获取客房信息
exports.roomInfo = (req, res) => {
  const sql = `select *  from room_management limit ?,?`
  const sq2 = `select count(*) as total from room_management`
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

// 获取id指定客房信息
exports.roomId = (req, res) => {
  const sql = 'select * from room_management where id=?'
  db.query(sql, req.query.id, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.length > 0) {
      res.send({
        status: 200,
        message: '查询指定客房信息成功',
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

// 修改客房信息
exports.updateRoom = (req, res) => {
  const { id, ...data } = req.body
  const sql = 'update room_management set ? where id=?'
  db.query(sql, [data, id], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.affectedRows > 0) {
      res.send({
        status: 200,
        message: '修改客房信息成功',
        data
      })
    } else {
      res.send({
        status: 201,
        message: '修改客房信息失败'
      })
    }
  })
}

// 新增客房信息
exports.addRoom = (req, res) => {
  const { ...data } = req.body
  const sql = 'insert into room_management set ?'
  db.query(sql, data, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.affectedRows > 0) {
      res.send({
        status: 200,
        message: '新增客房成功',
        data
      })
    } else {
      res.send({
        status: 201,
        message: '新增客房失败'
      })
    }
  })
}

// 删除客房信息
exports.delRoom = (req, res) => {
  const sql = 'delete from room_management where id=?'
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

// 获取指定id客房介绍
exports.idMore = (req, res) => {
  const sql = 'select * from room_moreintroduction where room_id=?'
  db.query(sql, req.query.room_id, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.length > 0) {
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

// 添加更多客房介绍
exports.addMore = (req, res) => {
  const { ...data } = req.body
  const sql = 'insert into room_moreintroduction set ?'
  db.query(sql, data, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.affectedRows > 0) {
      res.send({
        status: 200,
        message: '新增成功'
      })
    } else {
      res.send({
        status: 201,
        message: '新增失败',
        err
      })
    }
  })
}

// 修改介绍
exports.updateMore = (req, res) => {
  const { room_id, ...data } = req.body
  const sql = 'update room_moreintroduction set ? where room_id=?'
  db.query(sql, [data, room_id], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.affectedRows > 0) {
      res.send({
        status: 200,
        message: '修改成功',
        data
      })
    } else {
      res.send({
        status: 201,
        message: '修改失败',
        err
      })
    }
  })
}

// 对客房数量++  管理员退房操作
exports.updateNumadd = (req, res) => {
  const { room_name, operation } = req.body
  let sql
  if (operation === 'add') {
    sql =
      'UPDATE room_management SET room_num = room_num + 1 WHERE room_name = ?'
  } else if (operation === 'reduce') {
    sql =
      'UPDATE room_management SET room_num = room_num - 1 WHERE room_name = ?'
  }

  db.query(sql, room_name, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.affectedRows > 0) {
      res.send({
        status: 200,
        message: '修改成功'
      })
    } else {
      res.send({
        status: 201,
        message: '修改失败',
        err
      })
    }
  })
}
