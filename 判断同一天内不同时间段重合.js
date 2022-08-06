/*
 * @Author: your name
 * @Date: 2020-03-09 16:25:33
 * @LastEditTime: 2022-07-18 14:46:30
 * @LastEditors: ying.hong ying.hong@ubtrobot.com
 * @Description: In User Settings Edit
 * @FilePath: \CBISd:\Ya\personcode\判断同一天内不同时间段重合.js
 */
iscoverInLink(cutLink, params, list) // 同一卡片时间段有重复！ 特殊组合判断时间重合
isOffOnRightInLink(cutLink, params, list) // 开机关机唯一并且开机时间优先，关机时间最晚

function iscoverInLink(index, item, list) {
  const { specialCode, specialist } = this.state
  let flag = false
  list && list.length > 0 ? list.forEach((obj, i) => {
    if (index === i) {
      // 判断是自身比较
    } else if ((obj.startStr < item.startStr && obj.endStr < item.startStr) || (obj.startStr > item.endStr && obj.endStr > item.endStr)) {
      // 判断时间上没有重复
    } else if (item.taskCode === specialCode && specialist.indexOf(obj.taskCode) >= 0) {
      // 自己是特殊活动时对方是配对活动
      if (obj.startStr === item.startStr && obj.endStr === item.endStr ) {
      } else {
        // message.error('AAA')
        flag = true
        throw new Error("ending")
      }
    } else if (obj.taskCode === specialCode && specialist.indexOf(item.taskCode) >= 0) {
      // 对方是特殊活动时自己是配对活动
      if (obj.startStr === item.startStr && obj.endStr === item.endStr ) {
      } else { 
        // message.error('AAA')
        flag = true
        throw new Error("ending")
      }
    } else {
      // message.error('与' + obj.taskName +'任务冲突，请重新输入时间')
      flag = true
      throw new Error("ending")
    }
  }) : null
  return flag
}

function isOffOnRightInLink(index, item, list) {
  let flag = false
  let newlist = JSON.parse(JSON.stringify(list))
  index==='' ? newlist.push(item) : newlist[index] = item
  
  if (newlist.filter(obj => obj.taskCode === 5).length > 1) {
    flag = true
    message.error('开机仅能设置一次且时间先于其他任务，请重新设置')
  } else if (newlist.filter(obj => obj.taskCode === 5).length > 0) {
    let i = null
    newlist.forEach((obj, thisindex) => {
      obj.taskCode === 5 ? i = thisindex : null
    })
    if (newlist.filter((obj, j) => newlist[i].endStr > obj.startStr && i !== j).length > 0) {
      flag = true
      message.error('开机仅能设置一次且时间先于其他任务，请重新设置')
    }
  } else if (newlist.filter(obj => obj.taskCode === 6).length > 1) {
    flag = true
    message.error('关机仅能设置一次且时间后于其他任务，请重新设置')
  } else if (newlist.filter(obj => obj.taskCode === 6).length > 0) {
    let i = null
    newlist.forEach((obj, thisindex) => {
      obj.taskCode === 6 ? i = thisindex : null
    })
    if (newlist.filter((obj, j) => newlist[i].startStr < obj.endStr && i !== j).length > 0) {
      flag = true
      message.error('关机仅能设置一次且时间后于其他任务，请重新设置')
    }
  } 
  return flag
}