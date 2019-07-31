import socketIO from 'socket.io-client'

export const io = socketIO('http://localhost:8080')
