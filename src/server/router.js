let express = require('express')
let router = express.Router()
const user = require('./api/user/user')
// const admin = require('./api/admin')

// 用户信息
router.get('/user/getinfo', user.info)
router.get('/user/login', user.login)
router.post('/user/register', user.register)
router.patch('/user/updatePwd', user.updatePwd)
router.delete('/user/deluser', user.deluser)

// //管理员信息
// router.get('/admin/login', admin.login)
// router.post('/admin/register', admin.register)

// 预约管理信息
router.get('/')
module.exports = router
