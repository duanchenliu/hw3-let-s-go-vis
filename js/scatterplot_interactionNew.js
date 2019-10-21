

function drawGraph(xText,yText){
    // SVG Size
   

    d3.select("#second-chart-area").select("svg").remove();
  
    let width = 960,
        height = 500;
    let padding = 30;



    d3.csv("data/country.csv").then( function(data){
        // change string (from CSV) into number format
        data.forEach(function(d) {
          d[yText] = +d[yText];
          d[xText] = +d[xText];

        });
      //play inside with the converted data!
      let margin = {top:20, bottom:20, left:10, right:20};
      width = 800 - margin.left - margin.right;
      height = 800 - margin.top - margin.bottom;

      let newArray = data;
      newArray.sort(function (a, b) {
          return b.Population - a.Population;
      });
    //   console.log(newArray);

    let xMin = d3.min(data, function(d){ return d[xText]});
    let xMax = d3.max(data, function(d){ return d[xText]});

    let yMin = d3.min(data, function(d){ return d[yText]}) ;
    let yMax = d3.max(data, function(d){ return d[yText]});
    
    // setup xScale 
    let xScale = d3.scaleLinear()
    .domain([0,xMax])
    .range([height-padding, padding]).nice();


    // setup yScale
    let yScale = d3.scaleLinear()
    .domain([-1000,yMax])
    .range([padding,width - padding]).nice();

	// setup fill color
	let color = "red";
	// add the graph canvas to the body of the webpage
	let svg = d3.select('#second-chart-area').append('svg')
	.attr('width', width + margin.left + margin.right) 
	.attr('height', height + margin.top + margin.bottom)
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // setup x
    let xaxis = d3.axisBottom()
    // .tickValues([1000, 2000, 4000, 8000, 16000, 32000, 100000])
    .tickFormat(d3.format("1000"))
    .scale(xScale);
    
    // setup y
    let yaxis = d3.axisLeft()
    .ticks(9)
    .scale(yScale);

    var brush = d3.brush().extent([[0, 0], [width, height]]).on("end", brushended),
    idleTimeout,
    idleDelay = 350;
	xScale.domain(d3.extent(data, function (d) { return d[xText]; })).nice();
	yScale.domain(d3.extent(data, function (d) { return d[yText]; })).nice();


	var scatter = svg.append("g")
		.attr("id", "scatterplot")
		.attr("clip-path", "url(#clip)");

	scatter.selectAll("circle")
		.data(newArray)
		.enter()
		.append("circle")
		.attr("fill", "red")
		.attr("text", (d)=>d.Country)
		.attr("r", "10")
		//cx and cy define the dots position here
		.attr("cx", (d)=>xScale(d[xText]))
		.attr("cy", (d)=>yScale(d[yText]))
		.attr("id",(d)=>d.Country)

        svg.append('g')
        .attr('class', 'x-axis axis')
        .attr('id', "axis--x")
        // .attr('transform', `translate(${0}, ${height-20})`)
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xaxis);

        svg.append('g')
        .attr('class', 'y-axis axis')
        .attr('id', "axis--y")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yaxis);
        svg.append('text')
        .attr("x", 700)
        .attr("y", 420)	 
        .text(xText);

        svg.append('text')
                .attr("transform", "rotate(-90)")
                .attr("x", -30)
                .attr("text-anchor", "end")
                .attr("y", 50)
                // .attr("dy", ".75em")
                .text(yText);

        scatter.append('g')
        .attr("class", "brush")
        .call(brush);
        function brushended() {

            var s = d3.event.selection;
            if (!s) {
                if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
                xScale.domain(d3.extent(data, function (d) { return d[xText]; })).nice();
                yScale.domain(d3.extent(data, function (d) { return d[yText]; })).nice();
            } else {
                xScale.domain([s[0][0], s[1][0]].map(xScale.invert, xScale));
                yScale.domain([s[1][1], s[0][1]].map(yScale.invert, yScale));
                scatter.select(".brush").call(brush.move, null);
            }
            zoom();
        }
        function idled() {
            idleTimeout = null;
        }
    
        function zoom() {
    
            var t = scatter.transition().duration(750);
            svg.select("#axis--x").transition(t).call(xaxis);
            svg.select("#axis--y").transition(t).call(yaxis);
            scatter.selectAll("circle").transition(t)
            .attr("cx", (d)=>xScale(d[xText]))
            .attr("cy", (d)=>yScale(d[yText]));
        }

        let text = svg.selectAll("text")
				.data(data, function(d){
					// console.log(d)
				})
				.enter()
                .append("text");


});
    }



    drawGraph('Population', 'GDPPerCapita');
    function setScatterGraph() {
        xVal = d3.select("#x-value").node().value; 
        yVal = d3.select("#y-value").node().value; 
        drawGraph(xVal, yVal);

        // console.log(xVal,yVal);
    }
    