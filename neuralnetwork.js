var trainingMode = true;

function Network(){
	this.inputNum = 31;
	this.outputNum = 8;
	
	this.input = new convnetjs.Vol(1,1,this.inputNum,0);
	this.output = new convnetjs.Vol(1,1,this.outputNum,0);
	this.prevOutput = new convnetjs.Vol(1,1,this.outputNum,0);
	
	this.layers = [];
	this.layers.push({type: 'input', out_sx: 1, out_sy: 1, out_depth: this.inputNum});
	this.layers.push({type: 'fc', num_neurons: this.outputNum, activation: 'relu'});
	
	this.net = new convnetjs.Net();
	this.net.makeLayers(this.layers);
	this.chromosome = new Chromosome();
	this.assignChromosome(this.chromosome);
}

Network.prototype.feedForward = function(game){
	this.setInput(game);
	var out = this.net.forward(this.input);
	
	for(var i=0; i < this.outputNum; i++){
		this.prevOutput.w[i] = this.output.w[i];
		this.output.w[i] = out.w[i];
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
	var blinkyTar = squareToPixels(game.origin, game.blinky.target)
	this.input.w[6] = (blinkyTar.x - game.origin.x) / scaleX;
	this.input.w[7] = (blinkyTar.y - game.origin.y) / scaleY;
	
	this.input.w[8] = (game.pinky.location.x - game.origin.x) / scaleX;
	this.input.w[9] = (game.pinky.location.y - game.origin.y) / scaleY;
	this.input.w[10] = game.pinky.direction / scaleDir;
	var pinkyTar = squareToPixels(game.origin, game.pinky.target)
	this.input.w[11] = (pinkyTar.x - game.origin.x) / scaleX;
	this.input.w[12] = (pinkyTar.y - game.origin.y) / scaleY;
	
	this.input.w[13] = (game.inky.location.x - game.origin.x) / scaleX;
	this.input.w[14] = (game.inky.location.y - game.origin.y) / scaleY;
	this.input.w[15] = game.inky.direction / scaleDir;
	var inkyTar = squareToPixels(game.origin, game.inky.target)
	this.input.w[16] = (inkyTar.x - game.origin.x) / scaleX;
	this.input.w[17] = (inkyTar.y - game.origin.y) / scaleY;
	
	this.input.w[18] = (game.clyde.location.x - game.origin.x) / scaleX;
	this.input.w[19] = (game.clyde.location.y - game.origin.y) / scaleY;
	this.input.w[20] = game.clyde.direction / scaleDir;
	var clydeTar = squareToPixels(game.origin, game.clyde.target)
	this.input.w[21] = (clydeTar.x - game.origin.x) / scaleX;
	this.input.w[22] = (clydeTar.y - game.origin.y) / scaleY;
	
	for(var i=0; i < this.outputNum; i++){
		this.input.w[23 + i] = this.output.w[i];
	}
}

Network.prototype.getChromosome = function(){	//get weights/chromosom out of neural network and store it in this.chromosome
	var chromIndex = 0;
	
	for(var i=0; i < this.outputNum; i++){
		var x = this.net.layers[1].filters[i];
		for(var j=0; j < this.inputNum; j++){
			this.chromosome[chromIndex] = x.w[j];
			chromIndex++;
		}
	}
}

Network.prototype.assignChromosome = function(chromosome){	//pass in chromosome to be inserted into neural network
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
	this.fitness = -1;
	this.gamesPlayed = 0;
	
	for(var i=0; i<248; i++){
		this.genes.push(2 * Math.random() - 1);
	}
}

Chromosome.prototype.crossover = function(chrom1){
	var len = this.genes.length;
	var newChrom = new Chromosome();
	newChrom.genes = this.genes;
	
	for(var i=len/2; i < 248; i++){
		newChrom.genes[i] = chrom1.genes[i];
	}
	
	return newChrom;
};

Chromosome.prototype.mutate = function(rate){
	var len = this.genes.length * rate;
	
	for(var i=0; i < len; i++){
		var randGene = Math.floor(Math.random() * 248);
		var newGene = 2 * Math.random() - 1;
		
		this.genes[randGene] = newGene;
	}
};


function simulateGame(chromosome){
	var game = new Game(new Location(0,0), new Network(),3);
	var theNetwork = new Network();
	theNetwork.assignChromosome(chromosome);
	
	var ticks = 0;
	game.changeMode(SCATTER);
	
	while(game.lives == 3 && ticks < 3000){
		game.pacman.network.feedForward(game);
		game.pacman.makeDecision();
		game.updateAgentsLocation();
		clear();
		game.drawAgents();
		
		if(ticks == 210 || ticks == 1020 || ticks == 1770 || ticks == 2520){
			game.changeMode(CHASE);
			game.reverseDirection();
		}
		else if(ticks == 810 || ticks == 1620 || ticks == 2370){
			game.changeMode(SCATTER);
			game.reverseDirection();
		}
		
		ticks++;
	}
	//console.log("Ticks: " + ticks);
	return ticks;
}

function generation(size, chromosomes, gen){
	var rate = .05;
	
	//var totalAll = 0;
	for(var j=0; j < size; j++){
		var fitness = simulateGame(chromosomes[j]);
		chromosomes[j].fitness += fitness;
		//totalAll += fitness;
		chromosomes[j].gamesPlayed++;
	}
	
	chromosomes.sort(function(a,b){return (b.fitness/b.gamesPlayed) - (a.fitness/a.gamesPlayed)});
	chromosomes.splice(20, 80);
	
	var total = 0;
	for(var l=0; l < 20; l++){
		total += chromosomes[l].fitness / chromosomes[l].gamesPlayed;
	}
	
	console.log(gen + ": " + total/20);
	//console.log(totalAll/100);
	
	//crossover
	for(var k=0; k<80; k++){
		var rand1 = Math.floor(Math.random() * 20);
		var rand2 = Math.floor(Math.random() * 20);
		
		var newChrom = chromosomes[rand1].crossover(chromosomes[rand2]);
		chromosomes.push(newChrom);
	}
	
	//Mutate
	for(var m=0; m < size; m++){
		chromosomes[m].mutate(rate);
	}
	
}

function train(generationCount, size){
	var chromosomes = [];
	
	for(var i=0; i < size; i++){
		chromosomes[i] = new Chromosome();
	}	
	
	for(var j=0; j < generationCount; j++){
		generation(size, chromosomes, j+1);
	}
}