let express = require('express')
let app = express()
const cors = require('cors')
let router = express.Router()

app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(express.json({ extended: true, limit: '10mb' }))

app.use(express.json())

app.use(cors()) //配置跨域

const adminRoutes = require('./router/admin')

app.use('/admin', adminRoutes)

const userRoutes = require('./router/user')
app.use('/user', userRoutes)

app.use(router) //配置路由

app.listen(80, () => {
  console.log('服务器启动成功')
})
