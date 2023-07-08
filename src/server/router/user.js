// 用户路由模块
const express = require('express')
const router = express.Router()
const revi = require('../api/user/revi')

router.get('/getUserRevi', revi.getUserRevi) //获取对应点评列表
router.post('/insertRevi', revi.insertRevi) //用户点评提交数据
router.patch('/changeState', revi.changeState) //改变点评状态
router.get('/getUserAvatar', revi.getUserAvatar) //获取用户头像

module.exports = router
