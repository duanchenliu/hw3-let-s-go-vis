// import { csv, json } from 'd3';
// import { feature } from 'topojson';

let width = 1000,
height = 600;

let svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);

let projection = d3.geoMercator()
	.scale(100)
    .translate([width/2, height/2]);
    
let path = d3.geoPath()
	.projection(projection);
    


Promise.all([
    d3.csv("data/country.csv"),
    d3.json("data/world-110m.json"),
]).then((data)=>{
    console.log(data);
    let countryinfo = data[0]; //storing all the info from our dataset
    let worldmap = data[1]; //storing the map info -> to draw the map.
    console.log(countryinfo);
    console.log(worldmap);

    // let colorPalette = d3.scaleOrdinal(d3.schemeSet3)
    //                 .domain([countryinfo.population]);
                    
    let divScheme = d3.scaleDiverging()
            .domain([d3.min(countryinfo, function(d){ return d.population}),(500000),d3.max(countryinfo, function(d){ return d.population})]) // mid-point : 50
            .interpolator(d3.interpolateRdBu)

    let world = topojson.feature(worldmap, worldmap.objects.countries).features;

    let nodeSizeScale = d3.scaleSqrt()
        .domain([0,  d3.max(countryinfo, function(d){ return d.population})])
        .range([0, 2]);
       
    // let y = d3.scaleLinear()
    // .range([height, 0]);

    //draw the path of the map
    svg.selectAll("path")
        .data(world.filter(d=>d.properties.name!='Antarctica'))
		.enter()
        .append("path")
		.attr("class", "map")
        .attr("d", path)
        // .attr("fill", "blue")
        // .attr("fill", (d)=>colorPalette(d.population))
		.attr('stroke', 'white');
    
    let node = svg.selectAll(".node")
          .data(countryinfo.filter(d=>d.population>10000000)) //we need to change this number to find the best way to present the visualization.
          .enter()
          .append("circle")
          .attr("class", "node")
          .attr("r", d => nodeSizeScale(d.population/1.5))
          .attr("fill", "gold")
          .attr("stroke", "gold")
          .attr("transform", function(d) {
             return "translate(" + projection([d.capital_long, d.capital_lat]) + ")";
		   });
   
    // const rowById = data.reduce((accumulator, d) => {
    //     accumulator[d['Country code']] = d;      
    //     return accumulator;
    // }, {});

    // const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries);

    //   countries.features.forEach(d => {
    //     Object.assign(d.properties, rowById[+d.id]);//parse to integer
    //   });

    //   const featuresWithPopulation = countries.features
    //   .filter(d => d.properties['2019'])
    //   .map(d => {
    //     d.properties['2019'] = +d.properties['2019'].replace(/ /g, '') * 1000;
    //     return d;
    //   });

    // return {
    //   features: countries.features,
    //   featuresWithPopulation
    // };
});