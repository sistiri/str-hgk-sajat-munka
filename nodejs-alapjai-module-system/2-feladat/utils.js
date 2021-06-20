const generateUserList = (userArray) => {
  const userObjList = []
  userArray.forEach(obj => {
    let isAdult = false
    if (obj.age >= 18) {
      isAdult = true
    }
    userObjList.push(
      JSON.parse(
                `{"isAdult": ${isAdult}, "fullName": "${obj.firstName} ${obj.lastName}"}`)
    )
  })
  return userObjList
}

const getUserNames = (userArr) => {
  let userStringListTemp = ''
  userArr.forEach(obj => {
    userStringListTemp = userStringListTemp + `${obj.firstName} ${obj.lastName}, `
  })
  const userStringList = userStringListTemp.slice(0, -2)
  return userStringList
}

module.exports = Object.freeze({
  generateUserList,
  getUserNames
})
