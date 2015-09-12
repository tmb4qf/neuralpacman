var PACMAN_START = 741.5;
var BLINKY_START = 405.5;
var PINKY_START = 489.5;
var INKY_START = 487.5;
var CLYDE_START = 491.5;

var CHASE = 1;
var SCATTER = 2;
var FRIGHTENED = 3;
var RESET = 4;

var stopwatch1;
var intersection = [118,133,225,230,233,236,239,242,245,250,314,329,482,485,494,497,569,578,650,653,662,665,734,737,746,749,815,836,908,911];

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
					 0,0,0,0,0,0,1,0,0,1,0,0,0,1,1,0,0,0,1,0,0,1,0,0,0,0,0,0,
					 0,0,0,0,0,0,1,0,0,1,0,0,0,1,1,0,0,0,1,0,0,1,0,0,0,0,0,0,
					 1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,
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

var div1 = document.getElementById('canvas1');
var div2 = document.getElementById('canvas2');
var container = document.getElementById('container');
var game1;

function Location(x,y)
{
	this.x = x;
	this.y = y;
}

function Game(origin){	
	this.pacman = new Agent(this, squareToPixels(origin, PACMAN_START), 0, 4, '#FFFB14', 0, pacmanTrav, null, 0, 0, null);
	this.blinky = new Agent(this, squareToPixels(origin, BLINKY_START), 0, 4, '#FF1212', SCATTER, ghostTrav, blinkyAlgo, 0, 26, null);
	this.pinky = new Agent(this, squareToPixels(origin, PINKY_START), 0, 1, '#FFA8C7', SCATTER, ghostTrav, pinkyAlgo, 0, 2, null);
	this.inky = new Agent(this, squareToPixels(origin, INKY_START), 0, 2, '#78FFFE', SCATTER, ghostTrav, inkyAlgo, 0, 979, 1);
	this.clyde = new Agent(this, squareToPixels(origin, CLYDE_START), 0, 4, '#FFC17D', SCATTER, ghostTrav, clydeAlgo, 0, 952, 1);
	
	this.origin = origin;
	this.dots;
	this.energizers;
	this.mode;
	this.lives = 3;
	this.timer = 0;
	this.score = 0;
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

Game.prototype.drawGameData = function(){
	for(var i=0; i < this.lives - 1; ++i){
		fill('#FFFB14');
		ellipse(height*.1 + AGENT_SIZE * 1.5 * i, height * .97222, AGENT_SIZE, AGENT_SIZE);
	}
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
	else if(mode == RESET){
		this.pacman.velocity = 0;
		this.blinky.velocity = 0;
		this.pinky.velocity = 0;
		this.inky.velocity = 0;
		this.clyde.velocity = 0;
	}
}

Game.prototype.reverseDirection = function(){
	this.blinky.direction = oppositeDir(this.blinky.direction);
	this.pinky.direction = oppositeDir(this.pinky.direction);
	this.inky.direction = oppositeDir(this.inky.direction);
	this.clyde.direction = oppositeDir(this.clyde.direction);
}


function Agent(game, location, velocity, direction, color, mode, traversal, algo, turning, target, nextDir){
	this.game = game;
	this.location = location;
	this.velocity = velocity;
	this.direction = direction;
	this.color = color;
	this.mode = mode;
	this.traversal = traversal;
	this.algo = algo;
	this.turning = turning;
	this.target = target;
	this.nextDir = nextDir;
}

Agent.prototype.updateLocation = function(){
	this.traversal(this);
};

Agent.prototype.moveStep = function(){
	switch(this.direction){
		case 1:
			this.location.y -= this.velocity * AGENT_SPEED;
			break;
		case 2:
			if(pixelsToSquare(this.game.origin, this.location) == 503){
				this.location = squareToPixels(this.game.origin, 476);
			}
			this.location.x += this.velocity * AGENT_SPEED;
			break;
		case 3: 
			this.location.y += this.velocity * AGENT_SPEED;
			break;
		case 4:
			if(pixelsToSquare(this.game.origin, this.location) == 476){
				this.location = squareToPixels(this.game.origin, 503);
			}
			this.location.x -= this.velocity * AGENT_SPEED;
			break;
	}	
}

Agent.prototype.draw = function(){
	fill(this.color);
	ellipse(this.location.x, this.location.y, AGENT_SIZE, AGENT_SIZE);
};

function Dot(location, size){
	this.location = location;
	this.size = size;
}

function pacmanTrav(agent){
	var space = spacePosition(agent.location);
	if(validMove(agent, agent.direction) || !isCentered(space, agent.direction)){
		agent.moveStep();
	}
	if(agent.turning){
		center(agent, space);
		agent.turning = false;
		agent.game.score++;
	}
}

function sideTunnelAdjust(agent,currentSquare){
	if((currentSquare >= 476 && currentSquare <= 480) || (currentSquare >= 499 && currentSquare <= 503))
		agent.velocity = 40;
	else if(agent.mode == CHASE || agent.mode == SCATTER)
		agent.velocity = 75;
	else if(agent.mode == FRIGHTENED)
		agent.velocity = 50;
}
function eatenPacman(game, currentSquare){
	var pacman = game.pacman;
	if(currentSquare == pixelsToSquare(game.origin, pacman.location))
		lifeLost(game);
}

function ghostTrav(){
	var agent = this;
	var currentSquare = pixelsToSquare(agent.game.origin, agent.location);
	
	eatenPacman(agent.game, currentSquare);
	sideTunnelAdjust(agent,currentSquare);
	
	var next = nextSquare(agent.direction, currentSquare);
	var space = spacePosition(agent.location);

	if(agent.nextDir != null){ //if instruction was sent to change direction
		if(validMove(agent, agent.nextDir) && isCentered(space, agent.direction)){
			agent.direction = agent.nextDir;
			agent.nextDir = null;
			agent.moveStep();
		}
		else{
			agent.moveStep();
		}
	}
	else if(intersection.indexOf(next) > 0){	//if at intersection, evaluate which way to go
		agent.target = this.algo(agent);
		var adjSquare = adjSquares(next);
		dirToTarget(agent, adjSquare);
		if(validMove(agent, agent.direction)){
			agent.moveStep();
		}
	}
	else if(validMove(agent, agent.direction)){	//if valid move, continue in current direction
		agent.moveStep();
	}
	else{	//else agent has run into a wall but not an intersection, find correct direction to take
		var oppDir = oppositeDir(agent.direction);
		if(!isCentered(space, agent.direction))
			agent.moveStep();
		else{
			for(var i = 1; i <= 4; ++i){
				if(i != oppDir && pacmanMap[nextSquare(i, currentSquare)] == 1){
					agent.direction = i;
					center(agent, spacePosition(agent.location));
				}
			}
		}
	}
}

function dirToTarget(agent, adjSquare){
	var min = -1;
	var dir;
	var oppDir = oppositeDir(agent.direction);
	for(var i = 0; i < 4; ++i){
		if((i+1) != oppDir && adjSquare[i] >= 0){
			var dist = distance(squareToPixels(agent.game.origin, agent.target), squareToPixels(agent.game.origin, adjSquare[i]));
			if(dist < min || min == -1 || (dist <= min && (i+1 == 1 || i+1 > dir))){
				min = dist;
				dir = i + 1;
			}
		}	
	}
	agent.nextDir = dir;
}

function adjSquares(square){
	var adjSquare= []
	
	if(pacmanMap[square - 28] == 1)
		adjSquare.push(square - 28);
	else
		adjSquare.push(-1);
	
	if(pacmanMap[square + 1] == 1)
		adjSquare.push(square + 1);
	else
		adjSquare.push(-1);
	
	if(pacmanMap[square + 28] == 1)
		adjSquare.push(square + 28);
	else
		adjSquare.push(-1);
	
	if(pacmanMap[square - 1] == 1)
		adjSquare.push(square - 1);
	else
		adjSquare.push(-1);
	
	return adjSquare;
}

function blinkyAlgo(agent){
	if(agent.mode == CHASE){
		var target = pixelsToSquare(agent.game.origin, agent.game.pacman.location);
		return target;
	}
	else if(agent.mode == SCATTER){
		return 26;
	}
}

function pinkyAlgo(agent){
	if(agent.mode == CHASE){
		var target;
		switch(agent.direction){
			case 1:
				target = pixelsToSquare(agent.game.origin, agent.game.pacman.location) - (28 * 4) - 4;
				break;
			case 2:
				target = pixelsToSquare(agent.game.origin, agent.game.pacman.location) + 4;
				break;
			case 3:
				target = pixelsToSquare(agent.game.origin, agent.game.pacman.location) + (28 * 4);
				break;
			case 4:
				target = pixelsToSquare(agent.game.origin, agent.game.pacman.location) - 4;
				break;
		}
		return target;
	}
	else if(agent.mode == SCATTER){
		return 2;
	}
}

function inkyAlgo(agent){
	if(agent.mode == CHASE){
		var midpoint;
		switch(agent.direction){
			case 1:
				midpoint = pixelsToSquare(agent.game.origin, agent.location) - (28 * 2) - 2;
				break;
			case 2:
				midpoint = pixelsToSquare(agent.game.origin, agent.location) + 2;
				break;
			case 3:
				midpoint= pixelsToSquare(agent.game.origin, agent.location) + (28 * 2);
				break;
			case 4:
				midpoint = pixelsToSquare(agent.game.origin, agent.location) - 2;
				break;
		}
		var midPix = squareToPixels(agent.game.origin, midpoint);
		var blinkyLoc = agent.location;

		var x = 2 * (midPix.x - blinkyLoc.x) + blinkyLoc.x;
		var y = 2 * (midPix.y - blinkyLoc.y) + blinkyLoc.y;
		var loc = new Location(x,y);
		var target = pixelsToSquare(agent.game.origin, loc);
		return target;
	}
	else if(agent.mode == SCATTER){
		return 979;
	}
}

function clydeAlgo(agent){
	if(agent.mode == CHASE && distance(agent.game.pacman.location, agent.location) > (8 * SQUARE_SIZE)){
		var target = pixelsToSquare(agent.game.origin, agent.game.pacman.location);
		return target;
	}
	return 952;
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

function nextSquare(dir, currentSquare){
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
	return attemptedSquare;
}

function validMove(agent, dir){
	var currentSquare = pixelsToSquare(agent.game.origin, agent.location);
	var attemptedSquare = nextSquare(dir, currentSquare);
	
	if(pacmanMap[attemptedSquare] == 1 || (currentSquare == 503 && dir == 2) || (currentSquare == 476 && dir == 4)){
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


function draw(){
		keyCheck();
		clear();
		game1.updateAgentsLocation();
		game1.drawAgents();
		game1.drawGameData();
		
}

function setup(){
	canvas = createCanvas(container.scrollWidth, container.scrollHeight);
	canvas.parent('canvas1');
	frameRate(30);
	noStroke();
	
	var origin1 = new Location(0,0);
	var origin2 = new Location(width - div2.scrollWidth,0);
	
	game1 = new Game(origin1);
	game2 = new Game(origin2);
	
	game1.changeMode(RESET);
	game2.changeMode(RESET);
	
	game1.drawAgents();
	game1.drawGameData();
	noLoop();
}

function lifeLost(game){
	noLoop();
	clearInterval(stopwatch1);
	game.timer = 0;
	game.changeMode(RESET);
	game.lives--;
	
	if(game.lives > 0){
		setTimeout(function(){
			game.pacman.location = squareToPixels(game.origin, PACMAN_START);
			game.pacman.direction = 4;
			
			game.blinky.location = squareToPixels(game.origin, BLINKY_START);
			game.blinky.direction = 4;
			
			game.pinky.location = squareToPixels(game.origin, PINKY_START);
			game.pinky.direction = 1;
			
			game.inky.location = squareToPixels(game.origin, INKY_START);
			game.inky.direction = 2;
			game.inky.nextDir = 1;
			
			game.clyde.location = squareToPixels(game.origin, CLYDE_START);
			game.clyde.direction = 4;
			game.clyde.nextDir = 1;
			
			clear();
			game.drawAgents();
			game.drawGameData();
		}, 1000);
	}
	else{
		console.log("dead");
		clear();
	}
}

function newLife(game){
	loop();
	game.changeMode(SCATTER);
	console.log("SCATTER");
	stopwatch1 = setInterval(function(){
		game.timer++;
		console.log(game.timer);
		if(game.timer == 7 || game.timer == 34 || game.timer == 59 || game.timer == 84){
			game.changeMode(CHASE);
			game.reverseDirection();
			console.log("CHASE");
		}
		else if(game.timer == 27 || game.timer == 54 || game.timer == 79){
			game.changeMode(SCATTER);
			game.reverseDirection();
			console.log("SCATTER");
		}
	}, 1000);
}

function keyCheck(){
	if(keyIsDown(LEFT_ARROW)){
		if(validMove(game1.pacman, 4))
		{
			game1.pacman.direction = 4;
			game1.pacman.turning = true;
		}
	}
	else if(keyIsDown(UP_ARROW)){
		if(validMove(game1.pacman, 1))
		{
			game1.pacman.direction = 1;
			game1.pacman.turning = true;
		}
	}
	else if(keyIsDown(RIGHT_ARROW)){
		if(validMove(game1.pacman, 2))
		{
			game1.pacman.direction = 2;
			game1.pacman.turning = true;
		}
	}
	else if(keyIsDown(DOWN_ARROW)){
		if(validMove(game1.pacman, 3))
		{
			game1.pacman.direction = 3;
			game1.pacman.turning = true;
		}
	}
	
}

//Common useful functions
function squareToPixels(origin, squareNum){
	var col = squareNum % 28;
	var row = Math.floor(squareNum / 28);
	
	var x = (col * SQUARE_SIZE) + (.5 * SQUARE_SIZE) + origin.x;
	var y = (row * SQUARE_SIZE) + (.5 * SQUARE_SIZE) + origin.y;
	
	var loc = new Location(x,y);
	return loc;
}

function pixelsToSquare(origin, location){
	var square;
	var temp = new Location(-1, -1);

	if(origin.x != 0 || origin.y != 0){
		temp.x = location.x - origin.x;
		temp.y = location.y - origin.y;
	}
	else{
		temp = location;
	}
	
		if(temp.x < 0)
			temp.x = 0;
		else if(temp.x > SQUARE_SIZE * 28)
			temp.x = SQUARE_SIZE * 28;
		
		if(temp.y < 0)
			temp.y = 0;
		else if(temp.y > SQUARE_SIZE * 36)
			temp.y = SQUARE_SIZE * 36;
		
		var col = Math.floor(temp.x / SQUARE_SIZE);
		var row = Math.floor(temp.y / SQUARE_SIZE);
		return (row * 28 + col);
}

function spacePosition(location){
	var x = location.x % SQUARE_SIZE;
	var y = location.y % SQUARE_SIZE;
	var space = new Location(x,y);
	return space;
}

function distance(loc1, loc2){
	var dist = Math.sqrt(Math.pow(loc1.x - loc2.x, 2) + Math.pow(loc1.y - loc2.y, 2));
	return dist;
}

function oppositeDir(dir){
	switch(dir){
		case 1:
			return 3;
			break;
		case 2:
			return 4;
			break;
		case 3:
			return 1;
			break;
		case 4:
			return 2;
			break;
	}
}

document.addEventListener("keypress", function(e){
	if(e.keyCode == 13 && game1.mode == RESET){
		newLife(game1);
		console.log("newLife")
	}
});