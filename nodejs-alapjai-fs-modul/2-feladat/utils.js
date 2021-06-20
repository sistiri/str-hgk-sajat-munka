const { createReadStream, createWriteStream } = require('fs')
const { createGzip } = require('zlib')
const { unlink } = require('fs').promises

// Az állományok archiválásához kell készítened egy egyszerű alkalmazást.
// Az alkalmazás egy paraméterként megadott útvonalon lévő fájlról készít egy másolatot ugyanabba a könyvtárba.
// A fájl útvonala/neve elég, ha egy változóban van tárolva.
// Az új fájl neve az eredeti fájl neve a végén a .bak kiegészítéssel.
// Ennek a fájlnak a tartalmát egy gz fájlba becsomagoljuk be.
// Amennyiben a minden művelet sikeres volt, az eredeti fájlt és a .bak fájlt is töröljük ki!

const archiveThisFile = (filePath) => {
  const readableStream = createReadStream(filePath, {
    encoding: 'utf-8',
    highWaterMark: 11
  })

  const writeableStream = createWriteStream(`${filePath}.bak`)
  const createCompressedFile = createWriteStream(`${filePath}.bak.gz`)

  readableStream.pipe(writeableStream)

  readableStream
    .pipe(createGzip())
    .pipe(createCompressedFile)

  const fileHandlerCallback = (err) => {
    if (err) throw err
    console.log('file process successful')
  }

  const unlinkWrapper = ({ path, callback = fileHandlerCallback } = {}) => {
    unlink(path, callback)
  }

  unlinkWrapper({ path: `${filePath}.bak` })
  unlinkWrapper({ path: filePath })
}

module.exports = archiveThisFile
