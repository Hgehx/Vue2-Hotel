// 管理员路由模块
const express = require('express')
const router = express.Router()
const admin = require('../api/admin/admin')
const resv = require('../api/admin/resv')

// 管理员登陆/注册
router.get('/login', admin.login) //登陆
router.post('/register', admin.register) // 注册

// 预定信息管理
router.get('/resvInfo', resv.resvInfo) //获取数据
router.patch('/resvUpdate', resv.resvUpdate) //修改
router.post('/resvAdd', resv.resvAdd) //新增
router.delete('/resvDel', resv.resvDel) //删除
router.get('/resvUser', resv.resvUser) //查询指定客户信息
module.exports = router
