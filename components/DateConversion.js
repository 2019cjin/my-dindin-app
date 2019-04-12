//import console = require("console");

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const weekDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

function getLastDay(item) {
  return numDaysInMonth[item ]
}

function getNumDays(item) {
  const d = new Date(item.toString())
  if (d.getMonth() === 1 && d.getYear() % 4 === 0)
  {
    return 29
  }
  return numDaysInMonth[d.getMonth()]
}

function weekDayMonthDate(item) {
  const d = new Date(item.toString())
  let date = d.getDate().toString()
  return weekDayNames[d.getDay()] + " " + months[d.getMonth()] + " " + date
}

function weekDayMonthDate2(item){
  const year = parseInt(item.substring(0, 4), 10)
  const month = parseInt(item.substring(5, 7), 10)
  const date = parseInt(item.substring(8, 10), 10)
  
  const d = new Date(year, month, date)

  return weekDayMonthDate(d)
}

function getWeekDayMonthDate(item) {
  const d = item
  let date = d.getDate().toString()
  return weekDayNames[d.getDay()] + " " + months[d.getMonth()] + " " + date
}

function convertStringToDate(str){ 
  const year = str.substring(0, 4)
  const month = str.substring(5, 7)
  const day = str.substring(8, 10)
  return new Date (parseInt(year, 10).toString(), parseInt(month, 10).toString(), parseInt(day, 10).toString())
}

function convertDateToDBString(item){
  const d = item
  let y = d.getFullYear().toString()
  let m = d.getMonth().toString()
  let date = d.getDate().toString()
  if (d.getDate() < 10){
    date = "0" + d.getDate().toString()
  }
  if (d.getMonth() < 10)
  {
    m = "0" + d.getMonth().toString()
  }
  return y + "-" + m + "-" + date
}

export { getNumDays, weekDayMonthDate, weekDayMonthDate2, getWeekDayMonthDate, convertStringToDate, getLastDay, convertDateToDBString }
