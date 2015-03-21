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
    this.outgoingVertices = [];
    this.layers = new Layers(this, params.layers)
};

Vertice.prototype = {
  constructor: Vertice,

  // Private Functions
  // right now a vertice is active if the 'NeuralNetLayer' is active - we can insert more logic but its ok for now
  isActive: function() {
    return this.layers.getLayer('NeuralNetLayer').active;
  },


  // Public Functions
  updateRoots: function() {
    this.layers.updateRoots();
  },
  determineCurrentState: function() {
    this.layers.determineCurrentState();
  },
  determineNetworkEffect: function() {
       this.layers.determineNetworkEffect();
  },
  causeNetworkEffect: function () {
       this.layers.causeNetworkEffect();
  },
  prepareForNextState: function() {
      this.layers.prepareForNextState();
  },

};		




