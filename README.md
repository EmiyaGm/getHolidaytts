# getHolidaytts
获取节假日，休息日提示文本

获取国内、指定省市疫情信息


# 使用

```javascript
npm install

npm run prd
```

## 访问服务接口地址

获取节假日，休息日提示文本接口 `/getholidaytss`

```javascript
// 请求地址
http://127.0.0.1:3003/getholidaytss

// 示例数据
{
    "code": 0,
    "tts": "今天是星期三，还有3天就是周六了，加油吧，打工人！"
}
```

获取国内、指定省市疫情信息接口 `/getholidaytss`

```javascript
// 请求地址
http://127.0.0.1:3003/getepidemicdata

// 示例数据
{
    "code": 0,
    "data": "2022-11-16 09:14:28 中国现有确诊8792321，较昨日新增40010"
}

// 请求地址
http://127.0.0.1:3003/getepidemicdata?city_name=南京

// 示例数据
{
    "code": 0,
    "data": "2022-11-16 09:38:29 南京现有确诊619，较昨日新增4"
}
```