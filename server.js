const express = require("express")

const app = express();
const server = app.listen(3000);

app.use(express.static("public"))

console.log("running");


const socket = require("socket.io")
const io = socket(server)

//When someone connects
io.sockets.on("connection", (socket) => {
	console.log(`new connection ${socket.id}`);

	// Server receiving the data from the client when the mouse...
	socket.on("mouse", mouseMsg)
	function mouseMsg(data) {
		// emiting what the server receives to al the connections
		socket.broadcast.emit("mouse", data);
		// This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");
		console.log(data);
	}
}