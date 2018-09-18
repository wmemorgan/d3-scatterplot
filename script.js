// Data Visualization Script

// Set the margin and padding of the SVG
var margin = { top: 50, right: 20, bottom: 50, left: 100 }
var padding = 50

// Set the width and height using the current width and height of the div
var width = 800
var height = 600

// Get the data
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'
const chart = async () => {
  let getData = await fetch(url)
  let rawData = await getData.json()
  console.log(`rawData: `, rawData)
  let dataset = rawData.map(d => {
    return {
      Doping: d.Doping, 
      Name: d.Name, 
      Nationality: d.Nationality, 
      Place: d.Place, 
      Seconds: d.Seconds, 
      dateSeconds: new Date(d.Seconds * 1000),
      Time: d.Time,
      dateTime: new Date(d.Year + '-01-01T' + '00:'  + d.Time + 'Z'), 
      URL: d.URL, 
      Year: d.Year,
      dateYear: new Date(Date.parse(d.Year)),
      dopeAllegation: d.Doping.length > 0
    }
  })
  console.log(`dataset: `, dataset)
  var noDope = dataset.filter(d => !d.Doping.length > 0)
  console.log(`dataset: (no dope) `, noDope)
  // Format the data
  // Year
  const minYear = d3.min(dataset.map(d => d.Year - 1))
  console.log(`minYear: ${minYear}`)
  const maxYear = d3.max(dataset.map(d => d.Year + 1))
  console.log(`maxYear: ${maxYear}`)

  const minSeconds = d3.min(dataset.map(d => d.dateSeconds))
  const maxSeconds = d3.max(dataset.map(d => d.dateSeconds))

  // Define scale
  const xScale = d3.scaleTime()
    .domain([minYear, maxYear])
    .range([padding, width - padding])

  const yScale = d3.scaleTime()
    .domain([minSeconds, maxSeconds])
    .range([padding, (height - padding)])

  // Create svg and append to chart div
  var svg = d3.select('#chart')
    .append('svg')
    .attr('class', 'graph')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

  // Add labels 
  // Title
  svg.append('text')
    .text('Doping in Professional Bicycle Racing')
    .attr('id', 'title')
    .attr("x", width / 2)
    .attr("y", padding / 2) 
  
  // Axes Labels
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -250)
    .attr('y', 5)
    .attr('class', 'labels')
    .text('Time in Minutes')

  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height)
    .attr('class', 'labels')
    .text('Year')

  // Tooltip  
  const tooltip = d3.select('#chart').append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0)

 // Legend code inspired by Hooria Hic
 // https://codepen.io/HIC/full/NLLmPp/
  const legend = svg.append('g')
    .attr('id', 'legend')
    .attr("transform", `translate(${width - padding*3}, ${padding*3})`)

  const legendData = [
    { class: "doping", text: "Riders with doping allegations" },
    { class: "not-doping", text: "No doping allegations" }
  ];

  legend.selectAll("rect")
    .exit()
    .data(legendData)
    .enter()
    .append("rect")
    .attr("x", "0.25em")
    .attr("y", (d, i) => `${0.25 + i * 1.5}em`)
    .attr("width", "1em")
    .attr("height", "1em")
    .attr('class', (d) => d.class)

  legend.selectAll("text")
    .exit()
    .data(legendData)
    .enter()
    .append("text")
    .attr("x", "1.5em")
    .attr("y", (d, i) => `${1.1 + i * 1.5}em`)
    .attr("font-size", "1em")
    .text(d => d.text);

  // Add axes
  const xAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format("d"))
  const yAxis = d3.axisLeft(yScale)
    .tickFormat(d3.scaleTime().tickFormat(10, "%M:%S"))

  svg.append('g')
    .call(xAxis)
    .attr('id', 'x-axis')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${height - padding})`)

  svg.append('g')
    .call(yAxis)
    .attr('id', 'y-axis')
    .attr('class', 'axis')
    .attr('transform', `translate(${padding}, 0)`)

  // Add scatterplot  
  svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr('data-xvalue', (d) => d.Year)
    .attr('data-yvalue', (d) => d.dateSeconds)
    .attr("cx", (d) => xScale(d.Year))
    .attr("cy", (d) => yScale(d.dateSeconds))
    .attr("r", 8)
    .attr('class', (d) => d.Doping.length > 0 ? 'doping' : 'not-doping')
    .classed('dot', true)
    .on('mouseover', (d) => {
      tooltip.transition().duration(200).style('opacity', 0.9)
      tooltip.html(
        `<p>${d.Name}: ${d.Nationality}<br>
         Year: ${d.Year} Time ${d.Time}</p>
         <p><span>${d.Doping}</span></p>`)
        .attr('data-year', d.Year)
        .style('left', `${d3.event.layerX}px`)
        .style('top', `${d3.event.layerY - 28}px`)
    })
    .on('mouseout', () => tooltip.transition().duration(500).style('opacity', 0))


}

chart()