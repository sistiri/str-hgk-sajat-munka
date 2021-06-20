const utils = require('./utils')

const actionHeroes = [{
  firstName: 'Chuck',
  lastName: 'Norris',
  age: 77
},
{
  firstName: 'Arnold',
  lastName: 'Schwarzenegger',
  age: 72
},
{
  firstName: 'Sylvester',
  lastName: 'Stallone',
  age: 70
}]

console.log(utils.generateUserList(actionHeroes))
console.log(utils.getUserNames(actionHeroes))
