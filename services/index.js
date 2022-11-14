const moment = require('moment')
const ww = require('chinese-workday')
const axios = require('axios')
const isWorkday = ww.isWorkday
const isHoliday = ww.isHoliday
const getFestival = ww.getFestival
const isAddtionalWorkday = ww.isAddtionalWorkday

const services = {
  getHolidaytts: () => {
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
          result =
            result + `，还有${awaySaturday}天就是周六了，加油吧，打工人！`
        }
      }
    } else if (isHoliday(today)) {
      result = `今天是${getFestival(today)}，可以爽玩了`
    }
    return result
  },
  getEpidemicData: async () => {
    const res = await axios
      .get('http://c.m.163.com/ug/api/wuhan/app/data/list-total')
      .catch((err) => err)
    if (res && res.status === 200) {
      return res.data
    } else {
      console.error('获取疫情数据: 发生错误', res)
      return {}
    }
  },
}

module.exports = services
