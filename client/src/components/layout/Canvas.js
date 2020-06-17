import React, { useEffect, useRef, useState } from 'react';
import io from "socket.io-client"

//todo: TRADUCIR esto a react https://github.com/FaztWeb/nodejs-websockets-drawing/blob/master/src/public/index.js 

// let socket;

const Canvas = () => {

	// // socket = io.connect("http://localhost:5000")
	// let socket = io("http://localhost:5000")
	// //<----------- Live Data --------->//

	// // Socket IO
	// // let socket = io();

	// // --- Receiving Data --- //
	// // useEffect(() => {
	// 	socket.on('drawing', data => {
	// 		console.log("receiving" + data.x + "," + data.y);

	// 		contextRef.current.beginPath()
	// 		// Move to the prevPosition of the mouse
	// 		contextRef.current.moveTo(prevPos.x, prevPos.y)
	// 		// Draw a line to the current position of the mouse
	// 		contextRef.current.lineTo(data.x, data.y)
	// 		// Visualize the line using the strokeStyle
	// 		contextRef.current.stroke()
	// 	});
	// // }, [data])
	
	//<----------- Drawing functionalities --------->//

	// Hooks: const refContainer = useRef(initialValue);
	const canvasRef = useRef(null)
	const contextRef = useRef(null)
	const [isDrawing, setIsDrawing] = useState(false)
	//? x e y 
	const [prevPos, setPrevPos] = useState({x: null, y: null})
	
	useEffect(() => {
		const canvas = canvasRef.current

		//? To support computers with higher screen density. sin esto sale el doble de grande
		canvas.width = window.innerWidth * 2;
		canvas.height = window.innerHeight * 2;
		// canvas.width = 900;
		// canvas.height = 900;
		canvas.style.width = `${window.innerWidth}px`;
		canvas.style.height = `${window.innerHeight}px`;

		const ctx = canvas.getContext("2d")
		ctx.scale(2,2) //? screen density
		ctx.lineCap = "round"
		ctx.strokeStyle = "black"
		ctx.lineWidth = 5
		contextRef.current = ctx
	}, [])

	const startDrawing = ({ nativeEvent }) => {
		console.log("start");
		
		setIsDrawing(true)
		let x = nativeEvent.offsetX || nativeEvent.targetTouches[0].pageX;
		let y = nativeEvent.offsetY || nativeEvent.targetTouches[0].pageY;
		setPrevPos({x, y})
	}

	const draw = ({ nativeEvent }) => {
		
		if(!isDrawing) return
		console.log("drawing");

		// mouse || touch
		//todo: me da error si se sale del canvas (en movil)
		let x = nativeEvent.offsetX || nativeEvent.targetTouches[0].pageX;
		let y = nativeEvent.offsetY || nativeEvent.targetTouches[0].pageY;

		contextRef.current.beginPath()
		// Move to the prevPosition of the mouse
		contextRef.current.moveTo(prevPos.x, prevPos.y)
		// Draw a line to the current position of the mouse
		contextRef.current.lineTo(x, y)
		// Visualize the line using the strokeStyle
		contextRef.current.stroke()
		setPrevPos({x, y})
	}

	const finishDrawing = () => {
		console.log("finish");
		
		contextRef.current.closePath() // contextRef.current.beginPath()
		setIsDrawing(false)
	}


	return (
		<canvas id="whiteboard"
			onMouseDown={startDrawing}
			onTouchStart={startDrawing}
			onMouseUp={finishDrawing}
			onTouchEnd={finishDrawing}
			onMouseMove={draw}
			onTouchMove={draw}
			ref={canvasRef}
		/>
	);
}

export default Canvas;
