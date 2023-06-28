const db = require('../../db/index')
const jwt = require('jsonwebtoken')
const { secret } = require('../token/key')
const bcryptjs = require('bcryptjs')

// 管理员登录
exports.login = (req, res) => {
  const { aname, password } = req.query
  var sql = 'select * from admin_info where aname=?'
  db.query(sql, [aname], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }

    if (data.length !== 1) {
      res.send({
        status: 202,
        message: '账号或密码错误'
      })
    } else {
      let compareResult = bcryptjs.compareSync(password, data[0].password)
      if (compareResult) {
        // token设置
        const token =
          'Bearer ' + jwt.sign({ aname }, secret, { expiresIn: '24h' })
        // const tokenf = token.split(' ').pop()
        // const tokenVerify = jwt.verify(tokenf, secret) // aname:  值，可以进行解构数据判断当前是否登录或者用户名是否相同
        res.send({
          status: 200,
          message: '登录成功',
          token: token
          // tokenVerify
        })
      } else {
        res.send({
          status: 202,
          message: '用户名不存在，请先注册'
        })
      }
    }
  })
}

// 管理员注册
// 判断数据库当中是否存在相同的管理员名，如果重复提示错误
exports.register = (req, res) => {
  let { aname, password } = req.body
  let hasPwd = bcryptjs.hashSync(password, 10)
  // 加密数据
  var sqlUser = `select * from admin_info where aname=?`
  db.query(sqlUser, [aname], (err, reaults) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (reaults.length === 0) {
      var sql = 'insert into admin_info (aname,password) values (?,?)'
      db.query(sql, [aname, hasPwd], (err, data) => {
        if (err) {
          return res.send('错误：' + err.message)
        }
        if (data.affectedRows > 0) {
          res.send({
            status: 200,
            message: '注册管理员成功'
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
        message: '管理员名重复'
      })
    }
  })
}
