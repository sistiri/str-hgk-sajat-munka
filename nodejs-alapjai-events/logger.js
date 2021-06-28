const EventEmitter = require('events')

class Logger extends EventEmitter {
  construct () {
    // super()
  }

  error (string) {
    console.log('\x1b[31m', string)
  }

  success (string) {
    console.log('\x1b[32m', string)
  }
}

module.exports = Logger
