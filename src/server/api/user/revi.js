const db = require('../../db/index')

// 对应用户点评数据
exports.getUserRevi = (req, res) => {
  const sql = 'select * from user_revi where phone=?'
  db.query(sql, req.query.phone, (err, data) => {
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

// 用户点评
exports.insertRevi = (req, res) => {
  const {
    username,
    room_name,
    date,
    phone,
    checkinDate,
    rating,
    comment,
    avatar
  } = req.body
  const sql =
    'insert into revi_management (username,room_name,date,phone,checkinDate,rating,comment,avatar) values (?,?,?,?,?,?,?,?)'
  db.query(
    sql,
    [username, room_name, date, phone, checkinDate, rating, comment, avatar],
    (err, data) => {
      if (err) {
        return res.send('错误：' + err.message)
      }
      if (data.affectedRows > 0) {
        res.send({
          status: 200,
          message: '插入成功'
        })
      } else {
        res.send({
          status: 201,
          message: '插入失败'
        })
      }
    }
  )
}

// 改变点评状态
exports.changeState = (req, res) => {
  const sql = 'update user_revi set state=? where phone=?'
  db.query(sql, [req.body.state, req.body.phone], (err, data) => {
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

// 头像传递给用户点评表
exports.getUserAvatar = (req, res) => {
  const sql = 'select * from user_info where phone=?'
  db.query(sql, [req.query.phone], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.length !== 0) {
      res.send({
        status: 200,
        message: '查询成功',
        avatar: data[0].avatar
      })
    } else {
      res.send({
        status: 201,
        message: '查询失败'
      })
    }
  })
}
