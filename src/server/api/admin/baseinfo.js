const db = require('../../db/index')
const jwt = require('jsonwebtoken')
const { secret } = require('../token/key')
const bcryptjs = require('bcryptjs')

// 获取个人信息
exports.getInfo = (req, res) => {
  const token = req.headers.authorization
  const tokenf = token.split(' ').pop()
  const tokenVerify = jwt.verify(tokenf, secret) // aname:  值，可以进行解构数据判断当前是否登录或者用户名是否相同
  const sql = 'select * from admin_info where aname=?'
  db.query(sql, tokenVerify.aname, (err, data) => {
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
  const updateAdminInfo = (aname, phone, email, id) => {
    const sql = 'UPDATE admin_info SET aname=?, phone=?, email=? WHERE id=?'
    db.query(sql, [aname, phone, email, id], (err, data) => {
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

  const { id, aname, phone, email } = req.body
  // id与之对应的aname，这样就能保证虽然提交过来的aname还是之前的也不会判断出重复名字
  var sqlId = `select * from admin_info where id=? and aname=?`
  db.query(sqlId, [id, aname], (err, reaults) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (reaults.length !== 0) {
      updateAdminInfo(aname, phone, email, id)
    } else {
      // id和aname不对应了，说明对aname进行修改操作了，在对其他的aname进行查询
      var sqlName = `select * from admin_info where aname=?`
      db.query(sqlName, aname, (err, data) => {
        if (err) {
          return res.send('错误：' + err.message)
        }
        if (data.length === 0) {
          updateAdminInfo(aname, phone, email, id)
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
  const sql = 'update admin_info set avatar=? where aname=?'
  db.query(sql, [req.body.avatar, req.body.aname], (err, data) => {
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

// 获取头像
// 1、在登录到后台主页面请求数据，头像放在header显示
// 2、基本信息修改头像请求数据
exports.getAvatar = (req, res) => {
  const token = req.headers.authorization
  const tokenf = token.split(' ').pop()
  const tokenVerify = jwt.verify(tokenf, secret) // aname:  值，可以进行解构数据判断当前是否登录或者用户名是否相同
  const sql = 'select aname,avatar from admin_info where aname=?'
  db.query(sql, tokenVerify.aname, (err, data) => {
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

// 修改密码
exports.updatePwd = (req, res) => {
  const token = req.headers.authorization
  const tokenf = token.split(' ').pop()
  const tokenVerify = jwt.verify(tokenf, secret) // aname:  值，可以进行解构数据判断当前是否登录或者用户名是否相同
  const { oldPass, newPass } = req.body
  const sql = 'select * from admin_info where aname=?'
  db.query(sql, [tokenVerify.aname], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.length !== 0) {
      // 解密密码和输入的密码进行判断
      let compareResult = bcryptjs.compareSync(oldPass, data[0].password)
      if (compareResult) {
        // 对新密码进行加密
        const hasPwd = bcryptjs.hashSync(newPass, 10)
        const sqlPass = `update admin_info set password=? where aname=?`
        db.query(sqlPass, [hasPwd, tokenVerify.aname], (err, reaults) => {
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
