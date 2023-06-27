const db = require('../db/index')

// 测试服务器请求mysql数据
exports.info = (req, res) => {
  let sql = `select * from user_info`
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}

// 用户登录
exports.login = (req, res) => {
  var sql = 'select * from user where username=?'
  db.query(sql, [req.query.username], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }

    if (data.length !== 1) {
      res.send({
        status: 202,
        message: '账号或密码错误'
      })
    } else {
      if (data[0].password === req.query.password) {
        res.send({
          status: 200,
          message: '登录成功'
        })
      } else {
        res.send({
          status: 202,
          message: '账号或密码错误'
        })
      }
    }
  })
}

// 用户注册
exports.register = (req, res) => {
  let userinfo = req.body

  var sqlUser = `select * from user where username=?`
  db.query(sqlUser, [userinfo.username], (err, reaults) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (reaults.length === 0) {
      var sql = 'insert into user (username,password) values (?,?)'
      db.query(sql, [userinfo.username, userinfo.password], (err, data) => {
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
            message: '插入数据失败'
          })
        }
      })
    } else {
      res.send({
        status: 202,
        message: '用户名重复'
      })
    }
  })
}

// 更新用户密码
exports.updatePwd = (req, res) => {
  const info = req.body
  const sql = 'update user set password=? where id=?'
  db.query(sql, [info.password, info.id], (err, data) => {
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
        message: '更新密码失败'
      })
    }
  })
}

// 删除用户
exports.deluser = (req, res) => {
  const sql = 'DELETE FROM user WHERE id = ?;'
  db.query(sql, req.body.id, (err, data) => {
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
        message: '更新密码失败'
      })
    }
  })
}
