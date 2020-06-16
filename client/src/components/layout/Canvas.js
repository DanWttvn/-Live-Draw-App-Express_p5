import React, { useEffect, useRef, useState } from 'react';
import io from "socket.io-client"
let socket;

//todo: TRADUCIR esto a react https://github.com/FaztWeb/nodejs-websockets-drawing/blob/master/src/public/index.js 
const Canvas = () => {
	//<----------- Live functionalities --------->//
	// const ENDPOINT = "localhost:5000"
	// useEffect(() => {
	// 	// const { name, room } = queryString.parse(location.search);
	// 	socket = io(ENDPOINT)

	// 	// setName(name)
	// 	// setRoom(room)

	// 	return () => { // esto se activa cuando salgo del component
	// 		socket.emit("disconnect") //mismo nombre que en index BE
	// 		socket.off();
	// 	}
	// }, [ENDPOINT
	// 	// , location.search
	// 	])

	//<----------- Drawing functionalities --------->//

	// Hooks: const refContainer = useRef(initialValue);
	const canvasRef = useRef(null)
	const contextRef = useRef(null)
	const [isDrawing, setIsDrawing] = useState(false)
	//? x e y 
	// const [mousePos, setMousePos] = useState({x: null, y: null})

	useEffect(() => {
		const canvas = canvasRef.current

		//? To support computers with higher screen density:
		canvas.width = window.innerWidth * 2;
		canvas.height = window.innerHeight * 2;
		canvas.style.width = `${window.innerWidth}px`;
		canvas.style.height = `${window.innerHeight}px`;

		const context = canvas.getContext("2d")
		context.scale(2,2) //? screen density
		context.lineCap = "round"
		context.strokeStyle = "black"
		context.lineWidth = 5
		contextRef.current = context
	}, [])

	const startDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent
		contextRef.current.beginPath()
		contextRef.current.moveTo(offsetX, offsetY)
		setIsDrawing(true)
	}

	const finishDrawing = () => {
		contextRef.current.closePath()
		setIsDrawing(false)
	}

	const draw = ({ nativeEvent }) => {
		if(!isDrawing) return
		// const { offsetX, offsetY } = nativeEvent
		let mousePos = {
			x: nativeEvent.offsetX,
			y: nativeEvent.offsetY
		}
		// setMousePos(mousePos)
		socket.emit("mouse", mousePos);

		contextRef.current.lineTo(mousePos.x, mousePos.y)
		contextRef.current.stroke()
	}

	return (
		<canvas
			onMouseDown={startDrawing}
			onMouseUp={finishDrawing}
			onMouseMove={draw}
			ref={canvasRef}
		/>
	);
}

export default Canvas
