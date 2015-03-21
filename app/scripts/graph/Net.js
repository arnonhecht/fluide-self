function Net (vertices, edges, preCycleOps, externalActivationCallback) {

    this.threshold = conf.threshold;

    var getNetVertice = function(d3Vertice) {
        var params = {
            name: d3Vertice.name,
            id: d3Vertice.group-1,
            d3Obj: d3Vertice,
            layers: [{
                id: 'SignalLayer',
                layerCtor: SignalLayer,
                ctorParams: {
                    id: 'SignalLayer',
                    currColor: 'blue'
                }
            },{
                id: 'NeuralNetLayer',
                layerCtor: NeuralNetLayer,
                ctorParams: {
                    id: 'NeuralNetLayer',
                    threshold: 1,
                    verticeProbability: 1, //0.5,
                    initScore: 0,
                    roots: [0, 2, 30, 17, 33, 27, 42]
                }
            },]
        };
        var newVertice =  new Vertice(params);
        d3Vertice.verticeRef = newVertice;
        return newVertice;
    };
    
    this.netVertices  = _.map(vertices, getNetVertice);
    this.addEdges(edges);

    this.preCycleOps = preCycleOps;
    this.externalActivationCallback = externalActivationCallback;
};

Net.prototype = {
    constructor: Net,

    // Private Functions
    checkAndSetParams: function(param) {
        if (this[param] != conf[param]) {
            this[param] = conf[param];
            _.each(this.netVertices, function(v) {
                v[param] = conf[param];
            })
        }
    },
    addEdge: function(e) {
        var source = this.getV(e.source);
        var target = this.getV(e.target);
        source.outVertices.push(target);
        target.inVertices.push(source);

        source.outEdges.push(e);
        target.inEdges.push(e);
    },
    addEdges: function(edges) {
        _.each(edges, function(e) {
            this.addEdge(e);
        }.bind(this));
        this.allEdges = edges;
    },
    getV: function(eId) {
        return _.findWhere(this.netVertices, {id: eId});
    },
    getActives: function() {
        return _.filter(this.netVertices, function(v) {return v.isActive();});
    },




    // Public Functions

    // Perform external operations. e.g. 1) setting D3 visual objects 2) sending data to "Melodi Generator" or DMX components
    prepareExternalDataForNextCycle: function() {
        this.preCycleOps(this.allEdges);
    },


    // Give roots an initial value - signal has to start somewhere.
    // We can have more than one root in order to simulate flow from different parts of the net
    // In reality the roots should probably be "hidden", meaning they might not need to represent an actual node
    updateRoots: function() {
        _.each(this.netVertices, function(v){v.updateRoots()});
    },
    determineCurrentState: function() {
        _.each(this.netVertices, function(v){v.determineCurrentState()});
    },
    determineNetworkEffect: function() {
        _.each(this.netVertices, function(v){v.determineNetworkEffect()});
    },
    // Relays the state of each edge through a callback 'externalActivationCallback' which is provided by the external consumer
    relayNetStateToExternalConsumer: function() {
        var currSignalingVertices = this.getActives();
        _.each(currSignalingVertices, function(v) {
            var outgoingVertices = v.layers.getLayer('NeuralNetLayer').getOutgoingVertices();
            _.each(outgoingVertices, function(targetVertice){
                this.externalActivationCallback(v.id, targetVertice.id);
            }.bind(this));
        }.bind(this));
    },
    causeNetworkEffect: function() {
        _.each(this.netVertices, function(v){v.causeNetworkEffect()});
    },
    prepareForNextState: function() {
        _.each(this.netVertices, function(v){v.prepareForNextState()});
    }

};		