var trainingMode = true;
var chromLen = 160;
var avg = 0;

function Network(chromosome){
	this.inputNum = 19;
	this.outputNum = 8;
	
	this.input = new convnetjs.Vol(1,1,this.inputNum,0);
	this.output = new convnetjs.Vol(1,1,this.outputNum,0);
	
	this.layers = [];
	this.layers.push({type: 'input', out_sx: 1, out_sy: 1, out_depth: this.inputNum});
	this.layers.push({type: 'fc', num_neurons: this.outputNum, activation: 'sigmoid'});
	
	this.net = new convnetjs.Net();
	this.net.makeLayers(this.layers);
	
	if(chromosome)
		this.chromosome = chromosome;
	else
		this.chromosome = new Chromosome();
	
	this.assignChromosome(this.net, this.chromosome);
}

Network.prototype.feedForward = function(game){
	this.setInput(game);
	var out = this.net.forward(this.input);

	for(var i=0; i < this.outputNum; i++){
		this.output.w[i] = out.w[i];
	}
}

Network.prototype.setInput = function(game){
	var scaleX = SQUARE_SIZE * 28 * .5;
	var scaleY = SQUARE_SIZE * 36 * .5;
	
	this.input.w[0] = (game.pacman.location.x - game.origin.x) / scaleX - 1;
	this.input.w[1] = (game.pacman.location.y - game.origin.y) / scaleY - 1;
	
	this.input.w[2] = (game.blinky.location.x - game.origin.x) / scaleX - 1;
	this.input.w[3] = (game.blinky.location.y - game.origin.y) / scaleY - 1;
	var blinkyTar = squareToPixels(game.origin, game.blinky.target)
	this.input.w[4] = (blinkyTar.x - game.origin.x) / scaleX - 1;
	this.input.w[5] = (blinkyTar.y - game.origin.y) / scaleY - 1;
	this.input.w[6] = game.pacman.direction;
	
	/*this.input.w[6] = (game.pinky.location.x - game.origin.x) / scaleX - 1;
	this.input.w[7] = (game.pinky.location.y - game.origin.y) / scaleY - 1;
	var pinkyTar = squareToPixels(game.origin, game.pinky.target)
	this.input.w[8] = (pinkyTar.x - game.origin.x) / scaleX - 1;
	this.input.w[9] = (pinkyTar.y - game.origin.y) / scaleY - 1;
	
	this.input.w[10] = (game.inky.location.x - game.origin.x) / scaleX - 1;
	this.input.w[11] = (game.inky.location.y - game.origin.y) / scaleY - 1;
	var inkyTar = squareToPixels(game.origin, game.inky.target)
	this.input.w[12] = (inkyTar.x - game.origin.x) / scaleX - 1;
	this.input.w[13] = (inkyTar.y - game.origin.y) / scaleY - 1;
	
	this.input.w[14] = (game.clyde.location.x - game.origin.x) / scaleX - 1;
	this.input.w[15] = (game.clyde.location.y - game.origin.y) / scaleY - 1;
	var clydeTar = squareToPixels(game.origin, game.clyde.target)
	this.input.w[16] = (clydeTar.x - game.origin.x) / scaleX - 1;
	this.input.w[17] = (clydeTar.y - game.origin.y) / scaleY - 1;
	*/
	var pacmanSquare = pixelsToSquare(game.origin, game.pacman.location);
	
	this.input.w[7] = pacmanMap[pacmanSquare - 28];
	this.input.w[8] = pacmanMap[pacmanSquare + 1];
	this.input.w[9] = pacmanMap[pacmanSquare + 28];
	this.input.w[10] = pacmanMap[pacmanSquare - 1];
	
	for(var i=0; i < this.outputNum; i++){
		this.input.w[11 + i] = this.output.w[i];
	}
}

/*
Network.prototype.getChromosome = function(){	//get weights/chromosom out of neural network and store it in this.chromosome
	var chromIndex = 0;
	
	for(var i=0; i < this.outputNum; i++){
		var x = this.net.layers[1].filters[i];
		for(var j=0; j < this.inputNum; j++){
			this.chromosome[chromIndex] = x.w[j];
			chromIndex++;
		}
	}
}*/

Network.prototype.assignChromosome = function(net,chromosome){	//pass in chromosome to be inserted into neural network
	var chromIndex = 0;
	
	var numLayers = net.layers.length;
	for(var i=0; i<numLayers; i++){
		
		if(net.layers[i].biases){
			var numBiases = net.layers[i].biases.w.length;
			for(var j=0; j < numBiases; j++){
				net.layers[i].biases.w[j] = chromosome.genes[chromIndex++];
			}
		}
		
		if(net.layers[i].filters){
			var numFilters = net.layers[i].filters.length;
			for(var l=0; l < numFilters; l++){
				
				var len = net.layers[i].filters[l].w.length;
				for(var k=0; k<len; k++){
					net.layers[i].filters[l].w[k] = chromosome.genes[chromIndex++];
				}
			}
		}
	}
}

