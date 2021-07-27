const express = require('express')
const router = express.Router()
const people = require('../database/people.json')

/* GET people listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

/* GET /person/count - Number of vaccinated people */
router.get('/count', function (req, res, next) {
  res.send(`${people.length}`)
})

/* GET /person/vaccinated - Data of vaccinated people */
router.get('/vaccinated', function (req, res, next) {
  const vaccinatedPeople = people.filter(person => person.vaccine !== 'none')
  res.send(JSON.stringify(vaccinatedPeople))
})

module.exports = router
