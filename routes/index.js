const { getHolidaytts, getEpidemicData } = require('../services')
const moment = require('moment')
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
  }
})

router.get('/getepidemicdata', async (ctx, next) => {
  const result = await getEpidemicData()
  let request = ctx.request;
  let req_query = request.query
  let cities_data = []
  let city_data = {}
  const check_time = result.timestamp
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
            city_data = child
          }
        })
      }
    })
  } else if (result.data && result.data.areaTree) {
    result.data.areaTree.forEach((area) => {
      if (area.name === '中国') {
        city_data = area
      }
    })
  }
  let data = null
  if (Object.keys(city_data).length === 0) {
    data = `${moment(check_time).format('YYYY-MM-DD HH:mm:ss')} ${req_query.city_name || ''}暂无疫情数据`
  } else {
    data = `${city_data.lastUpdateTime} ${req_query.city_name || '中国'}现有确诊${city_data.total.confirm}，较昨日新增${city_data.today.confirm}`
  }
  ctx.body = {
    code: 0,
    data
  }
})

module.exports = router
