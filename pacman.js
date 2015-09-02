var SQUARE_SIZE = 16;
var PACMAN_START = 741.5;
var BLINKY_START = 405.5;
var PINKY_START = 489.5;
var INKY_START = 487.5;
var CLYDE_START = 491.5;
var div = document.getElementById('canvas');
var game1;

function Location(x,y)
{
	this.x = x;
	this.y = y;
}

function Game(){	
	this.pacman = new Agent(squareToPixels(PACMAN_START), 0, 0, '#FFFB14', 0);
	this.blinky = new Agent(squareToPixels(BLINKY_START), 0, 0, '#FF1212',0);
	this.pinky = new Agent(squareToPixels(PINKY_START), 0, 0, '#FFC9DC',0);
	this.inky = new Agent(squareToPixels(INKY_START), 0, 0, '#A8FFFE',0);
	this.clyde = new Agent(squareToPixels(CLYDE_START), 0, 0, '#FCC78D',0);
	
	this.dots;
	this.energizers;
}

Game.prototype.drawAgents = function(){
	this.pacman.draw();
	this.blinky.draw();
	this.pinky.draw();
	this.inky.draw();
	this.clyde.draw();
}


function Agent(location, velocity, direction, color, state){
	this.location = location;
	this.velocity = velocity;
	this.direction = direction;
	this.color = color;
	this.state = state;
}

Agent.prototype.updatePosition = function(){
	
};

Agent.prototype.draw = function(location){
	fill(this.color);
	noStroke();
	ellipse(this.location.x, this.location.y, 28, 28);
	console.log("Drawing Pacman");
};

function Dot(location, size){
	this.location = location;
	this.size = size;
}


function draw(){

}

function setup(){
	canvas = createCanvas(div.scrollWidth, div.scrollHeight);
	canvas.parent('canvas');
	frameRate(30);
	
	game1 = new Game();
	game1.drawAgents();
}


//Common useful functions
function squareToPixels(squareNum){
	var col = squareNum % 28;
	var row = Math.floor(squareNum / 28);
	var x = (col * SQUARE_SIZE) + (.5 * SQUARE_SIZE);
	var y = (row * SQUARE_SIZE) + (.5 * SQUARE_SIZE);
	
	var loc = new Location(x,y);
	return loc;
}

function pixelsToSquare(x, y){
	var col = Math.ceil(x / SQUARE_SIZE);
	var row = Math.ceil(y / SQUARE_SIZE);
	
	return (row * 28 + col);
}

object.addEventListener("keypress", keyPress);

function keyPress(){
	e.preventDefault();
	switch(e.keyCode) {
		case 37:
			
		break;
		case 38:
			
		break;
		case 39:
			
		break;
		case 40:
			
		break;
}






