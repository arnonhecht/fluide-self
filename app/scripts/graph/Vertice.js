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
}

Vertice.prototype = {
    constructor: Vertice,

    updateScore:function (theScoreToAdd)  {
    	this.iter++;
        this.currScore += theScoreToAdd;

        this.d3Obj.name = this.name + "(" + this.currScore + ")" //+ "[" + this.iter + "]";
        return false;
    },

    updateNeightbours:function (val)  {
       _.each(this.outVertices, function(v) {
       		if (this.isSignalOut(0.5) && this.active) {
       			v.updateNeightbours(val);
       		} else {
       			v.updateNeightbours(0);
       		}
       		v.updateScore(val);
       }.bind(this));
    },

    determineActive: function() {
	  	this.active = false;
        // this.name = "[" + this.currScore + "]"
        if (this.threshold < this.currScore) {
        	this.currScore = this.initScore;
        	this.active = true;
        	return true;
        }
        return false
    },

	isSignalOut: function(w) {
		return (Math.random() < w);
	}
};		