var theNetwork = new Network(null);

function Chromosome(){
	this.genes = [];
	this.fitness = -1;
	this.gamesPlayed = 0;
	for(var i=0; i<chromLen; i++){
		this.genes.push(convnetjs.randn(0,1));
	}
}

Chromosome.prototype.crossover = function(chrom1){
	var len = this.genes.length;
	var rand = Math.random() * len;
	var newChrom = new Chromosome();
	
	for(var i=0; i < len; i++){
		if(i < rand)
			newChrom.genes[i] = this.genes[i];
		else
			newChrom.genes[i] = chrom1.genes[i];
	}
	
	return newChrom;
};

Chromosome.prototype.mutate = function(rate){
	var len = this.genes.length;
	
	
	for(var i=0; i < len; i++){
		var rand = Math.random() * (1/rate);
		if(rand < 1){
			this.genes[i] = convnetjs.randn(0,1);
		}
	}
};


function simulateGame(chromosome){
	var game = new Game(new Location(0,0), theNetwork, 3);
	
	game.pacman.network.assignChromosome(theNetwork.net, chromosome);
	
	var ticks = 0;
	var desirableActions = 0;
	game.changeMode(SCATTER);
	
	var t = 0;
	while(game.lives == 3 && ticks < 10000){
		game.pacman.network.feedForward(game);
		game.pacman.makeDecision();
		
		var dist = closeGhost(game);
		desirableActions += dist / 500;
		
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
	return desirableActions;
}

function closeGhost(game){
	var pacX = game.pacman.location.y;
	var pacY = game.pacman.location.y;
	
	var blinkyDist = Math.sqrt(Math.pow(game.blinky.location.x - pacX, 2) + Math.pow(game.blinky.location.y - pacY, 2));
	//var pinkyDist = Math.sqrt(Math.pow(game.pinky.location.x - pacX, 2) + Math.pow(game.pinky.location.y - pacY, 2));
	//var inkyDist = Math.sqrt(Math.pow(game.inky.location.x - pacX, 2) + Math.pow(game.inky.location.y - pacY, 2));
	//var clydeDist = Math.sqrt(Math.pow(game.clyde.location.x - pacX, 2) + Math.pow(game.clyde.location.y - pacY, 2));
	
	//return Math.min(blinkyDist, pinkyDist, inkyDist, clydeDist);
	return blinkyDist;
}

function generation(size, chromosomes, gen){
	var rate = .1;
	
	for(var j=0; j < size; j++){
		var fitness = simulateGame(chromosomes[j]);
		chromosomes[j].fitness = fitness;
		chromosomes[j].gamesPlayed++;
	}
	
	chromosomes.sort(function(a,b){return (b.fitness) - (a.fitness)});
	console.log("Best: " + chromosomes[0].fitness / 30 + " seconds");
	console.log("Worst: " + chromosomes[99].fitness / 30 + " seconds");
	chromosomes.splice(25, 75);
	
	
	
	var total = 0;
	for(var l=0; l < 25; l++){
		total += chromosomes[l].fitness;
	}
	
	console.log(gen + ": " + total/25/30 + " seconds");
	
	
	avg += total/25;
	
	//crossover
	for(var k=0; k<75; k++){
		var rand1 = Math.floor(Math.random() * 25);
		var rand2 = Math.floor(Math.random() * 25);
		
		var newChrom = chromosomes[rand1].crossover(chromosomes[rand2]);
		chromosomes.push(newChrom);
	}
	
	//Mutate
	for(var m=25; m < size; m++){
		chromosomes[m].mutate(rate);
	}
	
}

function train(generationCount, size){
	var chromosomes = [];
	
	for(var i=0; i < size; i++){
		chromosomes[i] = new Chromosome();
	}	
	getNetworkSize(theNetwork.net);
	for(var j=0; j < generationCount; j++){
		generation(size, chromosomes, j+1);
	}
	console.log("Average over all generations: " + avg / generationCount);
}

function getNetworkSize(net) {
    var layer = null;
    var filter = null;
    var bias = null;
    var w = null;
    var count = 0;
    var i, j, k;
    for ( i = 0; i < net.layers.length; i++) {
      layer = net.layers[i];
      filter = layer.filters;
      if (filter) {
        for ( j = 0; j < filter.length; j++) {
          w = filter[j].w;
          count += w.length;
        }
      }
      bias = layer.biases;
      if (bias) {
        w = bias.w;
        count += w.length;
      }
    }
    console.log(count);
  }