function Vertice (params) {
    this.name = params.name;
    this.id = params.id;
    this.threshold = params.threshold;
    this.verticeProbability = params.verticeProbability
    this.outVertices = [];
    this.inVertices = [];
    this.inEdges = [];
    this.outEdges = [];
    this.initScore = params.initScore;
    this.currScore = params.initScore;
    this.d3Obj = params.d3Obj;	
    this.iter = 0;
    this.outgoingVertices = [];
    this.layers = new Layers(this, params.layers)
};

Vertice.prototype = {
    constructor: Vertice,

    updateScore:function (theScoreToAdd)  {
    	this.iter++;
      this.currScore += theScoreToAdd;
      this.d3Obj.name = this.name + "(" + this.currScore + ")" //+ "[" + this.iter + "]";
      return false;
    },

	calculateNextSignal: function() {
       _.each(this.outVertices, function(v) {
       		if (this.isSignalOut(this.verticeProbability) && this.active) {
       			this.outgoingVertices.push(v);
       		} 
       }.bind(this));
       this.layers.determineNetworkEffect();
	},

    determineActive: function() {
	  	this.active = false;
      if (this.threshold < this.currScore) {
      	this.currScore = this.initScore;
      	this.active = true;
      }
      this.layers.determineCurrentState();
      return this.active
    },

	isSignalOut: function(w) {
		return (Math.random() < w);
	},
    
    getOutgoingVertices: function() {
    	return this.outgoingVertices;
    },

	cleanOutgoingVertices: function() {
    	this.outgoingVertices.length = 0;
      this.layers.prepareForNextState();
	},

	sendSignal: function (val) {
       _.each(this.outgoingVertices, function(v) {
       		if (this.isSignalOut(0.9) && this.active) {
       			v.updateScore(val);
       		}
       }.bind(this));
       this.layers.causeNetworkEffect();
	}
};		




