const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const socketIO = require('socket.io')
const io = socketIO(server)
const bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 1111)

app.locals.title = '160h8 Grudge Bin'
app.locals.grudges = []

app.get('/', (req, res) => {
  res.redirect('/grudges')
})

app.get('/grudges', (req, res) => {
  res.sendFile(__dirname + '/public/index/index.html')
})

app.post('/grudges', (req, res) => {
  const grudge = req.body

  app.locals.grudges.push(grudge)
  res.send(app.locals.grudges)
})

app.get('/jackal/*', (req, res) => {
  res.sendFile(__dirname + '/public/jackal/jackal.html')
})

// ----------------------
app.get('/api/v1/grudges', (req, res) => {
  let grudges = app.locals.grudges
  res.send(grudges)
})

app.get('/api/v1/grudges/:id', (req, res) => {
  let grudge = app.locals.grudges.find(grudge => {
    return grudge.id === req.params.id
  })
  res.send(grudge)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

// io.on('connection', (socket) => {
//   console.log('A user has connected.', io.engine.clientsCount)
//   io.sockets.emit('usersConnected', io.engine.clientsCount)
//
//   socket.emit('statusMessage', 'You have connected.')
//
//   socket.on('voteCast', (optionID, profileImg) => {
//     updateVoteResults(profileImg)
//     app.locals.voteResults.push({
//       optionID,
//       profileImg
//     })
//     io.sockets.emit('voteCount', app.locals.voteResults)
//   })
//
//   socket.on('disconnect', () => {
//     console.log('A user has disconnected.', io.engine.clientsCount)
//     delete votes[socket.id]
//     io.sockets.emit('usersConnected', io.engine.clientsCount)
//   })
// })

module.exports = server
