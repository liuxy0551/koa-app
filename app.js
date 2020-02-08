// 引入模块
const Koa = require('koa')
const Router = require('koa-router')

// 实例化
const app = new Koa()
const router = new Router()

// 路由
router.get('/', async ctx => {
  ctx.body = { msg: 'Hello Koa Interfaces' }
})

// 配置路由
app.use(router.routes()).use(router.allowedMethods())

const  port = process.env.PORT || 9000

app.listen(port, () => {
  console.log(`server started on ${ port }`)
})
