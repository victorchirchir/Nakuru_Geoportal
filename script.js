 //set up the map in the map container
 var map=L.map('map').setView([-0.4564, 36.0763],8.5)

 var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
   maxZoom: 17,
   attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(map);

//setting coordinates to display when mouse hovers around
map.on('mousemove',function(e){
 $('#coordinate').html(`Lat: ${e.latlng.lat} Lng: ${e.latlng.lng}`)
})

//adding scale
L.control.scale({position:'bottomleft'}).addTo(map)

//changing zoom controls from its default position
map.zoomControl.setPosition('topright')

//adding the browser print button
L.control.browserPrint({position:"topleft",title:'print...'}).addTo(map)

//adding style for maps
var WardStyle={
    color:'black',
    opacity:0.3,
}

var UniversityStyle={
    color:'red',
    radius:5,
    fillcolor:'blue',


}

var CollegeStyle={
    color:'blue',
    radius:5,
    fillcolor:'blue',


}
//adding data from json files

var NakuruWards=L.geoJson(NakuruWards,
    {style:WardStyle,
    onEachFeature:function(feature,layer){

        area=(turf.area(feature)/1000000).toFixed(3)
        centerLng=turf.center(feature).geometry.coordinates[0]
        centerLat=turf.center(feature).geometry.coordinates[1]
        
     
        label=`Ward: ${feature.properties.ward}<br/>`
        label+=`County: ${feature.properties.county}<br/>`
        label+=`Area: ${area}<br/>`
        label+=`Center: lng: ${centerLng.toFixed(3)} lat: ${centerLat.toFixed(3)}<br/>`
        layer.bindPopup(label)
    }}
)

var Nakuru=L.geoJson(Nakuru,
    {style:WardStyle}
)


var NakuruUniversities=L.geoJson(NakuruUniversities,
    {pointToLayer:function(feature,latlng){
        return L.circleMarker(latlng,UniversityStyle)
    }}
)

var NakuruColleges=L.geoJson(NakuruColleges,
    {pointToLayer:function(feature,latlng){
        return L.circleMarker(latlng,CollegeStyle)
    }})

//adding layers from wms

//major Roads
var majorRoads = L.tileLayer.wms("http://localhost:8090/geoserver/NakuruGeoportal/wms", {
    layers: 'NakuruGeoportal:Nakuru_MajorRoads',
    format: 'image/png',
    transparent: true,
    attribution: "Victor Nakuru Geoportal"
});
//minor Roads
var minorRoads = L.tileLayer.wms("http://localhost:8090/geoserver/NakuruGeoportal/wms", {
    layers: 'NakuruGeoportal:Nakuru_MinorRoads',
    format: 'image/png',
    transparent: true,
    attribution: "Victor Nakuru Geoportal"
});

//health Facilities
var healthFacilities = L.tileLayer.wms("http://localhost:8090/geoserver/NakuruGeoportal/wms", {
    layers: 'NakuruGeoportal:NakuruHealthFacilities',
    format: 'image/png',
    transparent: true,
    attribution: "Victor Nakuru Geoportal"
});

//schools
var schools = L.tileLayer.wms("http://localhost:8090/geoserver/NakuruGeoportal/wms", {
    layers: 'NakuruGeoportal:schools Nakuru_schools',
    format: 'image/png',
    transparent: true,
    attribution: "Victor Nakuru Geoportal"
});





//addding layer the layer control

    function AddUniLayer(){
        var layer=document.getElementById('universities')
        if(layer.checked){
            NakuruUniversities.addTo(map)
        }else{
            map.removeLayer(NakuruUniversities)
        }

    }

    function AddColleLayer(){
        var layer=document.getElementById('colleges')
        if(layer.checked){
            NakuruColleges.addTo(map)
        }else{
            map.removeLayer(NakuruColleges)
        }
    }

    function AddWards(){
        var layer=document.getElementById('wards')
        if(layer.checked){
           NakuruWards.addTo(map)
        }else{
            map.removeLayer(NakuruWards)
        }

    }


    function AddminorRoads(){
        var layer=document.getElementById('minorRoads')
        if(layer.checked){
            minorRoads.addTo(map)
        }else{
            map.removeLayer(minorRoads)
        }

    }

    function AddmajorRoads(){
        var layer=document.getElementById('majorRoads')
        if(layer.checked){
            majorRoads.addTo(map)
        }else{
            map.removeLayer(majorRoads)
        }

    }


    function AddHealthFacilities(){
        var layer=document.getElementById('healthFacilities')
        if(layer.checked){
            healthFacilities.addTo(map)
        }else{
            map.removeLayer(healthFacilities)
        }

    }

    function AddSchools(){
        var layer=document.getElementById('schools')
        if(layer.checked){
           schools.addTo(map)
        }else{
            map.removeLayer(schools)
        }

    }

    

    Nakuru.addTo(map)


    // add base maps

    var OpenTopoMap = L.tileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 17,
          attribution:
            'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        }
      ).addTo(map)
      
      var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
          maxZoom: 20,
          subdomains:['mt0','mt1','mt2','mt3']
      });
      
      var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
          maxZoom: 20,
          subdomains:['mt0','mt1','mt2','mt3']
      })
      
      var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
          maxZoom: 20,
          subdomains:['mt0','mt1','mt2','mt3']
      });
      
      var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
          maxZoom: 20,
          subdomains:['mt0','mt1','mt2','mt3']
      })



      //basemaps
var baselayers={
    'OpenTopoMap':OpenTopoMap,
    'Google Street':googleStreets,
    'Google Hybrid':googleHybrid,
    'Google Satelite':googleSat,
    'Google Terrain':googleTerrain
  }
  

  L.control.layers(baselayers).addTo(map)
    





