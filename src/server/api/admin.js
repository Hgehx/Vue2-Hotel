let db = require('../db/index')

exports.login = (req, res) => {
  //向info表添加数据
  var sql = 'select * from admin_info where aname=?'
  db.query(sql, [req.query.aname], (err, data) => {
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
