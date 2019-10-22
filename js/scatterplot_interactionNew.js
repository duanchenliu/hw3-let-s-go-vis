

function drawGraph(xText,yText,highLight){
    // SVG Size
   

    d3.select("#second-chart-area").select("svg").remove();
  
    let width = 560,
        height = 500;
    let padding = 100;



    let scatterPlot = d3.csv("data/country.csv", (row)=>{
        // type conversion
        return{
            ...row,
            GDPPerCapita:+row.GDPPerCapita,
            HappinessScore:+row.HappinessScore,
            Population:+row.Population
        };
    }).then( function(data){
        // change string (from CSV) into number format
        data.forEach(function(d) {
          d[yText] = +d[yText];
          d[xText] = +d[xText];
        //   d[Population] = +d[Population];

        });
      //play inside with the converted data!
      let margin = {top:20, bottom:20, left:20, right:20};
      width = 600 - margin.left - margin.right;
      height = 600 - margin.top - margin.bottom;

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
    .range([padding,height-padding]).nice();


    // setup yScale
    let yScale = d3.scaleLinear()
    .domain([-1000,yMax])
    .range([width - padding,padding]).nice();

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

    //setup population
	let populationMin = d3.min(data, d=>d.Population);
    let populationMax = d3.max(data, d=>d.Population);
    console.log(populationMin);
    console.log(populationMax);

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
	xScale.domain(d3.extent(data, function (d) { return d[xText]; })).nice();
    yScale.domain(d3.extent(data, function (d) { return d[yText]; })).nice();
    
    //setup GDPScale
    let GDPCapitaMin = d3.min(data, function(d){ return d.GDPPerCapita}) ;
	let GDPCapitaMax = d3.max(data, function(d){ return d.GDPPerCapita});

    let GDPScale = d3.scaleLinear()
    .domain([-1000,GDPCapitaMax])
    .range([padding,width - padding]).nice();

    //setup happinessscale

    let happinessMin = d3.min(data, function(d){ return d.HappinessScore});
    let happinessMax = d3.max(data, function(d){ return d.HappinessScore});
    let happynessScale = d3.scaleLinear()
			.domain([0,happinessMax])
			.range([height-padding, padding]).nice();


    
	var scatter = svg.append("g")
		.attr("id", "scatterplot")
		.attr("clip-path", "url(#clip)");

	scatter.selectAll("circle")
		.data(newArray)
		.enter()
		.append("circle")
		.attr("fill", (d)=>colorPalette(d.Population))
		.attr("text", (d)=>d.Country)
        .attr("r", "4")
        .attr("r", (d)=>populationScale(d.Population))
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

//we need to update it as soon as clicked
//we can change the color of the selected country like this
//read data from cookie
//need exit/enter/update to 更新图片

if (highLight != ""){
    scatter.select("#"+highLight)
            // .enter()
            .attr("fill", "red")
    // console.log(typeof(highLight));
    
    let textlabel = text
            .attr("x", (d)=>GDPScale(d.GDPPerCapita))
            .attr("y", (d)=>happynessScale(d.HappinessScore))
             .text(function (d) {
                return (d.Country + " - Happiness: " + d.HappinessScore + ". " + "Population: " + d.Population  + ". " + "GDP/Capita: $"+  d.GDPPerCapita + ". ")
                // return ("1");
             })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "black")
            .style("opacity", function(d,index){
                // console.log(highLight);
                if (d.Country===highLight){
                    
                    return 1;
                }else{
                    return 0;
                }
            });

    
     
}


});
    }
    
    let highLight = "China";
    drawGraph('GDPPerCapita', 'GDPPerCapita',highLight);
    
    function setScatterGraph() {
        xVal = d3.select("#x-value").node().value; 
        yVal = d3.select("#y-value").node().value; 
        document.cookie = "xVal="+xVal;
        document.cookie = "yVal="+yVal;

        drawGraph(xVal, yVal,highLight);
    }



//strCookie: your cookie
//name, the name of variable, like"xVal", "yVal"
    function getCookieByName(strCookie,name){

        //name = country, xVal, yVal
        var arrCookie=strCookie.split("; ");
        var value;
        for(var i=0;i<arrCookie.length;i++){
            var arr=arrCookie[i].split("=");
            // console.log("11111",name)
            if(name == arr[0]){
                   value=arr[1];
                   break;
            }
   }
        return value;
    }
    