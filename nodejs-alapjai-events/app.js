// const Logger = require('./logger')
// const logger = new Logger()
const path = require('path')
const { createReadStream } = require('fs')
// const { createWriteStream } = require('fs')
const { appendFileWrapper } = require('./utils')

// const { Transform } = require('stream')
// const createUpperCaseStream = () => {
//   return new Transform({
//     transform (chunk, enc, cb) {
//       const upperCase = chunk.toString().toUpperCase()
//       cb(null, upperCase)
//     }
//   })
// }

// const upperCase = createUpperCaseStream()
// process.stdin.pipe(upperCase).pipe(process.stdout)

const { Transform } = require('stream')
const createCapitalizeStream = () => {
  return new Transform({
    transform (chunk, enc, cb) {
      const capitalizeString = chunk.toString()
        .split(' ')
        .map(item => item.replace(item.charAt(0), item.charAt(0).toUpperCase()))
        .join(' ')
      cb(null, capitalizeString)
    }
  })
}

const sourceFile = './iciri-piciri.txt'
const targetFile = `${path.parse(sourceFile).name} Copy.txt`

const capitalizeString = createCapitalizeStream()

const readableStream = createReadStream(sourceFile, {
  encoding: 'utf-8',
  highWaterMark: 32
})

readableStream.pipe(capitalizeString)
  .on('data', (chunk) => {
    appendFileWrapper(targetFile, chunk)
  })



//   logger.success('File transform successful.')
// } catch (error) {
//   logger.error(error.message)
// }

// const writeableStream = createWriteStream(sourceFile)
// readableStream.pipe(writeableStream)
