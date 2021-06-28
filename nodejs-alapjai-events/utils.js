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
    if (err) console.log('erroooorrrrrrr')
    // logger.success('File transform successful.')
  })
}

module.exports = {
  // writeFileWrapper,
  appendFileWrapper
}
