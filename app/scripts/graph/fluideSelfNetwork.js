

var getGraphVertice = function(idx) {
	var d3Represenation = {"name":"[" + idx + "]","group":idx};
	return [d3Represenation];
};

var findEdge = function(edges, source, target) {
	return _.find(edges, function(e){
		return (e.source.group-1==source && e.target.group-1==target);
	});
};

var getE = function(from, to) {
	return {"source":(from-1),"target":(to-1),"value":1, "color": 'blue'}
};

var makeNet = function(vertices, edges) {
	var resetNetBeforeEachCycle = function(netEdges) {
        _.each(netEdges, function(e){ 
            e.color = 'blue';
        });
	};

	var activateD3Edge = function(idSrc, idTarget) {
        var e = findEdge(edges, idSrc, idTarget);
        e.color = 'red';
	};

	myNet = new Net(vertices, edges, resetNetBeforeEachCycle, activateD3Edge);

	return {
	    "nodes": vertices,
	    "links":edges
	};
};


var graph = networkDef;
_.each(graph.edges, function(edgeA){
	var result = _.union(_.where(graph.edges, {s:edgeA.s, t:edgeA.t}), _.where(graph.edges, {s:edgeA.t, t:edgeA.s}));

	if (result.length!=1) {
		throw("Bad network!!! Duplicate edge: (" + edgeA.s + "," + edgeA.t+ ")")
	}
});
var myVerticesList = [];
var maxVertice = 0;
 _.each(graph.edges, function(edge) {
	var candidate = (edge.s<edge.t) ? edge.t : edge.s;
	maxVertice = (maxVertice<candidate) ? candidate : maxVertice;
});
for (var i=1; i<=maxVertice; i++) {
	myVerticesList.push(i)
}

var myVerticesRepresentation = [];
_.each(myVerticesList, function(currVertice) {
	myVerticesRepresentation = myVerticesRepresentation.concat(getGraphVertice(currVertice));
});

var myEdgesRepresentation = [];
_.each(graph.edges, function(obj) {
	myEdgesRepresentation.push(getE(obj.s, obj.t));
});

edges = myEdgesRepresentation;
verticesRepresentation = myVerticesRepresentation;
json = makeNet(verticesRepresentation, edges);


console.log('Net representation is ready');


