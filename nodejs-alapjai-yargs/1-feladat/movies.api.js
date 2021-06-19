const fs = require('fs')

const MoviesApi = (path, prop) => ({
  async get () {
    const dataString = await fs.readFile(path, { encoding: 'utf-8' },
      (err, data) => {
        if (err) throw err
        console.log(data)
      })
    return JSON.parse(dataString)[prop]
  },

  save (data) {
    fs.writeFile(path, JSON.stringify({ [prop]: data }),
      (err, data) => {
        if (err) throw err
        console.log(data)
      })
  }
})

module.exports = MoviesApi
