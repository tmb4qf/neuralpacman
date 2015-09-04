var SQUARE_SIZE = 16;
var PACMAN_START = 741.5;
var BLINKY_START = 405.5;
var PINKY_START = 489.5;
var INKY_START = 487.5;
var CLYDE_START = 491.5;

var CHASE = 1;
var SCATTER = 2;
var FRIGHTENED = 3;

var timing = [7,20,7,20,5,20,5];

var pacmanMap = 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
					 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
					 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
					 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
					 0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,
					 0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,
					 0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,
					 0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,
					 0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
					 0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,
					 0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,
					 0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0,
					 0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,
					 0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,
					 0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,
					 0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,
					 0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,
					 1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,
					 0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,
					 0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,
					 0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,
					 0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,
					 0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,
					 0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,
					 0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,
					 0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,
					 0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,
					 0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,
					 0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,
					 0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0,
					 0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,
					 0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,
					 0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
					 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
					 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
					 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var div = document.getElementById('canvas');
var game1;

function Location(x,y)
{
	this.x = x;
	this.y = y;
}

function Game(){	
	this.pacman = new Agent(squareToPixels(PACMAN_START), 80, 0, '#FFFB14', 0, pacmanTrav, 0, 0);
	this.blinky = new Agent(squareToPixels(BLINKY_START), 75, 0, '#FF1212',0, blinkyTrav, 0, 26);
	this.pinky = new Agent(squareToPixels(PINKY_START), 75, 0, '#FFA8C7',0, pinkyTrav, 0, 2);
	this.inky = new Agent(squareToPixels(INKY_START), 75, 0, '#78FFFE',0, inkyTrav, 0, 1007);
	this.clyde = new Agent(squareToPixels(CLYDE_START), 75, 0, '#FFC17D',0, clydeTrav, 0, 980);
	
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
		
		this.pacman.velocity = 90;
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
		
		this.pacman.velocity = 80;
		this.blinky.velocity = 75;
		this.pinky.velocity = 75;
		this.inky.velocity = 75;
		this.clyde.velocity = 75;
	}
}


function Agent(location, velocity, direction, color, mode, traversal, turning, target){
	this.location = location;
	this.velocity = velocity;
	this.direction = direction;
	this.color = color;
	this.mode = mode;
	this.traversal = traversal;
	this.turning = turning;
	this.target = target;
}

Agent.prototype.updateLocation = function(){
	this.traversal();
};

Agent.prototype.draw = function(){
	fill(this.color);
	noStroke();
	ellipse(this.location.x, this.location.y, 25, 25);
};

function Dot(location, size){
	this.location = location;
	this.size = size;
}

function pacmanTrav(){
	var agent = game1.pacman;
	var space = spacePosition(agent.location);
	if(validMove(agent, agent.direction) || !isCentered(space, agent.direction)){
		switch(agent.direction){
			case 1:
				agent.location.y -= agent.velocity * .04;
				break;
			case 2:
				agent.location.x += agent.velocity * .04;
				break;
			case 3: 
				agent.location.y += agent.velocity * .04;
				break;
			case 4:
				agent.location.x -= agent.velocity * .04;
				break;
		}
	}
	if(agent.turning){
		center(agent, space);
		agent.turning = false;
	}
}

function center(agent, space)
{
	switch(agent.direction){
		case 1:
		case 3:
			agent.location.x += (.5 * SQUARE_SIZE - space.x);
			break;
		case 2:
		case 4:
			agent.location.y += (.5 * SQUARE_SIZE - space.y);
			break;
	}
	
}

function validMove(agent, dir){
	var currentSquare = pixelsToSquare(agent.location);
	var attemptedSquare;
	
	switch(dir){
		case 1:
			attemptedSquare = currentSquare - 28;
			break;
		case 2:
			attemptedSquare = currentSquare + 1;
			break;
		case 3:
			attemptedSquare = currentSquare + 28;
			break;
		case 4:
			attemptedSquare = currentSquare - 1;
			break;
	}
	
	if(pacmanMap[attemptedSquare] == 1){
		return true;
	}
	else{
		return false;
	}
}

function isCentered(space, dir){
	switch(dir){
		case 1:
			if(space.y <= (.6 * SQUARE_SIZE))
				return true;
			break;
		case 2:
			if(space.x >= (.4 * SQUARE_SIZE))
				return true;
			break;
		case 3:
			if(space.y >= (.4 * SQUARE_SIZE))
				return true;
			break;
		case 4:
			if(space.x <= (.6 * SQUARE_SIZE))
				return true;
			break;
	}
	return false;
}

function blinkyTrav(){
	
}

function pinkyTrav(){
	
}

function inkyTrav(){
	
}

function clydeTrav(){
	
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
	console.log("CHASE");
}

function scatterMode(){
	if(timing.length > 0){
		setTimeout(chaseMode, timing[0] * 1000);
		game1.changeMode(SCATTER);
		timing.splice(0,1);
	}
	console.log("SCATTER");
}


//event listener for arrow keys
document.addEventListener("keydown", function(e){
	e.preventDefault();
	switch(e.keyCode) {
		case 37:
			if(validMove(game1.pacman, 4)){
				game1.pacman.direction = 4;
				game1.pacman.turning = true;
			}
		break;
		case 38:
			if(validMove(game1.pacman, 1)){
				game1.pacman.direction = 1;
				game1.pacman.turning = true;
			}
		break;
		case 39:
			if(validMove(game1.pacman, 2)){
				game1.pacman.direction = 2;
				game1.pacman.turning = true;
			}
		break;
		case 40:
			if(validMove(game1.pacman, 3)){
				game1.pacman.direction = 3;
				game1.pacman.turning = true;
			}
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

function pixelsToSquare(location){
	var col = Math.floor(location.x / SQUARE_SIZE);
	var row = Math.floor(location.y / SQUARE_SIZE);
	return (row * 28 + col);
}

function spacePosition(location){
	var x = location.x % SQUARE_SIZE;
	var y = location.y % SQUARE_SIZE;
	var space = new Location(x,y);
	return space;
}
