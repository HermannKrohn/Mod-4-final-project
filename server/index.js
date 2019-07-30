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
    
    socket.on('disconnect', function() {
        let DCedSocketRoom
        console.log('user disconnected: ', this.id);
        // console.log("RW: ", io.sockets.adapter.rooms.sockets)//Upon ending room, remove from rooms array
        // let roomWithPlayer = Object.keys(io.sockets.adapter.rooms).find(key => {
        //     if(io.sockets.adapter.rooms[key].sockets)
        // })
        // Object.keys(io.sockets.adapter.rooms).forEach(key => {
        //     console.log("Sockets: ", io.sockets.adapter.rooms[key].sockets)
        // })

        // console.log(io.sockets.adapter.rooms)
        // DCedSocketRoom = rooms.map( roomObj => {
        //     if(roomObj.p1 === this.id || roomObj.p2 === this.id){
        //         return roomObj.roomNum
        //     }
        // })

        // console.log("KEY: ", DCedSocketRoom)

        // delete io.sockets.adapter.rooms[DCedSocketRoom];

        // console.log("The One: ", io.sockets.adapter.rooms)
    });

    socket.on('findQueue', function() {
        let foundGame = 0;
        let socID = this.id
        rooms.forEach(room => {
            if(room.p2 === null){
                //Join room and start game since queue has two players
                socket.join(room.roomNum)
                room.p2 = socID
                foundGame = 1
                socket.emit('gameQueue', {
                    queue: rooms[rooms.length-1].roomNum
                })
                io.sockets.in(room.roomNum).emit('startGame');
            }
        })

        if(rooms.length === 0 || foundGame === 0){
            socket.join(`room-${++roomNumber}`)
            rooms.push({
                roomNum: `room-${roomNumber}`,
                p1: socID,
                p2: null
            })
            socket.emit('gameQueue', {
                queue: rooms[rooms.length-1].roomNum
            })
        }
        
        // rooms.forEach(room => {
            // console.log(io.sockets.adapter.rooms)
        // })

        // console.log("ROOMS")
        // rooms.forEach(room => {
        //     console.log(room)
        // })
    })

    socket.on('playerMovement', function(data){
        // io.sockets.in(data.queue).broadcast({
        //     x: data.x,
        //     y: data.y
        // })
        socket.broadcast.to(data.queue).emit('updateOpponent', {
            x: data.x,
            y: data.y
        });
        // socket.to(data.queue).emit('updateOpponent', {
        //     x: data.x,
        //     y: data.y
        // });
        // socket.to('game').emit('nice game', "let's play a game")
    })
})

http.listen(8080, function(){
    console.log("Listening")
})
