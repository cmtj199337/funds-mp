// 当前日期格式化
export function Format(fmt) {
    var o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'h+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        'S': this.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}

// 将日期格式化成yyyy年MM月dd日
export function FormatDateStr() {
    var date = this
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + '年' + m + '月' + d + '日'
}

// 将日期格式化成yyyy年MM月dd日 hh时mm分
export function FormatDateLong() {
    var date = this
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    var h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    var min = date.getMinutes()
    min = min < 10 ? ('0' + min) : min
    return y + '-' + m + '-' + d + ' ' + h + ':' + min
}

// 将日期格式化成yyyy-MM-dd
export function FormatTim() {
    var date = this
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + '-' + m + '-' + d
}

// 日期相加
export function dateAdd(interval, number) {
    // interval必选项
    // y-年
    // q-季度
    // m-月
    // d-日
    // w-周
    // h-小时
    // n-分钟
    // s-秒
    // ms-毫秒
    var d = this
    var k = {
        'y': 'FullYear',
        'q': 'Month',
        'm': 'Month',
        'w': 'Date',
        'd': 'Date',
        'h': 'Hours',
        'n': 'Minutes',
        's': 'Seconds',
        'ms': 'MilliSeconds'
    }
    var n = { 'q': 3, 'w': 7 }
    eval('d.set' + k[interval] + '(d.get' + k[interval] + '()+' + ((n[interval] || 1) * number) + ')')
    return d
}

// 日期相减
export function dateDiff(interval, objDate2) {
    // interval必选项
    // y-年
    // q-季度
    // m-月
    // d-日
    // w-周
    // h-小时
    // n-分钟
    // s-秒
    // ms-毫秒
    const d = this
    const i = {}
    const t = d.getTime()
    const t2 = objDate2.getTime()
    i['y'] = objDate2.getFullYear() - d.getFullYear()
    i['q'] = i['y'] * 4 + Math.floor(objDate2.getMonth() / 4) - Math.floor(d.getMonth() / 4)
    i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth()
    i['ms'] = objDate2.getTime() - d.getTime()
    i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000))
    i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000)
    i['h'] = parseInt(t2 / 3600000 - t / 3600000)
    i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000)
    i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000)
    return i[interval]
}

// 返回星期数
export function getWeekDay() {
    const day = this.getDay()
    let weekDay = ''

    switch (day) {
        case 0:
            weekDay = '日'
            break
        case 1:
            weekDay = '一'
            break
        case 2:
            weekDay = '二'
            break
        case 3:
            weekDay = '三'
            break
        case 4:
            weekDay = '四'
            break
        case 5:
            weekDay = '五'
            break
        case 6:
            weekDay = '六'
            break
    }
    return weekDay
}