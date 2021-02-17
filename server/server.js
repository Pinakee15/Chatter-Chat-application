const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const http = require("http").createServer(app);
const { addUser, findUser, showUser, deleteUser } = require('./User.js');
const cors = require('cors');

//Setting the socket io server

const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});

app.get("/", (req, res) => {
    res.send("this is the home page").status(200);
});

// Setting up the middleware
app.use(cors());
app.use(express.json());

// Handling the Chat socket.io APIs .

io.on("connection", (socket) => {

    console.log(`A new client with socket id ${socket} is added ..`);

    socket.on("join", (userName, room) => {

        if (userName === null || room === null || userName === "") {
            console.log('Null value hit...');
            socket.emit('redirect')
        }
        else {
            console.log(`The user ${userName} registered to the room ${room}`);
            socket.join(room);
            socket.to(room).emit('welcome', `${userName} has joined the room.`);
            addUser(socket.id, userName, room);
            console.log(showUser());
        }
    });

    socket.on('send message', (message, room, userName, callback) => {
        console.log(`Event fired and the values are ${message} and ${room}`);
        const user = findUser(socket.id);
        io.to(room).emit('message', message, userName); //to(room).
        callback();
    })

    socket.on('disconnect', () => {
        const user = findUser(socket.id);
        io.to(user.room).emit('user left', user.name)
        deleteUser(socket.id);
        console.log(`No of user : `, showUser());
        console.log("The user disconnected..");
        socket.emit('redirect');
    });
});

http.listen(port, () => console.log(`Listening on port ${port}`));

