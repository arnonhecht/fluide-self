function Layers (verticeRef, layersParams) {

	var getLayer = function(layerParam) {
		return new layerParam.layerCtor(verticeRef, layerParam.ctorParams);
	};
	this.layers = _.map(layersParams, getLayer);

    // _.each(layersParams, function(layerParam) {
    //     this.layers[layerParam.name] = new layerParam.layerCtor(verticeRef, layerParam.ctorParams);
    // });
}

Layers.prototype = {
    constructor: SignalLayer,

    getLayer: function(id) {
		return _.findWhere(this.layers, {id: id});
    },
	// determineActive
    determineCurrentState:function (theScoreToAdd)  {
    	var determineCurrentState = function (l) {
    		l.determineCurrentState();
    	};
        _.each(this.layers, determineCurrentState);

    	// console.log('determineCurrentState');
    },

    // calculateNextSignal
    determineNetworkEffect:function (theScoreToAdd)  {
    	var determineNetworkEffect = function (l)  {
    		l.determineNetworkEffect();
    	};
        _.each(this.layers, determineNetworkEffect);
    	// console.log('determineNetworkEffect');
    },

    // sendSignals
    causeNetworkEffect:function (theScoreToAdd)  {
    	var causeNetworkEffect = function (l)  {
    		l.causeNetworkEffect();
    	};
        _.each(this.layers, causeNetworkEffect);
    	// console.log('causeNetworkEffect');
    },

    // cleanOutgoingVertices
    prepareForNextState:function (theScoreToAdd)  {
    	var prepareForNextState = function  (l) {
    		l.prepareForNextState();
    	};
        _.each(this.layers, prepareForNextState);
    	// console.log('prepareForNextState');
    }
};
