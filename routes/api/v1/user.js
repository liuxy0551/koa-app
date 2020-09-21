const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const passport = require('passport')

const validateRegisterInput = require('../../../validator/register')

router
  /**
   * @route GET /api/v1/user/test
   * @desc 测试接口地址
   */
  .get('/test', async ctx => {
    // const err = new Error('name required')
    // err.status = 400
    // err.expose = true
    // throw err
    ctx.throw(401, 'access_denied', { user: 1 });
    return 
    ctx.status = 200
    Object.assign(ctx.body, { msg: 'user test api...' })
  })

  /**
   * @route POST /api/v1/user/register
   * @desc 注册
   */
  .post('/register', async ctx => {
    const { errors, isValid } = validateRegisterInput(ctx.request.body)
    // 判断是否通过验证
    if (!isValid) {
      ctx.status = 400
      ctx.body = errors
      return 
    }

    Object.assign(ctx.body, { data: ctx.request.body })
  })

  /**
   * @route POST /api/v1/user/login
   * @desc 登录
   */
  .post('/login', async ctx => {
    // 1、查询用户是否存在
    // 没查到返回用户不存在，查到后验证密码
    const userInfo = { id: 10, name: 'Jack' }
    const token = jwt.sign(userInfo, 'secret', { expiresIn: 3600 })

    ctx.status = 200
    ctx.body = { success: true, token: `Bearer ${ token }` }
  })

  /**
   * @route POST /api/v1/user/current
   * @desc 登录
   * @access 私密接口，需要 token
   */
  .get('/current', passport.authenticate('jwt', { session: false }), async ctx => {
    
    ctx.body = ctx.state.user
  })

module.exports = router.routes()
