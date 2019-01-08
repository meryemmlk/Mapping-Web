const API_KEY = "pk.eyJ1IjoibWVyeWVtbWxrIiwiYSI6ImNqcHVkanVhbjBmcTM0M282MmowcnJlZ3AifQ.jpDXpNPhKT8vC9vCj6-UrQ";

var myMap = L.map("mapid", {
  center: [37.7749, -122.4194],
  zoom: 8
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url, function(response) {

  console.log(response);

  /*var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    var location = response[i].location;

    if (location) {
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }
  }

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(myMap);*/
    
    response.features.forEach(d => {
        var circle = L.circle([d.geometry.coordinates[1],d.geometry.coordinates[0]], {radius: d.properties.mag * 2500 , color:"red"})
        circle.bindPopup("<h1>" + d.properties.place + "</h1> <hr> <h3>Magnitude: " + d.properties.mag + "</h3>")
        circle.addTo(myMap)
    })

});