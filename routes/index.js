const { getHolidaytts, getEpidemicData } = require('../services')

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

router.get('/getepidemicdata', async (ctx, next) => {
  const result = await getEpidemicData()
  let request = ctx.request;
  let req_query = request.query
  let cities_data = []
  let city_data = {}
  if (req_query.city_name) {
    const city_name = req_query.city_name
    if (result.data && result.data.areaTree) {
      result.data.areaTree.forEach((area) => {
        if (area.name === '中国') {
          cities_data = area.children || []
        }
      })
    }
    cities_data.forEach((city) => {
      if (city.name === city_name) {
        city_data = city
      }
      if (city.children) {
        city.children.forEach((child) => {
          if (child.name === city_name) {
            city_data === child
          }
        })
      }
    })
  }
  ctx.body = {
    code: 0,
    city_data
  }
})

module.exports = router
