// Data Visualization Script

// Set the margin and padding of the SVG
var margin = { top: 50, right: 20, bottom: 50, left: 100 }
var padding = 50

// Set the width and height using the current width and height of the div
var width = 800
var height = 400

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
      Time: d.Time, 
      URL: d.URL, 
      Year: new Date(Date.parse(d.Year)),
      dopeAllegation: d.Doping.length > 0
    }
  })
  console.log(`dataset: `, dataset)
  var noDope = dataset.filter(d => !d.dopeAllegation)
  console.log(`dataset: (no dope) `, noDope)
  // Format the data
  // Year
  // const minYear = d3.min(dataset.map(d => d.Year))
  // console.log(`minYear: ${minYear}`)
  // const maxYear = d3.max(dataset.map(d => d.Year))
  // console.log(`maxYear: ${maxYear}`)

  const minSeconds = d3.min(dataset.map(d => d.Seconds))
  const maxSeconds = d3.max(dataset.map(d => d.Seconds))

  // Set the ranges
  const xScale = d3.scaleTime()
  .domain(d3.extent(dataset, (d) => d.Year))
  .range([padding, width-padding])

  const yScale = d3.scaleTime()
    .domain([minSeconds, maxSeconds])
    .range([padding, (height-padding)])

  // create svg and append to chart div
  var svg = d3.select('#chart')
    .append('svg')
    .attr('class', 'graph')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

  // add the x Axis 
  const xAxis = d3.axisBottom(xScale)

  const yAxis = d3.axisLeft(yScale)
    .tickFormat(d3.scaleTime().tickFormat(10, "%M:%S"));

  svg.append('g')
    .call(xAxis)
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${height})`)

  // add the y Axis
  svg.append('g')
    .call(yAxis)
    .attr('id', 'y-axis')
  
  svg.append('text')
    .text('Doping in Professional Bicycle Racing')
    .attr('id', 'title')
    .attr("x", width / 2)
    .attr("y", padding / 2)  

  svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr('data-xvalue', (d) => d.Year)
    .attr('data-yvalue', (d) => d.Seconds)
    .attr("cx", (d) => xScale(d.Year))
    .attr("cy", (d) => yScale(d.Seconds))
    .attr("r", 8)
    .attr('class', 'dot')
    .style('fill', (d) => d.dopeAllegation ? 'red' : 'green')
}

chart()