const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(bodyParser.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true}))


app.post('/characters', (req, res) => {
    res.send(req.body)
    io.emit('char', req.body)
})






http.listen(8080)
