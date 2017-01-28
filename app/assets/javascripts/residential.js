$(function() {
  // From: http://bl.ocks.org/mbostock/3887235
  // Set the dimensions
  var width  = 960,
      height = 500,
      radius = Math.min(width, height) / 2;

  var totals = {};
  var color  = d3.scale.category20b();

  // This is the circle that the pie will fill in
  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  // D3 provides a helper function for creating the pie and slices
  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return totals[d]; });

  // Add an SVG element to the page and append a G element for the pie
  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Get the data and draw the slices
  $.getJSON('/residential/data', function(data) {
    totals = data.totals;
    // enter is how we tell D3 to generate the SVG elements for the data var g = svg.selectAll(".arc")
    var g = svg.selectAll(".arc")
        .data(pie(d3.keys(totals)))
      .enter().append("g")
        .attr("class", "arc")
        	.on("mouseover", function(d) {
        		d3.select(this).select("text").style("font-weight", "bold")
        		d3.select(this).select("text").style("font-size", "1.25em")
        	})
        	.on("mouseout", function(d) {
        		d3.select(this).select("text").style("font-weight", "normal")
        		d3.select(this).select("text").style("font-size", "1em")
        	});

    // color the pie slices using the color pallet
    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data); });

    // add the jurisdiction name, put the labels outside the pie (in a new arc/circle)
    var pos = d3.svg.arc().innerRadius(radius + 20).outerRadius(radius + 20);
    g.append("text")
      .attr("transform", function(d) {
        return "translate(" + pos.centroid(d) + ")";
       })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data; });
  });
});