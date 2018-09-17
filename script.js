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
      Time: new Date('1970-01-01T' + '00:' + d.Time + 'Z'), 
      URL: d.URL, 
      Year: d.Year
    }
  })
  console.log(`Dataset: `, dataset)
  console.log(dataset[0].Doping.length)
  let dopingAllegations = dataset.filter(d => d.Doping.length > 0)
  let noDopingAllegations = dataset.filter(d => d.Doping.length == 0)
  console.log(`dopingAllegations : `, dopingAllegations)
  console.log(`noDopingAllegations : `, noDopingAllegations)

  // Format the data
  // Year
  const minYear = new Date(d3.min(dataset.map(d => d.Year)))
  const maxYear = new Date(d3.max(dataset.map(d => d.Year)))

  const minTime = d3.min(dataset.map(d => d.Time))
  const maxTime = d3.max(dataset.map(d => d.Time))

  // Set the ranges
  const xScale = d3.scaleTime()
    .domain([minYear, maxYear])
    .range([padding, width - padding])

  const yScale = d3.scaleTime()
    .domain([minTime, maxTime])
    .range([padding, height - padding])

  // create svg and append to chart div
  var svg = d3.select('#chart')
    .append('svg')
    .attr('class', 'graph')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  
  svg.append('text')
    .text('Doping in Professional Bicycle Racing')
    .attr('id', 'title')
    .attr("x", width / 2)
    .attr("y", padding / 2)  

  svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.Year))
    .attr("cy", (d) => yScale(d.Time))
    .attr("r", 5)
}

chart()