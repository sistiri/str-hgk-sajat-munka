const actionHeros = [{
    firstName: "Chuck",
    lastName: "Norris",
    age: 77
},
{
    firstName: "Arnold",
    lastName: "Schwarzenegger",
    age: 72
},
{
    firstName: "Sylvester",
    lastName: "Stallone",
    age: 70
}]

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
    console.log(userObjList);
    return userObjList
}

generateUserList(actionHeros)

const getUserNames = (userArr) => {
    let userStringListTemp = ''
    userArr.forEach(obj => {
        userStringListTemp = userStringListTemp +`${obj.firstName} ${obj.lastName},`
    })
    const userStringList = userStringListTemp.slice(0, -1)
    console.log(userStringList)
    return UserStringList
}

getUserNames(actionHeros)

