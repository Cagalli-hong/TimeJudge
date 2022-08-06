if (iscoverInCards(params)) {   // params：单个重复周期
  message.error('重复周期冲突，请重新输入')
}

/*
* return 有重叠返回true 没有重叠返回false
* params maskList：整个列表  currentCardNum：单个卡片的当前在列表中的序号
*/
function iscoverInCards(cutRepeat) {
  let { maskList, currentCardNum } = this.state
  let iscover = false
  const cutParams = this.getSelectDayList(cutRepeat)
  maskList.forEach((item, index) => {
    if(index!==currentCardNum && item.repetitionPeriod) {
      const coverList = item.selectDayList.filter(obj => cutParams.selectDayList.indexOf(obj) >= 0)
      if(coverList.length > 0) {
        iscover = true
      }
    }
  })
  if (!iscover) {
    maskList[currentCardNum].selectDayList = cutParams.selectDayList
    this.setState({ maskList })
  }
  return iscover
}

/*
* return 所有符合条件的日期时间戳数组
* params setdays：设置判断的天数，判断3年内，则360*3 = 1080
*/
function getSelectDayList(cutRepeat) {
  const { setdays } = this.state
  let dateTrampList = []
  cutRepeat.date && cutRepeat.date.length > 0 ? cutRepeat.date.forEach((item, index) => {
    dateTrampList.push({ startDate: new Date(item.startDate).getTime() / 1000, endDate: new Date(item.endDate).getTime() / 1000 })
  }) : null
  const todayTramp = parseInt(new Date(new Date().toLocaleDateString()).getTime() / 1000)
  const todayweek = new Date().getDay()
  let selectDayList = []
  for (let i=0 ; i<setdays ; i++) {
    let cutday = todayTramp + i*86400
    let cutweek = (todayweek + i )%7 || 7
    const checkweek = !cutRepeat.week || cutRepeat.week.length===0 || (cutRepeat.week && cutRepeat.week.indexOf(cutweek) >= 0) // 星期有重叠
    const checkday = dateTrampList.length===0 || this.hasday(cutday, dateTrampList) // 日期有重叠
    if (checkweek && checkday) { // 筛出本次的交集日期
      selectDayList.push(cutday)
    }
  }
  cutRepeat.dateTrampList = dateTrampList
  cutRepeat.selectDayList = selectDayList
  return cutRepeat
}

/*
* return 日期在时间段内，在时间段内返回true
* params day：其中一个日期  list：多段日期列表[{startDate：开始时间戳，endDate：结束时间戳},{startDate：开始时间戳，endDate：结束时间戳}]
*/
function hasday(day, list) { // 日期在日期段中
  let flag = false
  list.forEach((onelist, i) => {
    if (onelist.startDate<=day && onelist.endDate>=day) {
      flag = true
    }
  })
  return flag
}