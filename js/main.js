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
    console.log(data, 'data');
    let countryinfo = data[0]; //storing all the info from our dataset
    let worldmap = data[1]; //storing the map info -> to draw the map.

    console.log(countryinfo);
    console.log(worldmap);

    

    // let colorPalette = d3.scaleOrdinal(d3.schemeSet3)
    //                 .domain([countryinfo.population]);
                    
    // let divScheme = d3.scaleDiverging()
    //         .domain([d3.min(countryinfo, function(d){ return d.population}),(500000),d3.max(countryinfo, function(d){ return d.population})]) // mid-point : 50
    //         .interpolator(d3.interpolateRdBu);
    // console.log()
    let min =d3.min(countryinfo, function(d){ return d.population})
    // // let min = d3.min(countryinfo, d=>d.population);
    let max = d3.max(countryinfo, function(d){ return d.population})
    // console.log(min, max, 'YESSS SIR')
    let color = d3.scaleLinear()
                .domain([max,min])
                // .domain([[-1, 0, 1]])
                // .clamp(true)
                .range(['#74a9f7', '#fcba03']);
    // console.log(color);

    let world = topojson.feature(worldmap, worldmap.objects.countries).features;

    let nodeSizeScale = d3.scaleSqrt()
        .domain([0,  d3.max(countryinfo, function(d){ return d.population})])
        .range([0, 2]);
    
    // console.log(countryinfo.);
    //draw the path of the map
    console.log(countryinfo)


    function fillcolor(d){//d = fuji
        let population;
        countryinfo.forEach(country=>{
            if(country.country===d){
                population=country.population
                console.log(country.country, 'country.country')
                console.log(d, 'name d')
                console.log(country)
            }

        })
        // console.log(d, 'namejknfkjnkjajsa')
        // console.log(population, 'pop me baby')
        // console.log(d, 'here');
        // console.log(country);
        // console.log(countryinfo[0][1][1].country);
        // console.log(countryinfo[d]);
        // console.log(color(d.population));
        
        return color(population);
    }

    svg.selectAll("path")
        .data(world.filter(d=>d.properties.name!='Antarctica'))
		.enter()
        .append("path")
		.attr("class", "map")
        .attr("d", path)
        // .attr("fill", "blue")
        // .attr("fill", (d)=>colorPalette(d.population))
        .attr("fill", (d) => {
            // console.log(d, 'here')
            return fillcolor(d.properties.name)})
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