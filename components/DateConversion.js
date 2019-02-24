const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const weekDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

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

export { getNumDays, weekDayMonthDate }
