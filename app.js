// 引入模块
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

// 实例化
const app = new Koa()
const router = new Router()

app.use(async (ctx, next) => {
  ctx.body = { code: 200, message: '成功' }
  await next()
})

// 配置中间件，通过 bodyParser 获取 post 请求传递过来的参数
app.use(bodyParser())

// 路由
router
  .get('/hello', async ctx => {
    let { q } = ctx.query
    Object.assign(ctx.body, { data: { msg: 'Hello Koa Interfaces', q }})
  })
  .post('/say', async ctx => {
    Object.assign(ctx.body, { data: ctx.request.body })
  })

// 配置路由
app.use(router.routes()).use(router.allowedMethods())

const  port = process.env.PORT || 9000

app.listen(port, () => {
  console.log(`server started on ${ port }`)
})
