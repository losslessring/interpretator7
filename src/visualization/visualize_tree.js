import {syntaxTree} from '../main.js'

const treeTravel = (node, fn, depth, childIndex, arrayOfChildren, parentNodeDataFromOutside) => {
	
	//Глубина дерева - лежит в замыкании и не увеличивается при 
	// переборе массива детей в ширину.
	if(depth === undefined){
		var depth = 0 
	} else {
		depth = depth += 1
	}
	//console.log(childIndex) 
	parentNodeDataFromOutside = fn(node, depth, childIndex, arrayOfChildren, parentNodeDataFromOutside)
	//console.log(parentNodeDataFromOutside)
	//let parentDataFromOutside = fn(node, depth, childIndex)
	//console.log(parentDataFromOutside)
    if (node.children.length !== 0){
        node.children.forEach((child, childIndex, arrayOfChildren) => {
            treeTravel(child, fn, depth, childIndex, arrayOfChildren, parentNodeDataFromOutside)
        })
    } else return    
}

const initCanvas = (options) => {
	
	const {
			//container: container,
	 		width: width, 
		 	height: height, 
			background: background
		} = options
	
	// Create Canvas
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    document.body.appendChild(canvas)
    const ctx = canvas.getContext("2d")
    ctx.fillStyle = background
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	return ctx
}


const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 600
const CANVAS_BACKGROUND = "white"


const ctx = initCanvas({
	 		width: CANVAS_WIDTH, 
		 	height: CANVAS_HEIGHT, 
			background: CANVAS_BACKGROUND
		})

const ROOT_X = CANVAS_WIDTH / 3
const ROOT_Y = CANVAS_HEIGHT / 4
const RADIUS = 30

const initLine = (ctx, startX, startY) => {
	ctx.beginPath()
	ctx.moveTo(startX, startY)	
}


const drawCircle = (ctx, x, y, radius, color) => {
	ctx.beginPath()
	ctx.fillStyle = color
	ctx.arc(x, y, radius, 0, 2 * Math.PI)
	//ctx.stroke()
	ctx.fill()
}

const drawText = (ctx, x, y, fontSizeAndType, text, color) => {
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'
	ctx.font = fontSizeAndType
	ctx.fillStyle = color
	ctx.fillText(text, x, y)
}

const drawLine = (ctx, fromX, fromY, toX, toY, color = "black") => {
	ctx.beginPath()
	ctx.moveTo(fromX, fromY)	
	ctx.lineTo(toX, toY)
	ctx.strokeStyle = color
	ctx.stroke()
}

const drawNode = (options) => {
	
	const {
		ctx,
		x,
		y,
		radius,
		shapeColor,
		fontSizeAndType,
		text,
		textColor

	} = options
	
	drawCircle(ctx, x, y, radius, shapeColor)
	drawText(ctx, x, y, fontSizeAndType, text, textColor)
	return {x: x, y: y}
}

const childrenShiftCalc = (childIndex, arrayLength) => {
	if (childIndex < arrayLength /2)
		return childIndex - arrayLength
	if (childIndex === arrayLength /2)
		return 0
	if (childIndex > arrayLength /2)
		return childIndex
}

const normalize = (val, min, max, a, b) => {
	if (min === max){
		return 0
	}
	return ((b - a)*((val - min) / (max - min))) + a
}



const tree = { value:-1, 
			   children:[
						 {value: 0, children:[]},
						 {value: 0, children:[
							 					{value: 2, children:[
													{value: 4, children:[
														{value: 6, children:[]},
														{value: 6, children:[]},
													]},	 
												 ]},
												{value: 2, children:[]},
												{value: 2, children:[]},
												{value: 2, children:[]},
												{value: 2, children:[]},
											]}
					    ]}



const drawNodeWithEdges = function(node, depth, childIndex, arrayOfChildren, parentNodeData) { 
	
	const MULTIPLIER_X = 25
	const MULTIPLIER_Y = 100
	//const SHIFT_LEFT = -50

	// console.log(parentNodeData)
	if (parentNodeData === undefined){
		parentNodeData = {
			x: ROOT_X,
			y: ROOT_Y
		}
		
	}

	//console.log(arrayOfChildren)
	if (arrayOfChildren === undefined){
		arrayOfChildren = []
	}

	if (childIndex === undefined){
		childIndex = 0
	}
	
	//let shiftX = (childrenShiftCalc(childIndex, arrayOfChildren.length - 1)) * MULTIPLIER_X
	let shiftX = (normalize(childIndex, 0, arrayOfChildren.length - 1, -arrayOfChildren.length, arrayOfChildren.length)) * MULTIPLIER_X
	//console.log(arrayOfChildren.length - 1)
	console.log(shiftX)
	drawLine(ctx, parentNodeData.x , parentNodeData.y, parentNodeData.x + shiftX , ROOT_Y + depth * MULTIPLIER_Y, "firebrick")
	let parentCoords = drawNode({ctx: ctx, 
				x: parentNodeData.x + shiftX, 
				y: ROOT_Y + depth * MULTIPLIER_Y, 
				radius: RADIUS, 
				shapeColor: "firebrick",
				fontSizeAndType: "15px serif",
				text: node["data"],
				textColor: "black"
				
			})

	//console.log(parentCoords)
	//console.log(node.value)
	return parentCoords 
}


initLine(ctx, ROOT_X, ROOT_Y)

treeTravel(syntaxTree, drawNodeWithEdges)

// ЗАДАЧИ parentNode не нужен, переписать в функциональном стиле
