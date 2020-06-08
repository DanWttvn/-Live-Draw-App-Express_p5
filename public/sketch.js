var socket;

function setup() {
	createCanvas(500, 500);
	background(51)

	socket = io.connect("http://localhost:3000")

	// Receives and displays
	socket.on("mouse", data => {
		console.log("receiving" + data.x + "," + data.y);

		noStroke()
		fill(255, 0, 100);
		ellipse(data.x, data.y, 36, 36)
	})
}

// Draws and sends
function mouseDragged() {
	console.log("sending" + mouseX + "," + mouseY);
	
	let data = {
		x: mouseX,
		y: mouseY
	}

	// Only sends the mouse position
	socket.emit("mouse", data);

	noStroke()
	fill(255);
	ellipse(mouseX, mouseY, 36, 36)
}
