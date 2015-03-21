function SignalLayer (verticeRef, params) {
    this.id = params.id;
    this.activeColor = 'yellow'
    this.currColor = params.currColor;
    this.verticeRef = verticeRef;

    this.active = false;
};

SignalLayer.prototype = {
    constructor: SignalLayer,


    // determineActive
    determineCurrentState:function (theScoreToAdd)  {
        if (this.active) {
            this.currColor ='red'
        } else {
            this.currColor ='blue'
        }
        // console.log('determineCurrentState');
    },

    // calculateNextSignal
    determineNetworkEffect:function (theScoreToAdd)  {
        if (0<this.cyclesTillTimeout) {
            this.cyclesTillTimeout--;
        }
        if (this.active && 0==this.cyclesTillTimeout) {
            this.active = false;
            _.each(this.verticeRef.outEdges, function(edge) {
                edge.color = this.activeColor;
            }.bind(this));
            _.each(this.verticeRef.inEdges, function(edge) {
                edge.color = this.activeColor;
            }.bind(this));
        }
        // console.log('determineNetworkEffect');
    },

    // sendSignals
    causeNetworkEffect:function (theScoreToAdd)  {
        // console.log('causeNetworkEffect');
    },

    // cleanOutgoingVertices
    prepareForNextState:function (theScoreToAdd)  {
        // console.log('prepareForNextState');
    },

    // Layer Specific Methods
    triggerSignal: function() {
        this.active = true;
        this.cyclesTillTimeout = false;
        this.cyclesTillTimeout = 3;
        // setTimeout(this.resetTimeoutPassed.bind(this), 1000);
    },

};
