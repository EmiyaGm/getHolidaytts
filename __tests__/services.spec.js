const MockDate = require('mockdate')
const { getHolidaytts } = require('../services')

describe('services', () => {
  test('getholidaytss', () => {
    // 法定节假日
    MockDate.set('2022-10-01')
    expect(getHolidaytts()).toEqual('今天是国庆节，可以爽玩了')
    MockDate.reset()
    // 周末
    MockDate.set('2022-11-12')
    expect(getHolidaytts()).toEqual('今天是周末，可以爽玩了')
    MockDate.reset()
    // 正常工作日周一到周四
    MockDate.set('2022-11-10')
    expect(getHolidaytts()).toEqual('今天是星期四，还有2天就是周六了，加油吧，打工人！')
    MockDate.reset()
    // 正常工作日周五
    MockDate.set('2022-11-11')
    expect(getHolidaytts()).toEqual('今天是星期五，明天就是周六了！')
    MockDate.reset()
    // 补班
    MockDate.set('2022-10-08')
    expect(getHolidaytts()).toEqual('今天要补班，请节哀，QAQ')
    MockDate.reset()
  })
})
