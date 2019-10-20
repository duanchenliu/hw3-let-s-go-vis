// SVG Size
let width = 700,
	height = 500;
let padding = 30;

let scatterPlot = d3.csv("data/country.csv", (row)=>{
	// type conversion
	return{
		...row,
		GDPPerCapita:+row.GDPPerCapita,
		HappinessScore:+row.HappinessScore,
		Population:+row.Population
	};
})
.then(data=>{
	//console.log(data);
	let newArray = data;

	let margin = {top:20, bottom:20, left:10, right:20};
		width = 960 - margin.left - margin.right;
		height = 500 - margin.top - margin.bottom;

	let happinessMin = d3.min(data, function(d){ return d.HappinessScore});
	let happinessMax = d3.max(data, function(d){ return d.HappinessScore});
	console.log(happinessMin,happinessMax);
	let GDPCapitaMin = d3.min(data, function(d){ return d.GDPPerCapita}) ;
	let GDPCapitaMax = d3.max(data, function(d){ return d.GDPPerCapita});
	console.log(GDPCapitaMin, GDPCapitaMax);
	let populationMin = d3.min(data, d=>d.Population);
	let populationMax = d3.max(data, d=>d.Population);
	//let populationMean = (populationMin + populationMax)/2;
	console.log(populationMin, populationMax);

	let svg = d3.select('#second-chart-area').append('svg')
	.attr('width', width + margin.left + margin.right) 
	.attr('height', height + margin.top + margin.bottom)
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	let happynessScale = d3.scaleLinear()
			.domain([0,happinessMax])
			.range([height-padding, padding]).nice();

	let GDPScale = d3.scaleLinear()
			.domain([-1000,GDPCapitaMax])
			.range([padding,width - padding]).nice();
	
	let populationScale = d3.scaleLinear()
			.domain([populationMin,populationMax])
			.range([4, 30]).nice();

	let colorPalette = d3.scaleLog()
			.domain([populationMin,populationMax])
			.range(["#02FFFF", "#0247FF"]);

	let xaxis = d3.axisBottom()
			// .tickValues([1000, 2000, 4000, 8000, 16000, 32000, 100000])
			.tickFormat(d3.format("1000"))
			.scale(GDPScale);
			
	let yaxis = d3.axisLeft()
			.ticks(9)
			.scale(happynessScale);

	var brush = d3.brush().extent([[0, 0], [width, height]]).on("end", brushended),
			idleTimeout,
			idleDelay = 350;

	//var xExtent = d3.extent(data, function (d) { return d.GDPPerCapita; });
	//var yExtent = d3.extent(data, function (d) { return d.HappinessScore; });
	happynessScale.domain(d3.extent(data, function (d) { return d.HappinessScore; })).nice();
	GDPScale.domain(d3.extent(data, function (d) { return d.GDPPerCapita; })).nice();

	var scatter = svg.append("g")
		.attr("id", "scatterplot")
		.attr("clip-path", "url(#clip)");


	
	scatter.selectAll("circle")
		.data(newArray)
		.enter()
		.append("circle")
		.attr("fill", (d)=>colorPalette(d.Population))
		.attr("text", (d)=>d.Country)
		.attr("r", (d)=>populationScale(d.Population))
		.attr("cx", (d)=>GDPScale(d.GDPPerCapita))
		.attr("cy", (d)=>happynessScale(d.HappinessScore))
		

				


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
				.text("GDP per Capita");

	svg.append('text')
				.attr("transform", "rotate(-90)")
				.attr("x", -30)
				.attr("text-anchor", "end")
				.attr("y", 50)
				// .attr("dy", ".75em")
				.text("Happiness Score");

	
	
		
	
	
		
		
		

	scatter.append('g')
		.attr("class", "brush")
        .call(brush);;
	

	function brushended() {

		var s = d3.event.selection;
		if (!s) {
			if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
			GDPScale.domain(d3.extent(data, function (d) { return d.GDPPerCapita; })).nice();
			happynessScale.domain(d3.extent(data, function (d) { return d.HappinessScore; })).nice();
		} else {
			GDPScale.domain([s[0][0], s[1][0]].map(GDPScale.invert, GDPScale));
			happynessScale.domain([s[1][1], s[0][1]].map(happynessScale.invert, happynessScale));
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
		.attr("cx", (d)=>GDPScale(d.GDPPerCapita))
		.attr("cy", (d)=>happynessScale(d.HappinessScore));
	}

})



