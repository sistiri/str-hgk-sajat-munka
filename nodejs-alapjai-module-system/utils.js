/* eslint-disable no-unused-vars */

const increaseDate = (date, days = 3) => date.getTime() + days * 24 * 60 * 60 * 1000

const dateNow = new Date()
const baseDate = new Date(dateNow.setFullYear(1970, 0, 1, 0))
const dateObj1 = new Date(dateNow.setFullYear(1980, 0, 1, 0))
const dateObj2 = new Date(dateNow.setFullYear(1990, 0, 1, 0))
const dateObj3 = new Date(dateNow.setFullYear(2000, 0, 1, 0))
const dateObj4 = new Date(dateNow.setFullYear(2010, 0, 1, 0))

// console.log('dateNow.getTime', dateNow.getTime())
// console.log('baseDate', baseDate, baseDate.getTime())
// console.log('dateObj1', dateObj1, dateObj1.getTime())
// console.log('dateObj2', dateObj2, dateObj2.getTime())
// console.log('dateObj3', dateObj3, dateObj3.getTime())
// console.log('dateObj4', dateObj4, dateObj4.getTime())
// console.log('baseDate.getTime', baseDate.getTime())
// console.log('increaseDate(dateNow)', increaseDate(dateNow))

console.log('----------arrayOfNewDates-------------')

const arrayOfNewDates = [baseDate, dateObj1, dateObj2, dateObj3, dateObj4]
console.log(arrayOfNewDates)
// console.log(new Date(increaseDate(arrayOfNewDates[0])))
// console.log(new Date(increaseDate(arrayOfNewDates[1])))
// console.log(new Date(increaseDate(arrayOfNewDates[2])))
// console.log(new Date(increaseDate(arrayOfNewDates[3])))
// console.log(new Date(increaseDate(arrayOfNewDates[4])))

console.log('------------plus3Days---------------')
const plus3days = []
arrayOfNewDates.forEach(date => plus3days.push(new Date(increaseDate(date))))
console.log(plus3days)

console.log('--------------increaseDateAndFormat()-------------')

const increaseAndFormatDate = arrayOfDates => {
  const plus3days = []
  arrayOfDates.forEach(date => plus3days
    .push(new Intl.DateTimeFormat('hu-HU', { dateStyle: 'full' })
      .format(increaseDate(date)))
  )
  return plus3days
}

// console.log(increaseAndFormatDate(arrayOfNewDates))

module.exports = {
  increaseAndFormatDate
}
