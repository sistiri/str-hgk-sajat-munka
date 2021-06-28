const EventEmitter = require('events')

class Logger extends EventEmitter {
  construct () {
    // super()
  }

  error (string) {
    console.log('\x1b[31m', string, '\x1b[0m')
  }

  success (string) {
    console.log('\x1b[32m', string, '\x1b[0m')
  }
}

module.exports = Logger
