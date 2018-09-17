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

  // create svg and append to chart div
  var svg = d3.select('#chart')
    .append('svg')
    .attr('class', 'graph')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
}

chart()