const increaseAndFormatDate = require('./utils')

const dateNow = new Date()
const baseDate = new Date(dateNow.setFullYear(1970, 0, 1, 0))
const dateObj1 = new Date(dateNow.setFullYear(1984, 0, 1, 0))
const dateObj2 = new Date(dateNow.setFullYear(1996, 0, 1, 0))
const dateObj3 = new Date(dateNow.setFullYear(2004, 0, 1, 0))
const dateObj4 = new Date(dateNow.setFullYear(2012, 0, 1, 0))

const sampleDates = [baseDate, dateObj1, dateObj2, dateObj3, dateObj4, dateNow]

console.log(increaseAndFormatDate(sampleDates))
