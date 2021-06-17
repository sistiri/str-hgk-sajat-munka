// import { dateFormatter } from './utils'
const dateFormatter = require('./utils')

const dateNow = new Date()
const baseDate = new Date(dateNow.setFullYear(1970, 0, 1, 0))
const dateObj1 = new Date(dateNow.setFullYear(1980, 0, 1, 0))
const dateObj2 = new Date(dateNow.setFullYear(1990, 0, 1, 0))
const dateObj3 = new Date(dateNow.setFullYear(2000, 0, 1, 0))
const dateObj4 = new Date(dateNow.setFullYear(2010, 0, 1, 0))

const sampleDates = [baseDate, dateObj1, dateObj2, dateObj3, dateObj4, dateNow]

console.log(dateFormatter(sampleDates))
