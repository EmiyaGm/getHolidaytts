const { getHolidaytts } = require('../services')

const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
  }
})

router.get('/getholidaytss', async (ctx, next) => {
  const result = getHolidaytts()
  ctx.body = {
    code: 0,
    tts: result,
    date: today
  }
})

module.exports = router
