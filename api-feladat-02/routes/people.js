const express = require('express')
const router = express.Router()
const people = require('../database/people.json')

/* PUT /person/:id/:vaccine - Update type of vaccine of the person with id */
router.put('/:id/:vaccine/', (req, res, next) => {
  const index = people.findIndex(person => person.id === Number(req.params.id))
  const vaccine = toString(req.params.vaccine)
  const { id, firstName, lastName } = people[index]

  people[index] = {
    id,
    firstName,
    lastName,
    vaccine
  }
  res.json(people[index])
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

/* GET /person - Lists all the people. */
router.get('/', function (req, res, next) {
  res.send(JSON.stringify(people))
})

/* GET /person/:id */
router.get('/:id', (req, res) => {
  const person = people.find(person => person.id === Number(req.params.id))
  res.json(person)
})

/* GET /person/:id/vaccinated - Returns the vaccinated status of person */

/* POST /person - Adds new person to database */
router.post('/', (req, res) => {
  const newPerson = req.body
  newPerson.id = people[people.length - 1].id + 1
  people.push(newPerson)

  res.status(201)
  res.json(newPerson)
})

// /* DELETE /person/:id */
// router.delete('/:id', (req, res) => {
//   const index = people.findIndex(person => person.id === Number(req.params.id))
//   if (index > -1) {
//     people.splice(index, 1)
//   }

//   res.json(people.length)
// })

/* DELETE /person/:vaccine - Deletes all people with the given type of vaccine */
router.delete('/:vaccine', (res, req) => {
  const newPeople = people.filter(person => person.vaccine !== req.params.vaccine)
  res.json(newPeople)
})

module.exports = router
