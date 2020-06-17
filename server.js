const express = require("express")
const socket = require("socket.io")
const http = require("http");

const port = process.env.PORT || 5000; 

const app = express();
const server = http.createServer(app)
const io = socket(server)


const bodyParser = require("body-parser"); //ahora express icluye bodyparse, pero bueno. habria que cambiar el app.use(bodyp->express.json())
const cors = require("cors");
// const path = require("path")


// const db = require("./config/keys").mongoURI;
// const mongoose = require("mongoose");


app.use(bodyParser.json()); //para poder leer ,manda json
app.use("/uploads", express.static("uploads")) // make uploads public
app.use(
	bodyParser.urlencoded({ //urlencoded es que te pone name&apellido?xxx en lugar de un json object
		extended: true
	})
);
app.use(cors());



// mongoose.connect(db, { // db = my key
// 	useNewUrlParser: true, 
// 	useCreateIndex: true, 
// 	useUnifiedTopology: true 
// })
//     .then(() => console.log('Connection to Mongo DB established'))
//     .catch(err => console.log(err));

	



//When someone connects
// io.sockets.on("connection", socket => {
io.sockets.on("connection", socket => {
	console.log(`new connection ${socket.id}`);

	// Server receiving the data from the client when the drawing...
	socket.on("drawing", data => {
		// emiting what the server receives to all the connections
		socket.broadcast.emit("drawing", data);
		// This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");
	})
})


// DEPLOY
// Serve statuc asssets if in production
if (process.env.NODE_ENV === "production") {
	//set static folder
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	});
}




app.listen(port, () => {
	console.log("Server running on " + port + " port");
});
