const { access, mkdir, writeFile, readdir } = require('fs').promises

// controllers
// // site.controller.js
// routers
// // site.router.js
// views
// // index.html
// app.js

const createStarterTemplate = () => {
  access('newProject')
    .catch(() => mkdir('newProject'))
    .then(() => writeFile('./newProject/app.js', 'APPLICATION'))
    // .then(() => readdir('./newProject'))
    // .then(console.log)
    .catch((err) => console.log(err.message))
  access('./newProject/controllers')
    .catch(() => mkdir('./newProject/controllers'))
    .then(() => writeFile('./newProject/controllers/site.controller.js', 'SITE CONTROLLER'))
    // .then(() => readdir('./newProject/controllers'))
    // .then(console.log)
    .catch((err) => console.log(err.message))
  access('./newProject/routers')
    .catch(() => mkdir('./newProject/routers'))
    .then(() => writeFile('./newProject/routers/site.router.js', 'SITE ROUTER'))
    // .then(() => readdir('./newProject/routers'))
    // .then(console.log)
    .catch((err) => console.log(err.message))
  access('./newProject/views')
    .catch(() => mkdir('./newProject/views'))
    .then(() => writeFile('./newProject/views/index.js', 'INDEX'))
    // .then(() => readdir('./newProject/views'))
    // .then(console.log)
    .catch((err) => console.log(err.message))
}

module.exports = createStarterTemplate
