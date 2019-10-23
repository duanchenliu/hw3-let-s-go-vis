let margin = {top:20, bottom:20, left:20, right:20};
      width = 800 - margin.left - margin.right;
      height = 800 - margin.top - margin.bottom;
      let padding = 100;


let svg = d3.select('#second-chart-area').append('svg')
            .attr('width', width + margin.left + margin.right) 
            .attr('height', height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let xText, yText;
let HL = "";
function updateRankMetric() {
        // console.log('update');
        // rankMetric = d3.select("#ranking-type").property("value");
        // console.log(rankMetric);
        xText = d3.select("#x-value").node().value; 
        yText = d3.select("#y-value").node().value; 
}
updateRankMetric();

var xGroup = svg.append('g')
        .attr('class', 'x-axis axis')
        .attr('id', "axis--x")
        // .attr('transform', `translate(${0}, ${height-20})`)
        .attr("transform", "translate(0," + (height - padding) + ")");
        // .call(xaxis);

svg.append('text')
        .attr("transform", "rotate(-90)")
        .attr("x", -30)
        .attr("text-anchor", "end")
        .attr("y", 50) 
        .text("");


    // draw y-axis
var yGroup = svg.append('g')
        .attr('class', 'y-axis axis')
        .attr('id', "axis--y")
        .attr("transform", "translate(" + padding + ",0)");
        // .call(yaxis);

let scatterPlot = d3.csv("data/country.csv", (row)=>{
    return{
        ...row,
        GDPPerCapita:+row.GDPPerCapita,
        HappinessScore:+row.HappinessScore,
        Population:+row.Population
    };
    }).then((d)=>{    
        data = d;
        // console.log("data: " + data);
        data.sort(function (a, b) {
            return b.Population - a.Population;
        });
        // console.log(data);

        
        updateVisualization(HL);
    
    });

// Add Event Listener (ranking type)
d3.select("#button")
  .on("click", function() {
    updateRankMetric();
    updateVisualization(HL);
  });
 
function updateVisualization(HL){
    // console.log('updateVisualization', data);
    
    let xMin = d3.min(data, function(d){ return d[xText]});
    let xMax = d3.max(data, function(d){ return d[xText]});

    let yMin = d3.min(data, function(d){ return d[yText]}) ;
    let yMax = d3.max(data, function(d){ return d[yText]});
    
    let xScale = d3.scaleLinear()
        .domain([xMin,xMax*1.5])
        .range([padding,height-padding]).nice();
        // .range([padding,height]).nice();

    let yScale = d3.scaleLinear()
        .domain([yMin,yMax*1.5])
        .range([width - padding,padding]).nice();
        // .range([width,padding]).nice();

    // setup x
    let xaxis = d3.axisBottom()
    // .tickValues([1000, 2000, 4000, 8000, 16000, 32000, 100000])
        .tickFormat(d3.format("1000"))
        .scale(xScale);

    // setup y
    let yaxis = d3.axisLeft()
        .ticks(9)
        .scale(yScale);
    //try:
   

    // svg.select("text")
    //     .append('text')
    //             .attr("transform", "rotate(-90)")
    //             .attr("x", -30)
    //             .attr("text-anchor", "end")
    //             .attr("y", 50)
    //             // .merge()
    //             // .attr("dy", ".75em")
    //             .text(yText)
    //             // .exit();



    //setup population
    let populationMin = d3.min(data, d=>d.Population);
    let populationMax = d3.max(data, d=>d.Population);

    let populationScale = d3.scaleLinear()
        .domain([populationMin,populationMax])
        .range([4, 30]).nice();
        
    //setup colorscale
    let colorPalette = d3.scaleLog()
        .domain([populationMin,populationMax])
        .range(["#02FFFF", "#0247FF"]);
    
    var brush = d3.brush().extent([[0, 0], [width, height]]).on("end", brushended),
        idleTimeout,
        idleDelay = 350;

    // let update2 = svg.selectAll("text")
    
 
    
   
    
    let update = svg.selectAll('circle')
        .data(data)
        
        //.append("g")
        //.attr("id", "scatterplot")
        //.attr("clip-path", "url(#clip)")
        // .append('g')
        //.attr("class", "brush")
        //.call(brush);
        

  
    // draw x-axis
    
    
    // var scatter = svg.append("g")
	// 	.attr("id", "scatterplot")
	// 	.attr("clip-path", "url(#clip)");

	update.enter()
		.append('circle')
		// .attr("fill", (d)=>colorPalette(d.Population))
       .attr("fill",function(d){
            if(d.Country===HL){
                return "red";
            }else{
                return colorPalette(d.Population);
            }
            
       })
        .attr("text", (d)=>d.Country)
        .attr("opacity", 0.7)
        //.attr("r", "4")
        .attr("r", (d)=>populationScale(d.Population))
		//cx and cy define the dots position here
		.attr("cx", (d)=>xScale(d[xText]))
		.attr("cy", (d)=>yScale(d[yText]));
        // .attr("id",(d)=>d.Country);
    
    update
		.attr("class", "circle")
        .merge(update)
        .attr("fill",function(d){
            if(d.Country===HL){               
                 return "red";
            }else{
                return colorPalette(d.Population);
            }
            
       })
        //  .style("opacity", 1)
        .attr("opacity", 0.7)
        .attr("clip-path", "url(#clip)")
        .attr("cx", (d)=>xScale(d[xText]))
		.attr("cy", (d)=>yScale(d[yText]))
    	 .transition()
         .duration(2000);

    update.exit()
         .transition()
          .duration(0)
           .remove(); 

    // scatter.append('g')
    //     .attr("class", "brush")
    //     .call(brush);
    xGroup
		.transition()
        .attr("class", "x-axis axis")
        .attr('id', "axis--x")
		.duration(2000)
		.call(xaxis);
	yGroup
		.transition()
        .attr("class", "y-axis axis")
        .attr('id', "axis--y")
		.duration(2000)
		.call(yaxis);

        function brushended() {

            var s = d3.event.selection;
            if (!s) {
                if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
                // xScale.domain(d3.extent(data, function (d) { return d[xText]; })).nice();
                // yScale.domain(d3.extent(data, function (d) { return d[yText]; })).nice();
                xScale.domain([xMin,xMax*1.5]);
                yScale.domain([yMin,yMax*1.5]);
            } else {
                xScale.domain([s[0][0], s[1][0]].map(xScale.invert, xScale));
                yScale.domain([s[1][1], s[0][1]].map(yScale.invert, yScale));
                svg.select(".brush").call(brush.move, null);
            }
            zoom();
        }
        function idled() {
            idleTimeout = null;
        }
    
        function zoom() {
    
            var t = svg.transition().duration(750);
            svg.select("#axis--x").transition(t).call(xaxis);
            svg.select("#axis--y").transition(t).call(yaxis);
            svg.selectAll("circle").transition(t)
            .attr("cx", (d)=>xScale(d[xText]))
            .attr("cy", (d)=>yScale(d[yText]));
        }


        
    svg
    .attr("clip-path", "url(#clip)")
    .append('g')
    .attr("class", "brush")
    .call(brush);
}

