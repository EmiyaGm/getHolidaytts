const router = require('koa-router')()
const moment = require('moment')
const ww = require('chinese-workday')
const isWorkday = ww.isWorkday
const isHoliday = ww.isHoliday
const getFestival = ww.getFestival
const isAddtionalWorkday = ww.isAddtionalWorkday

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
  const today = moment(new Date()).format('YYYY-MM-DD')
  let weekday = ''
  switch (moment().weekday()) {
    case 0:
      weekday = '星期日'
      break
    case 1:
      weekday = '星期一'
      break
    case 2:
      weekday = '星期二'
      break
    case 3:
      weekday = '星期三'
      break
    case 4:
      weekday = '星期四'
      break
    case 5:
      weekday = '星期五'
      break
    case 6:
      weekday = '星期六'
      break
  }
  let result = `今天是${weekday}`
  if (isWorkday(today)) {
    if (isAddtionalWorkday(today)) {
      result = '今天要补班，请节哀，QAQ'
    } else {
      const awaySaturday = 6 - moment().weekday()
      if (awaySaturday === 1) {
        result = result + `，明天就是周六了！`
      } else {
        result = result + `，还有${awaySaturday}天就是周六了，加油吧，打工人！`
      }
    }
  } else if (isHoliday(today)) {
    result = `今天是${getFestival(today)}，可以爽玩了`
  }
  ctx.body = {
    code: 0,
    tts: result,
    date: today
  }
})

module.exports = router
