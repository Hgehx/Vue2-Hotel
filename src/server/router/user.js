// 用户路由模块
const express = require('express')
const router = express.Router()
const user = require('../api/user/user')
const revi = require('../api/user/revi')
const resv = require('../api/user/resv')
const personal = require('../api/user/personal')

// 登录注册
router.get('/login', user.login)
router.post('/register', user.register)

// 订单
router.get('/resvInfo', resv.resvInfo)
router.patch('/stateChange', resv.stateChange)

// 个人信息
router.get('/getInfo', personal.getInfo)
router.patch('/updateInfo', personal.updateInfo) // 更新个人信息
router.get('/getAvatar', personal.getAvatar) // 获取头像
router.patch('/updateAvatar', personal.updateAvatar) //更换头像
router.patch('/updatePwd', personal.updatePwd) //修改密码

router.get('/getUserRevi', revi.getUserRevi) //获取对应点评列表
router.post('/insertRevi', revi.insertRevi) //用户点评提交数据
router.patch('/changeState', revi.changeState) //改变点评状态
router.get('/getUserAvatar', revi.getUserAvatar) //获取用户头像

module.exports = router
