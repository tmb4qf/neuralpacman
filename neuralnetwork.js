var trainingMode = true;

function Network(){
	this.inputNum = 31;
	this.outputNum = 8;
	
	this.input = new convnetjs.Vol(1,1,this.inputNum,0);
	this.output = convnetjs.zeros(this.outputNum);
	this.prevOutput = convnetjs.zeros(this.outputNum);
	
	this.layers = [];
	this.layers.push({type: 'input', out_sx: 1, out_sy: 1, out_depth: this.inputNum});
	this.layers.push({type: 'fc', num_neurons: this.outputNum, activation: 'relu'});
	
	this.net = new convnetjs.Net();
	this.net.makeLayers(this.layers);
	console.log(this.net.layers[1].filters);
	this.chromosome = new Chromosome();
	this.assignChromosome(this.chromosome);
}

Network.prototype.forward = function(){
	var out = this.net.forward(this.input);
	
	for(var i=0; i < this.outputNum; i++){
		this.prevOutput[i] = this.output[i];
		this.output[i] = out.w[i];
	}
}

Network.prototype.setInput = function(game){
	var scaleX = SQUARE_SIZE * 28;
	var scaleY = SQUARE_SIZE * 36;
	var scaleDir = 4;
	
	this.input.w[0] = (game.pacman.location.x - game.origin.x) / scaleX;
	this.input.w[1] = (game.pacman.location.y - game.origin.y) / scaleY;
	this.input.w[2] = game.pacman.direction / scaleDir;
	
	this.input.w[3] = (game.blinky.location.x - game.origin.x) / scaleX;
	this.input.w[4] = (game.blinky.location.y - game.origin.y) / scaleY;
	this.input.w[5] = game.blinky.direction / scaleDir;
	var blinkyTar = squareToPixels(game.blinky.target)
	this.input.w[6] = (blinkyTar.x - game.origin.x) / scaleX;
	this.input.w[7] = (blinkyTar.y - game.origin.y) / scaley;
	
	this.input.w[8] = (game.pinky.location.x - game.origin.x) / scaleX;
	this.input.w[9] = (game.pinky.location.y - game.origin.y) / scaleY;
	this.input.w[10] = game.pinky.direction / scaleDir;
	var pinkyTar = squareToPixels(game.pinky.target)
	this.input.w[11] = (pinkyTar.x - game.origin.x) / scaleX;
	this.input.w[12] = (pinkyTar.y - game.origin.y) / scaley;
	
	this.input.w[13] = (game.inky.location.x - game.origin.x) / scaleX;
	this.input.w[14] = (game.inky.location.y - game.origin.y) / scaleY;
	this.input.w[15] = game.inky.direction / scaleDir;
	var inkyTar = squareToPixels(game.inky.target)
	this.input.w[16] = (inkyTar.x - game.origin.x) / scaleX;
	this.input.w[17] = (inkyTar.y - game.origin.y) / scaley;
	
	this.input.w[18] = (game.clyde.location.x - game.origin.x) / scaleX;
	this.input.w[19] = (game.clyde.location.y - game.origin.y) / scaleY;
	this.input.w[20] = game.clyde.direction / scaleDir;
	var clydeTar = squareToPixels(game.clyde.target)
	this.input.w[21] = (clydeTar.x - game.origin.x) / scaleX;
	this.input.w[22] = (clydeTar.y - game.origin.y) / scaley;
	
	for(var i=0; i < this.outputNum; i++){
		this.input.w[23 + i] = this.prevOutput[i];
	}
}

Network.prototype.updateChromosome = function(){
	var chromIndex = 0;
	
	for(var i=0; i < this.outputNum; i++){
		var x = this.net.layers[1].filters[i];
		for(var j=0; j < this.inputNum; j++){
			this.chromosome[chromIndex] = x.w[j];
			chromIndex++;
		}
	}
}

Network.prototype.assignChromosome = function(chromosome){
	var chromIndex = 0;
	
	for(var i=0; i < this.outputNum; i++){
		var x = new convnetjs.Vol(1,1,this.inputNum);
		
		for(var j=0; j < this.inputNum; j++){
			x.w[j] = chromosome.genes[chromIndex];
			chromIndex++;
		}
		this.net.layers[1].filters[i] = x;
	}
}

function Chromosome(){
	this.genes = [];
	this.fitness;
	this.gamesPlayed;
	
	for(var i=0; i<248; i++){
		this.genes.push(2 * Math.random() - 1);
	}
}