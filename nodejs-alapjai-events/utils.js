const { appendFile } = require('fs')
// const { writeFile } = require('fs')

// const writeFileWrapper = (path, data) => {
//   writeFile(path, data, (err) => {
//     if (err) logger.error()
//     logger.success()
//   })
// }

const appendFileWrapper = (path, data) => {
  appendFile(path, data, (err) => {
    if (err) console.error()
  })
}

module.exports = {
  // writeFileWrapper,
  appendFileWrapper
}
