const express = require('express')
const router = express.Router()
const people = require('../database/person.json')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hi, this is the API page.')
})

/* GET /person/count - Number of vaccinated people */
router.get('/person/count', function (req, res, next) {
  res.send(`${people.length}`)
})

/* GET /person/vaccinated - Data of vaccinated people */
router.get('/person/vaccinated', function (req, res, next) {
  const vaccinatedPeople = people.filter(person => person.vaccine !== 'none')
  res.send(JSON.stringify(vaccinatedPeople))
})
module.exports = router
