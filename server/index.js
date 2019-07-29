const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var roomNumber = 0
var rooms = []

app.use(bodyParser.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true}))

app.get('/characters', (req, res) => {
    res.send(req.body)
})

app.post('/characters', (req, res) => {
    res.send(req.body)
    io.emit('char', req.body)
})

io.on('connection', socket => {
    // console.log('a user connected:', socket.id);
    // socket.join(`room-${++roomNumber}`)
    // rooms.push(`room-${roomNumber}`) 
    // console.log("JER")
    // console.log((io.sockets.adapter.rooms))
    // console.log("CONNECTION SOCKETS: ", io.sockets.adapter.rooms)
    // console.log(io.sockets.adapter.rooms['room-2'].length)
    
    socket.on('disconnect', function(socket) {
        console.log('user disconnected: ', this.id);
        console.log("RW: ", io.sockets.adapter.rooms.sockets)//Upon ending room, remove from rooms array
        // let roomWithPlayer = Object.keys(io.sockets.adapter.rooms).find(key => {
        //     if(io.sockets.adapter.rooms[key].sockets)
        // })
        // Object.keys(io.sockets.adapter.rooms).forEach(key => {
        //     console.log("Sockets: ", io.sockets.adapter.rooms[key].sockets)
        // })
    });

    socket.on('findQueue', () => {
        let foundGame = 0;
        rooms.forEach(room => {
            if(io.sockets.adapter.rooms[room].length < 2){
                //Join room and start game since queue has two players
                socket.join(room)
                foundGame = 1
                io.sockets.in(room).emit('startGame');
            }
        })

        if(rooms.length === 0 || foundGame === 0){
            socket.join(`room-${++roomNumber}`)
            rooms.push(`room-${roomNumber}`)
        }
        
        rooms.forEach(room => {
            console.log(io.sockets.adapter.rooms[room])
        })

        console.log("ROOMS")
        rooms.forEach(room => {
            console.log(room)
        })
    })
})

http.listen(8080, function(){
    console.log("Listening")
})
