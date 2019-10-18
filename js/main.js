// import { csv, json } from 'd3';
// import { feature } from 'topojson';

let width = 1000,
height = 600;

let svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.zoom().on("zoom", function () {
        svg.attr("transform", d3.event.transform)
     }))
     .append("g");

let projection = d3.geoMercator()
	.scale(150)
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
    console.log("country info:  " + countryinfo);
    console.log("world map:  " + worldmap);

    let world = topojson.feature(worldmap, worldmap.objects.countries).features;

    let nodeSizeScale = d3.scaleSqrt()
        .domain([0,  d3.max(countryinfo, function(d){ return d.Population})])
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
        .attr('stroke', 'white')
        //bind onclick event here
        // .on("click", clicked)
        //bind hover event here
        .on("mouseover",mouseOverEvent)
        .on("mouseout", mouseOutEvent);

    // svg.call(
    //         d3.zoom().on('zoom', () => {
    //           g.attr('transform', d3.event.transform);
    //         })
    //       );
    
    let node = svg.selectAll(".node")
        //we need to change this number to find the best way to present the visualization.
          .data(countryinfo.filter(d=>d.Population>10000000)) 
          .enter()
          .append("circle")
          .attr("class", "node")
          .attr("r", d => nodeSizeScale(d.Population/1.5))
          .attr("fill", "gold")
          .attr("stroke", "gold")
          .attr("opacity", 0.7)
          .attr("transform", function(d) {
             return "translate(" + projection([d.capital_long, d.capital_lat]) + ")";
           });
           


           let tooltip = d3.select('body')
                            .append('div')
                            .attr("class","tooltip")
                            .style('position', 'absolute')
                            .style('z-index', '10')
                            .style('color', 'black')
                                .style('visibility', 'hidden')   
                                .style('font-size', '18px')
                            .style('font-weight', 'bold')
                            .text('')
   
   
       function clicked(d){
           console.log(d);
           
       }
      function mouseOverEvent(d){
       //    console.log("111111");
       return tooltip.text("Country name: " + d.properties.name)
                        .style("left",(d3.event.pageX)+"px")
    					.style("top",(d3.event.pageY+20)+"px")
                        .style("visibility", "visible")
                        .style("opacity", 0.8)
                        .style("background-color", "white")
                        .style("border-width", "2px")
                        .style("border-radius", "5px")
                        .style("padding", "5px")
      }

      function mouseOutEvent(d){
          return tooltip.style("opacity", 0);
      }
   
   
});