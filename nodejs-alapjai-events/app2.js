const fs = require('fs')
const path = require('path')
// const { createReadStream } = require('fs')   // igy importalva nem mukodik
// const { createWriteStream } = require('fs')  // igy importalva nem mukodik
const { Transform } = require('stream')
const Logger = require('./logger')
const logger = new Logger()

const sourceFile = './iciri-piciri.txt'
const targetFile = `${path.parse(sourceFile).name} Copy.txt`

fs.createReadStream(sourceFile, {
  encoding: 'utf-8'
  // highWaterMark: 16    // enelkul csak a masodik sorok elso betuje nem valtozik nagybeture
})
  .on('error', function (err) {
    logger.error(err.message)
  })
  .pipe(new Transform({
    transform(chunk, enc, cb) {
      const capitalizeString = chunk.toString() // a chunk-okra darabolas osszezavarja a szo eleji nagybetusse alakitast
        .split(' ')
        .map(item => item.replace(item.charAt(0), item.charAt(0).toUpperCase()))
        .join(' ')
      cb(null, capitalizeString)
    }
  }))
  .pipe(fs.createWriteStream(targetFile))
  .on('end', () => {
    logger.emit('end')
    logger.success('File transform successful.')
  })

// //////////////////////////////////////////////////////////

// HINT from web:
//
// const { Transform } = require('stream')
// const createUpperCaseStream = () => {
//   return new Transform({
//     transform (chunk, enc, cb) {
//       const upperCase = chunk.toString().toUpperCase()
//       cb(null, upperCase)
//     }
//   })
// }
//
// const upperCase = createUpperCaseStream()
// process.stdin.pipe(upperCase).pipe(process.stdout)

// /////////////////////////////////////////////////////////

// another HINT from web:
//
// fs.createReadStream('input/file.txt')
//      .pipe(new YourTransformStream())
//      .pipe(fs.createWriteStream('output/file.txt'))
