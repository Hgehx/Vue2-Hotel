const db = require('../../db/index')
const jwt = require('jsonwebtoken')
const { secret } = require('../token/key')

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
