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
	console.log(data);
	let newArray = data;

	let margin = {top:20, bottom:20, left:10, right:20};
		width = 960 - margin.left - margin.right;
		height = 500 - margin.top - margin.bottom;

	let happinessMin = d3.min(data, function(d){ return d.HappinessScore});
	let happinessMax = d3.max(data, function(d){ return d.HappinessScore});
	console.log(happinessMin,happinessMax);
	let GDPCapitaMin = d3.min(data, function(d){ return d.GDPPerCapita}) - 5000;
	let GDPCapitaMax = d3.max(data, function(d){ return d.GDPPerCapita}) + 5000;
	console.log(GDPCapitaMin, GDPCapitaMax);
	let populationMin = d3.min(data, d=>d.Population);
	let populationMax = d3.max(data, d=>d.Population);
	let populationMean = (populationMin + populationMax)/2;
	console.log(populationMin, populationMax);

	let secondsvg = d3.select('#second-chart-area').append('svg')
		.attr('width', width + margin.left + margin.right) 
		.attr('height', height + margin.top + margin.bottom)
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	let happynessScale = d3.scaleLinear()
			.domain([happinessMin,happinessMax])
			.range([height-padding, padding]);

	let GDPScale = d3.scaleLinear()
			.domain([GDPCapitaMin,GDPCapitaMax])
			.range([padding,width - padding]);
	
	let populationScale = d3.scaleLinear()
			.domain([populationMin,populationMax])
			.range([4, 30]);

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

	secondsvg.append('g')
			.attr('class', 'x-axis axis')
			// .attr('transform', `translate(${0}, ${height-20})`)
			.attr("transform", "translate(0," + (height - padding) + ")")
			.call(xaxis);

	secondsvg.append('g')
			.attr('class', 'y-axis axis')
			.attr("transform", "translate(" + padding + ",0)")
			.call(yaxis);


	secondsvg.selectAll("circle")
				.data(newArray)
				.enter()
				.append("circle")
				.attr("fill", (d)=>colorPalette(d.Population))
				.attr("text", (d)=>d.Country)
				.attr("r", (d)=>populationScale(d.Population))
				.attr("cx", (d)=>GDPScale(d.GDPPerCapita))
				.attr("cy", (d)=>happynessScale(d.HappinessScore))

	secondsvg.append('text')
				.attr("x", 700)
				.attr("y", 420)	 
				.text("GDP per Capita");

	secondsvg.append('text')
				.attr("transform", "rotate(-90)")
				.attr("x", -30)
				.attr("text-anchor", "end")
				.attr("y", 50)
				// .attr("dy", ".75em")
				.text("Happiness Score");

	let thirdsvg = d3.select('#third-chart-area').append('svg')
				.attr('width', width + margin.left + margin.right) 
				.attr('height', height + margin.top + margin.bottom)
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
})