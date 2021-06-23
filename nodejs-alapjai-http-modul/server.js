const http = require('http')
const SiteRouter = require('./router/site.router')
const port = process.env.PORT || 8080

// Date: a kérés pontos ideje magyar lokalizáció szerint formázva
// Url: a kért url
// Method: a http metódus
// Pl.: Date: 2021.04.01 Url: /about Method: GET

const timeStamp = new Intl.DateTimeFormat('hu-HU', { dateStyle: 'short', timeStyle: 'short' }).format(new Date())

http.createServer(({ url }, res) => {
  SiteRouter[url]
    ? SiteRouter[url](res)
    : SiteRouter['/404'](res)
})
  .on('error', err => console.log(`Server error: ${err.message}`))
  .on('request', req => console.log(`Date: ${timeStamp} - URL: ${req.url} - Method: ${req.method}`))
  .on('listening', () => console.log(`Server is running at http://127.0.0.1:${port}`))
  .listen(port)

