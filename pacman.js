var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

window.onload = function(){
	var pacmanBoardImg = document.getElementById('pacmanBoardImg');
	ctx.drawImage(pacmanBoardImg, 0, 0, canvas.width, canvas.height);
}