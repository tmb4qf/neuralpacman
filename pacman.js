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

var CHASE = 1;
var SCATTER = 2;
var FRIGHTENED = 3;

var timing = [7,20,7,20,5,20,5];
var div = document.getElementById('canvas');
var game1;

function Location(x,y)
{
	this.x = x;
	this.y = y;
}

function Game(){	
	this.pacman = new Agent(squareToPixels(PACMAN_START), 80, 0, '#FFFB14', 0, pacmanTrav);
	this.blinky = new Agent(squareToPixels(BLINKY_START), 75, 0, '#FF1212',0, blinkyTrav);
	this.pinky = new Agent(squareToPixels(PINKY_START), 75, 0, '#FFA8C7',0, pinkyTrav);
	this.inky = new Agent(squareToPixels(INKY_START), 75, 0, '#78FFFE',0, inkyTrav);
	this.clyde = new Agent(squareToPixels(CLYDE_START), 75, 0, '#FFC17D',0, clydeTrav);
	
	this.dots;
	this.energizers;
	this.mode;
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

Game.prototype.changeMode = function(mode){
	this.mode = mode;
	this.pacman.mode = mode;
	this.blinky.mode = mode;
	this.pinky.mode = mode;
	this.inky.mode = mode;
	this.clyde.mode = mode;
	
	if(mode == FRIGHTENED){
		this.blinky.color = '#2F1CFF';
		this.pinky.color = '#2F1CFF';
		this.inky.color = '#2F1CFF';
		this.clyde.color = '#2F1CFF';
		
		this.blinky.velocity = 50;
		this.pinky.velocity = 50;
		this.inky.velocity = 50;
		this.clyde.velocity = 50;
	}
	else if(mode == CHASE || mode == SCATTER){
		this.blinky.color = '#FF1212';
		this.pinky.color = '#FFA8C7';
		this.inky.color = '#78FFFE';
		this.clyde.color = '#FFC17D';
		
		this.blinky.velocity = 75;
		this.pinky.velocity = 75;
		this.inky.velocity = 75;
		this.clyde.velocity = 75;
	}
}


function Agent(location, velocity, direction, color, mode, traversal){
	this.location = location;
	this.velocity = velocity;
	this.direction = direction;
	this.color = color;
	this.mode = mode;
	this.traversal = traversal;
}

Agent.prototype.updateLocation = function(){
	this.traversal(this.location, this.direction, this.velocity);
};

Agent.prototype.draw = function(){
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

function startGame(){
	scatterMode();
}

function chaseMode(){
	if(timing.length > 0){
		setTimeout(scatterMode, timing[0] * 1000);
		game1.changeMode(CHASE);
		timing.splice(0,1);
	}
	else
	{
		game1.changeMode(CHASE);
	}
}

function scatterMode(){
	if(timing.length > 0){
		setTimeout(chaseMode, timing[0] * 1000);
		game1.changeMode(SCATTER);
		timing.splice(0,1);
	}
}


function pacmanTrav(location, direction, velocity){
	switch(direction){
		case UP:
			location.x -= velocity * .03;
			break;
		case DOWN: 
			location.x += velocity * .03;
			break;
		case RIGHT:
			location.y += velocity * .03;
			break;
		case LEFT:
			location.y -= velocity * .03;
			break;
	}
}

function blinkyTrav(){
	
}

function pinkyTrav(){
	
}

function inkyTrav(){
	
}

function clydeTrav(){
	
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
		case 13:
			game1.pacman.velocity = 0;
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






