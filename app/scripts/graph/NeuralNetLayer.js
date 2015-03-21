
function NeuralNetLayer (verticeRef, params) {
	// var me = this;
    this.id = params.id;
    this.activeColor = 'yellow'
    this.verticeRef = verticeRef;

    this.active = false;
    this.threshold = params.threshold;
    this.initScore = params.initScore;
    this.currScore = params.initScore;
    this.verticeProbability = params.verticeProbability;
    this.isRoot = _.contains(params.roots, this.verticeRef.id);


    this.outgoingVertices = [];
};


NeuralNetLayer.prototype = {
    constructor: NeuralNetLayer,

	// Private Functions
	isSignalOut: function(w) {
		return (Math.random() < w);
	},

    // Layer Specific Methods
	updateScore:function (theScoreToAdd)  {
	  this.currScore += theScoreToAdd;
	  this.layers
	  this.verticeRef.d3Obj.name = this.verticeRef.name + "(" + this.currScore + ")";
	  return false;
	},




	// Public Functions
    getOutgoingVertices: function() {
      return this.outgoingVertices;
    },



    // Public layer interface to implement
	updateRoot: function() {
		if (this.isRoot) {
			this.updateScore(1);
		}
	},

    determineCurrentState:function (theScoreToAdd)  {
		this.active = false;
	    if (this.threshold < this.currScore) {
	    	this.currScore = this.initScore;
	    	this.active = true;
	    }
    },

    determineNetworkEffect:function (theScoreToAdd)  {
 		_.each(this.verticeRef.outVertices, function(v) {
       		if (this.isSignalOut(this.verticeProbability) && this.active) {
       			this.outgoingVertices.push(v);
       		} 
        }.bind(this));
    },

    causeNetworkEffect:function (theScoreToAdd)  {
       	_.each(this.outgoingVertices, function(v) {
       		if (this.isSignalOut(0.9) && this.active) {
       			v.layers.getLayer('NeuralNetLayer').updateScore(1);
       		}
       }.bind(this));
    },

    prepareForNextState:function (theScoreToAdd)  {
        this.outgoingVertices.length = 0;
    },

};

