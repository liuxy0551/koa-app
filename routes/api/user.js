const router = require('koa-router')()

router
  /**
   * @route GET /api/user/test
   * @desc 测试接口地址
   */
  .get('/test', async ctx => {
    ctx.status = 200
    Object.assign(ctx.body, { msg: 'user test api...' })
  })

  /**
   * @route POST /api/user/register
   * @desc 注册
   */
  .post('/register', async ctx => {
    Object.assign(ctx.body, { data: ctx.request.body })
  })

module.exports = router.routes()
