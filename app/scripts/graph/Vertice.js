function Vertice (params) {
    this.name = params.name;
    this.id = params.id;
    this.threshold = params.threshold;
    this.outVertices = [];
    this.inVertices = [];
    this.initScore = params.initScore;
    this.currScore = params.initScore;
    this.d3Obj = params.d3Obj;	
    this.iter = 0;
    this.outgoingVertices = [];
}

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
       		if (this.isSignalOut(0.5) && this.active) {
       			this.outgoingVertices.push(v);
       		} 
       }.bind(this));
	},

    determineActive: function() {
	  	this.active = false;
        if (this.threshold < this.currScore) {
        	this.currScore = this.initScore;
        	this.active = true;
        	return true;
        }
        return false
    },

	isSignalOut: function(w) {
		return (Math.random() < w);
	},
    
    getOutgoingVertices: function() {
    	return this.outgoingVertices;
    },

	cleanOutgoingVertices: function() {
    	this.outgoingVertices.length = 0;
	},

	sendSignal: function (val) {
       _.each(this.outgoingVertices, function(v) {
       		if (this.isSignalOut(0.9) && this.active) {
       			v.updateScore(val);
       		}
       }.bind(this));
	}
};		




