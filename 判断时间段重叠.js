/*
 * @Author: hongying
 * @Date: 2020-03-03 15:47:24
 * @LastEditTime: 2020-03-04 17:58:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @本页面调用方法: judgeDateInCycle(params, paramsList, days)
 */
// const params = {
//   date: [
//     {
//       startDate: 2020/01/01,
//       endDate: 2020/12/31 
//     }, {
//       startDate: 2020/04/20,
//       endDate: 2020/06/30
//     }
//   ],
//   week: ['2', '3']
// }
// const paramsList = [
//   {
//     date: [
//       {
//         startDate: 2020/01/01,
//         endDate: 2020/12/31 
//       }, {
//         startDate: 2020/04/20,
//         endDate: 2020/06/30
//       }
//     ],
//     week: ['2', '3']
//   }, {
//     date: [
//       {
//         startDate: 2020/01/01,
//         endDate: 2020/12/31 
//       }, {
//         startDate: 2020/04/20,
//         endDate: 2020/06/30
//       }
//     ],
//     week: ['2', '3']
//   }
// ]
// const days = 1800


 /*
 * @Author: hongying
 * @Date: 2020-03-03 15:47:24
 * @LastEditTime: 2020-03-04 17:36:29
 * @params: 
 *    day = '2020/01/01'
 *    daylist = [{ startDate: 2020/01/01, endDate: 2020/12/31 }, { startDate: 2020/04/20, endDate: 2020/06/30 }]
 */
export function judgeDateInDays(day, daylist) { // 判断某个时间是否在一段时间中
  let flag = false
  const dayStr = new Date(day).getTime() / 1000
  daylist.forEach((onelist, i) => {
    const daylistStr = {
      startDate: new Date(onelist.startDate).getTime() / 1000,
      endDate: new Date(onelist.endDate).getTime() / 1000
    }
    if (daylistStr.startDate<=dayStr && daylistStr.endDate>=dayStr) {
      flag = true
    }
  })
  return flag   // flag 是true的话就是日期有在不定数时间段中
}

/*
 * @Author: hongying
 * @Date: 2020-03-03 15:47:24
 * @LastEditTime: 2020-03-04 17:36:29
 * @params: day是单个时间戳，daylist是包含开始和结束时间戳
 */
export function hasday(day, daylist) { 
  return daylistStr.startDate<=dayStr && daylistStr.endDate>=dayStr
}

export function setStampTime(date) { // 日期转时间戳
  if(!date){return }// date不能为空
  return new Date(date).getTime() / 1000
}

/*
 * @Author: hongying
 * @Date: 2020-03-03 15:47:24
 * @LastEditTime: 2020-03-04 17:36:29
 * @return：所有符合条件的当前自身的日期时间戳数组
 * @params: 
 *    days：在从今天开始的days天内
 *    params：包含星期和不定数时间段
 */
export function getselectDayList(params, days) { // 取符合自身条件的时间戳数组
  const todayTramp = parseInt(new Date(new Date().toLocaleDateString()).getTime() / 1000)
  const todayweek = new Date().getDay()
  let selectDayList = []
  for (let i=0 ; i<days ; i++) {
    let cutday = todayTramp + i*86400
    let cutweek = ( todayweek + i )%7 || 7
    const checkweek = !params.week || (cutRepeat.week && cutRepeat.week.indexOf(String(cutweek)) >= 0) // 星期有重叠
    const checkday = params.paramslist.length===0 || this.hasday(cutday, params.paramslist) // 日期有重叠
    if (checkweek && checkday) { // 筛出本次的交集日期
      selectDayList.push(cutday)
    }
  }
  return selectDayList
}

/*
 * @Author: hongying
 * @params: 页面头部
 * @return: 返回单个时间段和多个时间段数组之间是否有重合，true就是有
 * @tips: 主方法
 */

export function judgeDateInCycle(params, paramsList, days) { // 一个时间段，多个时间段，在未来days天中是否有重叠，返回true则有重叠
  // 给params和paramsList时间格式都转为时间戳
  let iscover = false
  let paramslist = []
  params.date && params.date.length > 0 ? params.date.forEach((item, index) => {
    paramslist.push({ startStr: setStampTime(item.startDate), endStr:setStampTime(item.endDate) })
  }) : null
  params.paramslist = paramslist
  params.selectDayList = getselectDayList(params, days)

  paramsList && paramsList.length > 0 ? paramsList.forEach((item, index) => {
    let strList = []
    item.date && item.date.length > 0 ? item.date.forEach((obj, i) => {
      strList.push({ startStr: setStampTime(obj.startDate), endStr:setStampTime(obj.endDate) })
    }) : null
    item.strList = strList
    item.selectDayList = getselectDayList(item, days)
  }) : null

  paramsList && paramsList.length > 0 ? paramsList.forEach((item, index) => {
    // if(index!==currentCardNum) { // 如果判断的对象也在list中，则需要
      const coverList = item.selectDayList.filter(obj => params.selectDayList.indexOf(obj) >= 0)
      if(coverList.length > 0) {
        iscover = true
      }
    // }
  }) : null
  return iscover
}

export function listCoverList(paramsList1, paramsList2, days) {
  let flag = false
  flag = paramsList1 && paramsList1.length > 0 ? paramsList1.filter(item => judgeDateInCycle(item, paramsList2, days)).length > 0 : true
}