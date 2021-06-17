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

//  { firstName, lastName, age }
// isAdult : true/false érték attól függően, hogy elmúlt-e 18 éves
// fullName: 

const generateUserList = (userArray) => {
    const userList = []
    userArray.forEach(obj => {
        let isAdult = false
        if (obj.age >= 18) {
            isAdult = true
        }

        userList.push(
            JSON.parse(
                `{"isAdult": ${isAdult}, "fullName": "${obj.firstName} ${obj.lastName}"}`)
        )


    })
    console.log(userList);
}

generateUserList(actionHeros)


