const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const user = []

io.on('connection', socket => {
    console.log('user connected : ', socket.id)
    socket.join('Bienvenue dans la Chatroom Socket IO :', () => {
        let rooms = Object.keys(socket.rooms);
        socket.emit('welcome', 'Bienvenue dans la room Socket IO !', io.clients().length)
        console.log(rooms); // [ <socket.id>, 'room 237' ]
    })
    socket.on('changePseudo', (data) => {
        console.log('Votre pseudo à été changé par : ' + data)
        var socket_id = socket.id;
        var username = data;
        user.push({
            id: socket_id,
            name: username
        })
    })

    socket.on('loaded', (data) => {
        console.log('data from client :', data)
    })
    socket.on('message', (data) => {
        console.log('message received', data)
        io.emit('message', data)
    })
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

http.listen(3000, () => {
    console.log('Server is up and running on http://localhost:3000')
})