export function format(time) {
  let friendlyDate = new Date(time)
  return FormatDateLong(friendlyDate)
}

// 将日期格式化成yyyy-MM-dd日
export function formatDate(dateArg) {
  const date = new Date(dateArg);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formatMonth = month < 10 ? `0${month}` : month;
  const formatDay = day < 10 ? `0${day}` : day;

  return `${year}-${formatMonth}-${formatDay}`
}

// 将日期格式化成yyyy-MM-dd hh:mm
export function FormatDateLong(dateArg) {
  const date = new Date(dateArg);
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