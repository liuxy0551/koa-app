// 引入模块
const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const createError = require('http-errors')
const passport = require('koa-passport')
const cors = require('koa2-cors')

// 实例化
const app = new Koa()

const user = require('./routes/api/v1/user')
const log = require('./log')

// 应用级中间件
app.use(async (ctx, next) => {
  ctx.body = { code: 200, message: '成功' }
  await next()
})

// 配置中间件，通过 bodyParser 获取 post 请求传递过来的参数
app.use(bodyParser())
app.use(cors({
  origin: ctx => ctx.header.origin,
  credentials: true
}))

// passport 的初始化
app.use(passport.initialize()).use(passport.session())
require('./config/passport')(passport)

// 配置模块
router.use('/api/v1/user', user)

// 配置路由
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 9000
app.listen(port, () => {
  console.log(`server started on ${ port }`)
})

app.on('error', (err, ctx) => {
  const error = createError(404, 'This video does not exist!')
  console.log('error', error)
  log.error(err, ctx)
})
