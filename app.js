// 引入模块
const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')

// 实例化
const app = new Koa()

// 引入 user.js
const user = require('./routes/api/user')

// 应用级中间件
app.use(async (ctx, next) => {
  console.log(1111, ctx.body)
  ctx.body = { code: 200, message: '成功' }
  await next()
})

// 配置中间件，通过 bodyParser 获取 post 请求传递过来的参数
app.use(bodyParser())

// 路由
router
  .get('/hello', async ctx => {
    Object.assign(ctx.body, { data: Object.assign({ msg: 'Hello Koa Interfaces' }, ctx.query) })
  })
  .post('/say', async ctx => {
    Object.assign(ctx.body, { data: ctx.request.body })
  })

// 配置路由地址 localhost:9000/api/user
router.use('/api/user', user)

// 配置路由
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 9000

app.listen(port, () => {
  console.log(`server started on ${ port }`)
})
