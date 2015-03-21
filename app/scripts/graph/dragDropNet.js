


var w = 1200,
    h = 700

var vis = d3.select("body").append("svg:svg")
// var vis = d3.select("fugara-main").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

// d3.json('jsons/graph.json', function(json) {
    var force = self.force = d3.layout.force()
        .nodes(json.nodes)
        .links(json.links)
        .gravity(.05)
        .distance(100)
        .charge(-100)
        .size([w, h])
        .start();

    var link = vis.selectAll("line.link")
        .data(json.links)
        .enter().append("svg:line")
        .attr("class", "link")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        .attr("style", function(d) { return 'stroke:'+ d.color +'; stroke-width:2'});
        

    var node_drag = d3.behavior.drag()
        .on("dragstart", dragstart)
        .on("drag", dragmove)
        .on("dragend", dragend);

    function dragstart(d, i) {
        force.stop() // stops the force auto positioning before you start dragging
    }

    function dragmove(d, i) {
        d.px += d3.event.dx;
        d.py += d3.event.dy;
        d.x += d3.event.dx;
        d.y += d3.event.dy; 
        tick(); // this is the key to make it work together with updating both px,py,x,y on d !
    }

    function dragend(d, i) {
        d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
        tick();
        force.resume();
    }

/////////dddddddsssasasas
    var node = vis.selectAll("g.node")
        .data(json.nodes)
        .enter().append("svg:g")
        .attr("class", "node")
        .call(node_drag);

    // var node = vis.selectAll("g.node")
    //     .data(json.nodes)
    //     .enter().append("svg:g")
    //     .attr("class", "node")
    //     .call(node_drag)
    //     .append("circle")
    //     .attr("class", "node")
    //     .attr("r", 8)
    //     .style("fill", function(d) { return d.color; })
    //     .call(force.drag);


    // For the "electic" image
    // node.append("svg:image")
    //     .attr("class", "circle")
    //     .attr("xlink:href", "images/electric.png")
    //     .attr("x", "-8px")
    //     .attr("y", "-8px")
    //     .attr("width", "16px")
    //     .attr("height", "16px");

    var changeColor = function(d) {
        return d.verticeRef.layers.getLayer('SignalLayer').currColor;
    };

var nodeRadius = '8px';
    node.append("circle")
        // .attr("cx", function (d) { return d.x_axis; })
        // .attr("cy", function (d) { return d.y_axis; })
        .attr("r", function (d) { return nodeRadius; })
        .style("fill", changeColor);


    var appendText = function(node) {
        node.append("svg:text")
            .attr("class", "nodetext")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) { return d.name });
    };
    appendText(node);

    force.on("tick", tick);



    function tick() {
        link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; })
          .attr("style", function(d) { return 'stroke:'+ d.color +'; stroke-width:4'});

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        // node.style("fill", changeColor);
        vis.selectAll("g.node circle")
            .style("fill", changeColor);
        // Change node's text
        vis.selectAll("g.node text")
                .text(function(d) {  
                    return d.name;  
                });
        // node.text(function(d) { return d.name });
            // .text(function(){return 'aaaa'})

        //todo: We should move this out of here as it should only happen once
        link.on('click', function(d, i) {
            console.log('yaaay');
            d.color = 'red';
            d.source.verticeRef.layers.getLayer('SignalLayer').triggerSignal()
            d.target.verticeRef.layers.getLayer('SignalLayer').triggerSignal()
            tick();
        });
        node.on('click', function(d) {
            d.verticeRef.layers.getLayer('SignalLayer').triggerSignal();
            console.log('link yaaay!!!');
        });
    };

// });


