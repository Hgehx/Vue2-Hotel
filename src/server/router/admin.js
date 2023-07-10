// 管理员路由模块
const express = require('express')
const router = express.Router()
const admin = require('../api/admin/admin')
const resv = require('../api/admin/resv')
const binfo = require('../api/admin/baseinfo')
const room = require('../api/admin/room')
const revi = require('../api/admin/revi')

// 管理员登陆/注册
router.get('/login', admin.login) //登陆
router.post('/register', admin.register) // 注册

// 预定信息管理
router.get('/resvInfo', resv.resvInfo) //获取数据
router.patch('/resvUpdate', resv.resvUpdate) //修改
router.post('/resvAdd', resv.resvAdd) //新增
router.delete('/resvDel', resv.resvDel) //删除
router.get('/resvUser', resv.resvUser) //查询指定客户信息
router.get('/getRoomName', resv.getRoomName) //查询客房名称和价格

// 客房信息管理
router.get('/roomInfo', room.roomInfo) //分页获取数据
router.get('/roomId', room.roomId) //指定id客房信息
router.patch('/updateRoom', room.updateRoom) //修改客房信息
router.post('/addRoom', room.addRoom) //新增客房信息
router.delete('/delRoom', room.delRoom) //删除
router.post('/addMore', room.addMore) //新增客房信息
router.get('/idMore', room.idMore) //指定id客房信息
router.patch('/updateMore', room.updateMore) //修改介绍
router.patch('/updateNum', room.updateNumadd) //退房，客房数量+1,用户预约数量-1

// 用户评价信息
router.get('/reviInfo', revi.reviInfo) // 分页获取
router.patch('/reviUpdate', revi.reviUpdate) //修改客房信息

// 管理员个人信息
router.get('/getInfo', binfo.getInfo) //获取个人信息
router.patch('/updateInfo', binfo.updateInfo) //获取个人信息
router.patch('/updatePwd', binfo.updatePwd) //修改密码
router.patch('/updateAvatar', binfo.updateAvatar) //更换头像
router.get('/getAvatar', binfo.getAvatar) //获取头像

module.exports = router
