var SQUARE_SIZE = 16;
var PACMAN_START = 741.5;
var BLINKY_START = 405.5;
var PINKY_START = 489.5;
var INKY_START = 487.5;
var CLYDE_START = 491.5;
var UP = 1;
var RIGHT = 2;
var DOWN = 3;
var LEFT = 4;
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

Game.prototype.updateAgentsLocation = function(){
	this.pacman.updateLocation();
	this.blinky.updateLocation();
	this.pinky.updateLocation();
	this.inky.updateLocation();
	this.clyde.updateLocation();
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

Agent.prototype.updateLocation = function(){
	switch(this.direction){
		case UP:
			this.location.x -= this.velocity * .03;
			break;
		case DOWN: 
			this.location.x += this.velocity * .03;
			break;
		case RIGHT:
			this.location.y += this.velocity * .03;
			break;
		case LEFT:
			this.location.y -= this.velocity * .03;
			break;
	}
};

Agent.prototype.draw = function(location){
	fill(this.color);
	noStroke();
	ellipse(this.location.x, this.location.y, 28, 28);
};

function Dot(location, size){
	this.location = location;
	this.size = size;
}


function draw(){
	clear();
	game1.updateAgentsLocation();
	game1.drawAgents();
}

function setup(){
	canvas = createCanvas(div.scrollWidth, div.scrollHeight);
	canvas.parent('canvas');
	frameRate(30);
	
	game1 = new Game();
	game1.drawAgents();
}


//event listener for arrow keys
document.addEventListener("keydown", function(e){
	e.preventDefault();
	switch(e.keyCode) {
		case 37:
			game1.pacman.direction = UP;
			game1.pacman.velocity = 80;
		break;
		case 38:
			game1.pacman.direction = LEFT;
			game1.pacman.velocity = 80;
		break;
		case 39:
			game1.pacman.direction = DOWN;
			game1.pacman.velocity = 80;
		break;
		case 40:
			game1.pacman.direction = RIGHT;
			game1.pacman.velocity = 80;
		break;
	}
});





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






