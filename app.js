var map;
var view;
var layers = [];

//load dojo module containing arcgis api
require(["esri/Map","esri/views/SceneView","dojo/domReady!"], 
    function(Map, SceneView){
        map = new Map({
            basemap: "streets",
            ground: "world-elevation"
        });
        view = new SceneView({
            container: "viewDiv",     
            map: map,                 
            scale: 50000000,          
            center: [-101.17, 21.78]  
        });
});

layers.push(new ElevationLayer({
      url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Elevation/MtBaldy_Elevation/ImageServer"
  }));

addLayers();


//helper functions ---------------

//add layers to map
function addLayers(layers) {
      layers.forEach(layer => map.ground.layers.add(layer));
      
  }
