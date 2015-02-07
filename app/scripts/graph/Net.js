function Net (vertices) {


    var getNetVertice = function(d3Vertice) {
        var params = {
            name: d3Vertice.name,
            id: d3Vertice.group-1,
            threshold: 2,
            initScore: 0,
            d3Obj: d3Vertice
        };
        return new Vertice(params);
    };
    
    this.netVertices  = _.map(vertices, getNetVertice);
};

Net.prototype = {
    constructor: Net,

    addEdge: function(e) {
        var source = this.getV(e.source);
        var target = this.getV(e.target);
        source.outVertices.push(target);
        target.inVertices.push(source);
    },
    addEdges: function(edges) {
        _.each(edges, function(e) {
            this.addEdge(e);
        }.bind(this));
    },
    getV: function(eId) {
        return _.findWhere(this.netVertices, {id: eId});
    },
    getOverScore: function() {
        return _.filter(this.netVertices, function(v) {return v.active;});
    },
    determineActive: function() {
        _.each(this.netVertices, function(v){v.determineActive()});
    }

};		