var pacmanMap = document.getElementById('pacmanMap');
var BOARD_WIDTH = pacmanMap.width;
var BOARD_HEIGHT = pacmanMap.height;
var SQUARE_SIZE = 16;
var panel = new jsgl.Panel(pacmanMap);

//pacman object
function Pacman(location){
	this.location = location;
}

Pacman.prototype.draw = function(squareNum){
	this.location = squareNum;
	
	circle = panel.createCircle();
	var coords = squareToPixels(squareNum);
	circle.setCenterLocationXY(coords[0], coords[1]);
    circle.setRadius(13);
    circle.getFill().setColor("rgb(255,251,0)");
    panel.addElement(circle);
};

function Ghost(id){
	this.id = id;
	this.location = location;
}

Ghost.prototype.draw = function(squareNum, color){
	this.location = squareNum;
	
	circle = panel.createCircle();
	var coords = squareToPixels(squareNum);
	circle.setCenterLocationXY(coords[0], coords[1]);
    circle.setRadius(13);
    circle.getFill().setColor(color);
    panel.addElement(circle);
};

main();
function main(){
	var pacman = new Pacman(575);
	var blinky = new Ghost(400);
	var pinky = new Ghost(403);
	var inky = new Ghost(406);
	var clyde = new Ghost(409);
	
	pacman.draw(575);
	blinky.draw(400, 'rgb(247, 10, 10)');
	pinky.draw(403, 'rgb(255, 173, 236)');
	inky.draw(406, 'rgb(96, 252, 252)');
	clyde.draw(409, 'rgb(255, 170, 79)');
	
}

//Common useful functions
function squareToPixels(squareNum){
	var col = squareNum % 28;
	var row = Math.ceil(squareNum / 28);
	var x = (col * SQUARE_SIZE) - (.5 * SQUARE_SIZE);
	var y = (row * SQUARE_SIZE) - (.5 * SQUARE_SIZE);
	
	return [x,y];
}

function pixelsToSquare(x, y){
	var col = Math.ceil(x / SQUARE_SIZE);
	var row = Math.ceil(y / SQUARE_SIZE);
	
	return (row * 28 + col);
}