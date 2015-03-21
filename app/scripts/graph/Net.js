function Net (vertices) {

    this.threshold = conf.threshold;

    var getNetVertice = function(d3Vertice) {
        var params = {
            name: d3Vertice.name,
            id: d3Vertice.group-1,
            threshold: 1,
            verticeProbability: 0.5,
            initScore: 0,
            d3Obj: d3Vertice,
            layers: [{
                id: 'SignalLayer',
                layerCtor: SignalLayer,
                ctorParams: {
                    id: 'SignalLayer',
                    currColor: 'blue'
                }
            }]
        };
        var newVertice =  new Vertice(params);
        d3Vertice.verticeRef = newVertice;
        return newVertice;
    };
    
    this.netVertices  = _.map(vertices, getNetVertice);
};

Net.prototype = {
    constructor: Net,
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
    },
    getV: function(eId) {
        return _.findWhere(this.netVertices, {id: eId});
    },
    getActives: function() {
        return _.filter(this.netVertices, function(v) {return v.active;});
    },
    determineActive: function() {
        _.each(this.netVertices, function(v){v.determineActive()});
    },
    updateScores: function(){
        _.each(this.netVertices, function(v){v.updateScore(1)});
    },
    sendSignals: function() {
        _.each(this.netVertices, function(v){v.sendSignal(1)});
    },
    cleanOutgoingVertices: function() {
        _.each(this.netVertices, function(v){v.cleanOutgoingVertices()});
    },
    updateRoot: function() {
        var root = this.getV(0);
        root.updateScore(1);
    },
    calculateNextSignal: function() {
        _.each(this.netVertices, function(v){v.calculateNextSignal()});
    }

};		