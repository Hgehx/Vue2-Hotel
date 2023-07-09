const db = require('../../db/index')
const jwt = require('jsonwebtoken')
const { secret } = require('../token/key')
const bcryptjs = require('bcryptjs')

// 获取个人信息
exports.getInfo = (req, res) => {
  const token = req.headers.authorization
  const tokenf = token.split(' ').pop()
  const tokenVerify = jwt.verify(tokenf, secret) // aname:  值，可以进行解构数据判断当前是否登录或者用户名是否相同
  const sql = 'select * from user_info where phone=?'
  db.query(sql, tokenVerify.phone, (err, data) => {
    if (err) return res.send('错误：' + err.message)
    if (data.length > 0) {
      return res.send({
        status: 200,
        message: '获取头像成功',
        data: data[0]
      })
    }
    res.send({
      status: 201,
      message: '获取头像失败',
      data: req.body
    })
  })
}

// 修改个人信息
exports.updateInfo = (req, res) => {
  // 更新数据抽出封装
  const updateAdminInfo = (username, phone, email, id) => {
    const sql = 'UPDATE user_info SET username=?, phone=?, email=? WHERE id=?'
    db.query(sql, [username, phone, email, id], (err, data) => {
      if (err) return res.send('错误：' + err.message)
      if (data.affectedRows > 0) {
        return res.send({
          status: 200,
          message: '修改成功'
        })
      }
      res.send({
        status: 201,
        message: '修改失败',
        data: req.body
      })
    })
  }
  const { id, username, phone, email } = req.body
  // id与之对应的phone，这样就能保证虽然提交过来的phone还是之前的也不会判断出重复
  var sqlId = `select * from user_info where id=? and phone=?`
  db.query(sqlId, [id, phone], (err, reaults) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (reaults.length !== 0) {
      updateAdminInfo(username, phone, email, id)
    } else {
      // id和phone不对应了，说明对phone进行修改操作了，在对其他的phone进行查询
      var sqlName = `select * from user_info where phone=?`
      db.query(sqlName, [phone], (err, data) => {
        if (err) {
          return res.send('错误：' + err.message)
        }
        if (data.length === 0) {
          updateAdminInfo(username, phone, email, id)
        } else {
          res.send({
            status: 202,
            message: '该名被占用，请重新输入！'
          })
        }
      })
    }
  })
}

// 更换头像
exports.updateAvatar = (req, res) => {
  const sql = 'update user_info set avatar=? where phone=?'
  db.query(sql, [req.body.avatar, req.body.phone], (err, data) => {
    if (err) return res.send('错误：' + err.message)
    if (data.affectedRows > 0) {
      return res.send({
        status: 200,
        message: '更新图片成功'
      })
    }
    res.send({
      status: 201,
      message: '更新图片失败',
      data: req.body
    })
  })
}

// 修改密码
exports.updatePwd = (req, res) => {
  const token = req.headers.authorization
  const tokenf = token.split(' ').pop()
  const tokenVerify = jwt.verify(tokenf, secret) // phone:  值，可以进行解构数据判断当前是否登录或者用户名是否相同
  const { oldPass, newPass } = req.body
  const sql = 'select * from user_info where phone=?'
  db.query(sql, [tokenVerify.phone], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.length !== 0) {
      // 解密密码和输入的密码进行判断
      let compareResult = bcryptjs.compareSync(oldPass, data[0].password)
      if (compareResult) {
        // 对新密码进行加密
        const hasPwd = bcryptjs.hashSync(newPass, 10)
        const sqlPass = `update user_info set password=? where phone=?`
        db.query(sqlPass, [hasPwd, tokenVerify.phone], (err, reaults) => {
          if (err) {
            return res.send('错误：' + err.message)
          }
          if (reaults.affectedRows > 0) {
            res.send({
              status: 200,
              message: '修改密码成功'
            })
          } else {
            res.send({
              status: 201,
              message: '修改密码失败'
            })
          }
        })
      } else {
        res.send({
          status: 202,
          message: '旧密码不正确，请重新输入'
        })
      }
    }
  })
}

// 获取头像
// 1、在登录到后台主页面请求数据，头像放在header显示
// 2、基本信息修改头像请求数据
exports.getAvatar = (req, res) => {
  const token = req.headers.authorization
  const tokenf = token.split(' ').pop()
  const tokenVerify = jwt.verify(tokenf, secret) // aname:  值，可以进行解构数据判断当前是否登录或者用户名是否相同
  const sql = 'select username,avatar,phone from user_info where phone=?'
  db.query(sql, tokenVerify.phone, (err, data) => {
    if (err) return res.send('错误：' + err.message)
    if (data.length > 0) {
      return res.send({
        status: 200,
        message: '获取头像成功',
        data: data[0]
      })
    }
    res.send({
      status: 201,
      message: '获取头像失败',
      data: req.body
    })
  })
}
