// Data Visualization Script

// Set the margin and padding of the SVG
var margin = { top: 50, right: 20, bottom: 50, left: 100 }
var padding = 0

// Set the width and height using the current width and height of the div
var width = 800
var height = 400

// Get the data
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'
const chart = async () => {
  let getData = await fetch(url)
  let dataset = await getData.json()
  console.log(dataset[0].Doping.length)
  let dopingAllegations = dataset.filter(d => d.Doping.length > 0)
  let noDopingAllegations = dataset.filter(d => d.Doping.length == 0)
  console.log(`dopingAllegations : `, dopingAllegations)
  console.log(`noDopingAllegations : `, noDopingAllegations)

  // create svg and append to chart div
  var svg = d3.select('#chart')
    .append('svg')
    .attr('class', 'graph')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
}

chart()